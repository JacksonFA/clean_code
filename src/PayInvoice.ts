import EnrollmentRepository from "./EnrollmentRepository";
import RepositoryAbstractFactory from "./RepositoryAbstractFactory";

export default class PayInvoice {
    enrollmentsRepository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentsRepository = repositoryFactory.createEnrollmentsRepository();
    }

    execute(code: string, month: number, year: number, amount: number): void {
        const enrollment = this.enrollmentsRepository.get(code);
        if (!enrollment) { throw new Error('Enrollment not found'); }
        enrollment.payInvoice(month, year, amount);
    }
}