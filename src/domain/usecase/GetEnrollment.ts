import EnrollmentRepository from "../repository/EnrollmentRepository";
import GetEnrollmentOutputData from "../usecase/DTOs/GetEnrollmentOutputData";
import RepositoryAbstractFactory from "../factory/RepositoryAbstractFactory";

export default class GetEnrollment {
    enrollmentsRepository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentsRepository = repositoryFactory.createEnrollmentsRepository();
    }

    async execute(code: string, currentDate: Date): Promise<GetEnrollmentOutputData> {
        const enrollment = await this.enrollmentsRepository.get(code);
        if (!enrollment) throw new Error('Enrollment not found');
        const balance = enrollment?.getInvoiceBalance();
        const getEnrollmentOutputData = new GetEnrollmentOutputData({
            code: enrollment.code.value,
            balance,
            status: enrollment.status,
            invoices: []
        });
        for (const invoice of enrollment.invoices) {
            getEnrollmentOutputData.invoices.push({
                amount: invoice.amount,
                status: invoice.getStatus(currentDate),
                dueDate: invoice.dueDate,
                penalty: invoice.getPenalty(currentDate),
                interests: invoice.getInterests(currentDate),
                balance: invoice.getBalance(),
            });
        }
        return getEnrollmentOutputData;
    }
}