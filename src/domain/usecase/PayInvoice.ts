import EnrollmentRepository from "../repository/EnrollmentRepository";
import PayInvoiceInputData from "../usecase/DTOs/PayInvoiceInputData";
import RepositoryAbstractFactory from "../factory/RepositoryAbstractFactory";

export default class PayInvoice {
    enrollmentsRepository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentsRepository = repositoryFactory.createEnrollmentsRepository();
    }

    execute(payInvoiceInputData: PayInvoiceInputData): void {
        const enrollment = this.enrollmentsRepository.get(payInvoiceInputData.code);
        if (!enrollment) { throw new Error('Enrollment not found'); }
        enrollment.payInvoice(payInvoiceInputData.month, payInvoiceInputData.year, payInvoiceInputData.amount, payInvoiceInputData.paymentDate);
    }
}