import Enrollment from "../../../domain/entity/Enrollment";
import EnrollmentRepository from "../../../domain/repository/EnrollmentRepository";
import EnrollmentCode from "../../../domain/entity/VOs/EnrollmentCode";

export default class EnrollmentRepositoryMemory implements EnrollmentRepository {
    enrollments: Enrollment[];

    constructor() {
        this.enrollments = [];
    }
    async save(enrollment: Enrollment): Promise<void> {
        this.enrollments.push(enrollment);
    }

    async update(enrollment: Enrollment): Promise<void> {
        this.enrollments.push(enrollment);
    }

    async get(code: string): Promise<Enrollment> {
        const enrollment = this.enrollments.find(enrollment => enrollment.code.value === code);
        if (!enrollment) throw new Error("Enrollment not found");
        return enrollment;
    }

    async findAllByClassRoom(level: string, module: string, classRoom: string): Promise<Enrollment[]> {
        return this.enrollments.filter(enrollment => enrollment.level.code === level && enrollment.module.code === module && enrollment.classRoom.code === classRoom);
    }

    async findByCpf(cpf: string) {
        return this.enrollments.find(enrollment => enrollment?.student?.cpf.value === cpf);
    }

    async count(): Promise<number>  {
        return this.enrollments.length;
    }

    async clean(): Promise<void> {
        this.enrollments = [];
    }
}