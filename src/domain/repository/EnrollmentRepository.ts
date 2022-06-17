import Enrollment from "../entity/Enrollment";
import EnrollmentCode from "../entity/VOs/EnrollmentCode";

export default interface EnrollmentRepository {
    get(code: string): Promise<Enrollment>;
    save(enrollment: any): Promise<void>;
    update(enrollment: Enrollment): Promise<void>;
    findAllByClassRoom(level: string, module: string, classRoom: string): Promise<Enrollment[]>;
    findByCpf(cpf: string): Promise<Enrollment | undefined>;
    count(): Promise<number>;
    clean(): Promise<void>;
}