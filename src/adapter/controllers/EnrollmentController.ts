import RepositoryAbstractFactory from "../../domain/factory/RepositoryAbstractFactory";
import CancelEnrollment from "../../domain/usecase/CancelEnrollment";
import EnrollStudentInputData from "../../domain/usecase/DTOs/EnrollStudentInputData";
import EnrollStudentOutputData from "../../domain/usecase/DTOs/EnrollStudentOutputData";
import GetEnrollmentOutputData from "../../domain/usecase/DTOs/GetEnrollmentOutputData";
import PayInvoiceInputData from "../../domain/usecase/DTOs/PayInvoiceInputData";
import EnrollStudent from "../../domain/usecase/EnrollStudent";
import GetEnrollment from "../../domain/usecase/GetEnrollment";
import PayInvoice from "../../domain/usecase/PayInvoice";

export default class EnrollmentController {
    repositoryFactory: RepositoryAbstractFactory;
    
    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    async enrollStudent(params: any, body: any): Promise<EnrollStudentOutputData> {
        const enrollStudent = new EnrollStudent(this.repositoryFactory);
        const enrollStudentInputData = new EnrollStudentInputData(body);
        const enrollStudentOutputData = await enrollStudent.excute(enrollStudentInputData);
        return enrollStudentOutputData;
    }

    async getEnrollment(params: any, body: any): Promise<GetEnrollmentOutputData> {
        const code = params.code;
        const currentDate = new Date();
        const getEnrollment = new GetEnrollment(this.repositoryFactory);
        const getEnrollmentOutputData = await getEnrollment.execute(code, currentDate);
        return getEnrollmentOutputData;
    }

    // async getEnrollments(params: any, body: any): Promise<GetEnrollmentOutputData[]> {
    //     const currentDate = new Date();
    //     const getEnrollments = new GetEnrollments(this.repositoryFactory);
    //     const getEnrollmentOutputData = await getEnrollments.execute(currentDate);
    //     return getEnrollmentOutputData;
    // }

    async payInvoice(params: any, body: any): Promise<void> {
        const payInvoice = new PayInvoice(this.repositoryFactory);
        const payInvoiceInputData = new PayInvoiceInputData(body);
        await payInvoice.execute(payInvoiceInputData);
    }

    async cancelEnrollment(params: any, body: any): Promise<void> {
        const cancelEnrollment = new CancelEnrollment(this.repositoryFactory);
        await cancelEnrollment.execute(params.code);
    }
}