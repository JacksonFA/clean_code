import Enrollment from "./Enrollment";

export default interface EnrollmentRepository {
    save(enrollment: any): void;
    findAllByClass(level: string, module: string, clazz: string): Enrollment[];
    findByCpf(cpf: string): Enrollment | undefined;
    count(): number;
}