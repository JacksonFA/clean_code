import Enrollment from "../entity/Enrollment";
import EnrollmentCode from "../entity/VOs/EnrollmentCode";

export default interface EnrollmentRepository {
    save(enrollment: any): void;
    findAllByClass(level: string, module: string, classRoom: string): Enrollment[];
    findByCpf(cpf: string): Enrollment | undefined;
    get(code: string): Enrollment | undefined;
    count(): number;
}