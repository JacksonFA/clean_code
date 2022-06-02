export default interface EnrollmentRepository {
    save(enrollment: any): any;
    findAllByClass(level: string, module: string, clazz: string): any;
    findByCpf(cpf: string): any;
    count(): number;
}