import EnrollStudent from '../domain/usecase/EnrollStudent';
import EnrollStudentInputData from '../domain/usecase/DTOs/EnrollStudentInputData';
import GetEnrollment from '../domain/usecase/GetEnrollment';
import PayInvoice from '../domain/usecase/PayInvoice';
import PayInvoiceInputData from '../domain/usecase/DTOs/PayInvoiceInputData';
import RepositoryMemoryFactory from '../adapter/factories/RepositoryMemoryFactory';

let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;
let payInvoice: PayInvoice;

beforeEach(() => {
    const repositoryMemoryFactory = new RepositoryMemoryFactory();
    enrollStudent = new EnrollStudent(repositoryMemoryFactory);
    getEnrollment = new GetEnrollment(repositoryMemoryFactory);
    payInvoice = new PayInvoice(repositoryMemoryFactory);
});

test('should pay enrollment invoice', async () => {
    await enrollStudent.excute(new EnrollStudentInputData({
        studentName: 'Maria Carolina Fonseca',
        studentCpf: '755.525.774-26',
        studentBirthDate: '2002-03-12',
        level: 'EM',
        module: '1',
        classRoom: 'A',
        installments: 12
    }));
    await payInvoice.execute(new PayInvoiceInputData({
        code: '2022EM1A0001',
        month: 7,
        year: 2022,
        amount: 1416.66,
        paymentDate: new Date('2022-06-20'),
    }));
    const getEnrollmentOutputData = await getEnrollment.execute('2022EM1A0001', new Date('2022-06-20'));
    expect(getEnrollmentOutputData.code).toBe('2022EM1A0001');
    expect(getEnrollmentOutputData.balance).toBe(15583.33);
});

test('should pay overdue invoice', async () => {
    await enrollStudent.excute(new EnrollStudentInputData({
        studentName: 'Maria Carolina Fonseca',
        studentCpf: '755.525.774-26',
        studentBirthDate: '2002-03-12',
        level: 'EM',
        module: '1',
        classRoom: 'A',
        installments: 12
    }));
    await payInvoice.execute(new PayInvoiceInputData({
        code: '2022EM1A0001',
        month: 1,
        year: 2022,
        amount: 24933.22,
        paymentDate: new Date('2022-06-20'),
    }));
    const getEnrollmentOutputData = await getEnrollment.execute('2022EM1A0001', new Date('2022-06-20'));
    expect(getEnrollmentOutputData.code).toBe('2022EM1A0001');
    expect(getEnrollmentOutputData.invoices[0].balance).toBe(0);
});
