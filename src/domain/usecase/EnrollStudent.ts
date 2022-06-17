import ClassRoomRepository from "../repository/ClassRoomRepository";
import Enrollment from "../entity/Enrollment";
import EnrollmentRepository from "../repository/EnrollmentRepository";
import EnrollStudentInputData from "../usecase/DTOs/EnrollStudentInputData";
import EnrollStudentOutputData from "../usecase/DTOs/EnrollStudentOutputData";
import LevelRepository from "../repository/LevelRepository";
import ModuleRepository from "../repository/ModuleRepository";
import RepositoryAbstractFactory from "../factory/RepositoryAbstractFactory";
import Student from "../entity/Student";

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

    async excute(enrollStudentInputData: EnrollStudentInputData): Promise<EnrollStudentOutputData> {
        const student = new Student(enrollStudentInputData.studentName, enrollStudentInputData.studentCpf, enrollStudentInputData.studentBirthDate);
        const level = await this.levelRepository.findByCode(enrollStudentInputData.level);
        const module = await this.moduleRepository.findByCode(enrollStudentInputData.level, enrollStudentInputData.module);
        const classRoom = await this.classRoomRepository.findByCode(enrollStudentInputData.classRoom);
        const studentsEnrolledInClass = await this.enrollmentsRepository.findAllByClassRoom(level.code, module.code, classRoom.code);
        if (studentsEnrolledInClass.length === classRoom.capacity) throw new Error('Class is over capacity');
        const existingEnrollment =  await this.enrollmentsRepository.findByCpf(enrollStudentInputData.studentCpf);
        if (existingEnrollment) throw new Error('Enrollment with duplicated student is not allowed');
        const enrollmentSequence = await this.enrollmentsRepository.count() + 1;
        const issueDate = new Date();
        const enrollment = new Enrollment(student, level, module, classRoom, issueDate, enrollmentSequence, enrollStudentInputData.installments);
        await this.enrollmentsRepository.save(enrollment);
        const enrollStudentOutputData = new EnrollStudentOutputData(enrollment.code.value);
        for (const invoice of enrollment.invoices) {
            enrollStudentOutputData.invoices.push(invoice.clone());
        }
        return enrollStudentOutputData;
    }
}