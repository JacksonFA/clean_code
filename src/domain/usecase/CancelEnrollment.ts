import EnrollmentRepository from "../repository/EnrollmentRepository";
import RepositoryAbstractFactory from "../factory/RepositoryAbstractFactory";

export default class CancelEnrollment {
    enrollmentsRepository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentsRepository = repositoryFactory.createEnrollmentsRepository();
    }

    execute(code: string): void {
        const enrollment = this.enrollmentsRepository.get(code);
        if (!enrollment) throw new Error('Enrollment not found');
        enrollment.status = 'cancelled';
    }
}