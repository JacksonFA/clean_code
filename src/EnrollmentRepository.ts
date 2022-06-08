import Enrollment from "./Enrollment";
import EnrollmentCode from "./EnrollmentCode";

export default interface EnrollmentRepository {
    save(enrollment: any): void;
    findAllByClass(level: string, module: string, clazz: string): Enrollment[];
    findByCpf(cpf: string): Enrollment | undefined;
    get(code: string): Enrollment | undefined;
    count(): number;
}