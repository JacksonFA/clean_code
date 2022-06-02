import ClassRepository from "./ClassRepository";
import Enrollment from "./Enrollment";
import EnrollmentRepository from "./EnrollmentRepository";
import LevelRepository from "./LevelRepository";
import ModuleRepository from "./ModuleRepository";
import Student from "./Student";

export default class EnrollStudent {
    levelRepository: LevelRepository;
    moduleRepository: ModuleRepository;
    classRepository: ClassRepository;
    enrollmentsRepository: EnrollmentRepository;
    
   constructor (levelRepository: LevelRepository, moduleRepository: ModuleRepository, classRepository: ClassRepository, enrollmentsRepository: EnrollmentRepository) {
       this.levelRepository = levelRepository;
       this.moduleRepository = moduleRepository;
       this.classRepository = classRepository;
       this.enrollmentsRepository = enrollmentsRepository;
   }

    excute(enrollmentRequest: any): any {
        const student = new Student(enrollmentRequest.student.name, enrollmentRequest.student.cpf, enrollmentRequest.student.birthDate);
        const level = this.levelRepository.findByCode(enrollmentRequest.level);
        const module = this.moduleRepository.findByCode(enrollmentRequest.level, enrollmentRequest.module);
        const clazz = this.classRepository.findByCode(enrollmentRequest.class);
        if (student.getAge() < module.minimumAge) throw new Error('Student below minimum age');
        const studentsEnrolledInClass = this.enrollmentsRepository.findAllByClass(level.code, module.code, clazz.code);
        if (studentsEnrolledInClass.length === clazz.capacity) throw new Error('Class is over capacity');
        const existingEnrollment = this.enrollmentsRepository.findByCpf(enrollmentRequest.student.cpf);
        if (existingEnrollment) throw new Error('Enrollment with duplicated student is not allowed');
        const sequence = new String(this.enrollmentsRepository.count() + 1).padStart(4, '0');
        const code = `${new Date().getFullYear()}${enrollmentRequest.level}${enrollmentRequest.module}${enrollmentRequest.class}${sequence}`;
        const enrollment = new Enrollment(student, level.code, module.code, clazz.code, code);
        this.enrollmentsRepository.save(enrollment);
        return enrollment;
    }
}