import ClassRoomRepository from "./ClassRoomRepository";
import Enrollment from "./Enrollment";
import EnrollmentRepository from "./EnrollmentRepository";
import EnrollStudentInputData from "./EnrollStudentInputData";
import EnrollStudentOutputData from "./EnrollStudentOutputData";
import LevelRepository from "./LevelRepository";
import ModuleRepository from "./ModuleRepository";
import RepositoryAbstractFactory from "./RepositoryAbstractFactory";
import Student from "./Student";

export default class EnrollStudent {
    levelRepository: LevelRepository;
    moduleRepository: ModuleRepository;
    classRoomRepository: ClassRoomRepository;
    enrollmentsRepository: EnrollmentRepository;
    
    constructor (repositoryFactory: RepositoryAbstractFactory) {
       this.levelRepository = repositoryFactory.createLevelRepository();
       this.moduleRepository = repositoryFactory.createModuleRepository();
       this.classRoomRepository = repositoryFactory.createClassRoomRepository();
       this.enrollmentsRepository = repositoryFactory.createEnrollmentsRepository();
    }

    excute(enrollStudentInputData: EnrollStudentInputData): EnrollStudentOutputData {
        const student = new Student(enrollStudentInputData.studentName, enrollStudentInputData.studentCpf, enrollStudentInputData.studentBirthDate);
        const level = this.levelRepository.findByCode(enrollStudentInputData.level);
        const module = this.moduleRepository.findByCode(enrollStudentInputData.level, enrollStudentInputData.module);
        const classRoom = this.classRoomRepository.findByCode(enrollStudentInputData.classRoom);
        const studentsEnrolledInClass = this.enrollmentsRepository.findAllByClass(level.code, module.code, classRoom.code);
        if (studentsEnrolledInClass.length === classRoom.capacity) throw new Error('Class is over capacity');
        const existingEnrollment = this.enrollmentsRepository.findByCpf(enrollStudentInputData.studentCpf);
        if (existingEnrollment) throw new Error('Enrollment with duplicated student is not allowed');
        const enrollmentSequence = this.enrollmentsRepository.count() + 1;
        const issueDate = new Date();
        const enrollment = new Enrollment(student, level, module, classRoom, issueDate, enrollmentSequence, enrollStudentInputData.installments);
        this.enrollmentsRepository.save(enrollment);
        const enrollStudentOutputData = new EnrollStudentOutputData(enrollment.code.value);
        for (const invoice of enrollment.invoices) {
            enrollStudentOutputData.invoices.push(invoice.clone());
        }
        return enrollStudentOutputData;
    }
}