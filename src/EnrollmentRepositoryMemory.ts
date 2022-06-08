import Enrollment from "./Enrollment";
import EnrollmentRepository from "./EnrollmentRepository";
import EnrollmentCode from "./EnrollmentCode";

export default class EnrollmentRepositoryMemory implements EnrollmentRepository {
    enrollments: Enrollment[];

    constructor() {
        this.enrollments = [];
    }
    save(enrollment: Enrollment): void {
        this.enrollments.push(enrollment);
    }
    get(code: string): Enrollment | undefined {
        return this.enrollments.find(enrollment => enrollment.code.value === code);
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