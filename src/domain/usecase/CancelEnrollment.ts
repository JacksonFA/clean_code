import EnrollmentRepository from "../repository/EnrollmentRepository";
import RepositoryAbstractFactory from "../factory/RepositoryAbstractFactory";

export default class CancelEnrollment {
    enrollmentsRepository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentsRepository = repositoryFactory.createEnrollmentsRepository();
    }

    async execute(code: string): Promise<void> {
        const enrollment = await this.enrollmentsRepository.get(code);
        if (!enrollment) throw new Error('Enrollment not found');
        enrollment.status = 'cancelled';
    }
}