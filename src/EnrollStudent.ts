import ClassRoomRepository from "./ClassRoomRepository";
import Enrollment from "./Enrollment";
import EnrollmentRepository from "./EnrollmentRepository";
import LevelRepository from "./LevelRepository";
import ModuleRepository from "./ModuleRepository";
import Student from "./Student";

export default class EnrollStudent {
    levelRepository: LevelRepository;
    moduleRepository: ModuleRepository;
    classRoomRepository: ClassRoomRepository;
    enrollmentsRepository: EnrollmentRepository;
    
    constructor (levelRepository: LevelRepository, moduleRepository: ModuleRepository, classRoomRepository: ClassRoomRepository, enrollmentsRepository: EnrollmentRepository) {
       this.levelRepository = levelRepository;
       this.moduleRepository = moduleRepository;
       this.classRoomRepository = classRoomRepository;
       this.enrollmentsRepository = enrollmentsRepository;
    }

    excute(enrollmentRequest: any): Enrollment {
        const student = new Student(enrollmentRequest.student.name, enrollmentRequest.student.cpf, enrollmentRequest.student.birthDate);
        const level = this.levelRepository.findByCode(enrollmentRequest.level);
        const module = this.moduleRepository.findByCode(enrollmentRequest.level, enrollmentRequest.module);
        const classRoom = this.classRoomRepository.findByCode(enrollmentRequest.class);
        const studentsEnrolledInClass = this.enrollmentsRepository.findAllByClass(level.code, module.code, classRoom.code);
        if (studentsEnrolledInClass.length === classRoom.capacity) throw new Error('Class is over capacity');        
        const existingEnrollment = this.enrollmentsRepository.findByCpf(enrollmentRequest.student.cpf);
        if (existingEnrollment) throw new Error('Enrollment with duplicated student is not allowed');
        const enrollmentSequence = this.enrollmentsRepository.count() + 1;
        const issueDate = new Date();
        const enrollment = new Enrollment(student, level, module, classRoom, issueDate, enrollmentSequence, enrollmentRequest.installments);
        this.enrollmentsRepository.save(enrollment);
        
        return enrollment;
    }
}