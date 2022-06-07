import Enrollment from "./Enrollment";
import EnrollmentRepository from "./EnrollmentRepository";

export default class EnrollmentRepositoryMemory implements EnrollmentRepository {
    enrollments: Enrollment[];

    constructor() {
        this.enrollments = [];
    }
    save(enrollment: Enrollment) {
        this.enrollments.push(enrollment);
    }
    findAllByClass(level: string, module: string, classRoom: string) {
        return this.enrollments.filter(enrollment => enrollment.level.code === level && enrollment.module.code === module && enrollment.classRoom.code === classRoom);
    }
    findByCpf(cpf: string) {
        return this.enrollments.find(enrollment => enrollment?.student?.cpf.value === cpf);
    }
    count(): number {
        return this.enrollments.length;
    }
}