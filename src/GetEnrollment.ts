import EnrollmentRepository from "./EnrollmentRepository";
import RepositoryAbstractFactory from "./RepositoryAbstractFactory";

export default class GetEnrollment {
    enrollmentsRepository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentsRepository = repositoryFactory.createEnrollmentsRepository();
    }

    execute(code: string): any {
        const enrollment = this.enrollmentsRepository.get(code);
        const balance = enrollment?.getInvoiceBalance();
        return {
            code: enrollment?.code.value,
            balance,
        }
    }
}