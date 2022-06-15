import EnrollStudent from '../domain/usecase/EnrollStudent';
import EnrollStudentInputData from '../domain/usecase/DTOs/EnrollStudentInputData';
import GetEnrollment from '../domain/usecase/GetEnrollment';
import RepositoryMemoryFactory from '../adapter/factories/RepositoryMemoryFactory';

let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;

beforeEach(() => {
    const repositoryMemoryFactory = new RepositoryMemoryFactory();
    enrollStudent = new EnrollStudent(repositoryMemoryFactory);
    getEnrollment = new GetEnrollment(repositoryMemoryFactory);
});

test('should get enrollment by code with invoice balance', async () => {
    enrollStudent.excute(new EnrollStudentInputData({
        studentName: 'Maria Carolina Fonseca',
        studentCpf: '755.525.774-26',
        studentBirthDate: '2002-03-12',
        level: 'EM',
        module: '1',
        classRoom: 'A',
        installments: 12
    }));
    const getEnrollmentOutputData = await getEnrollment.execute('2022EM1A0001', new Date('2022-06-20'));
    expect(getEnrollmentOutputData.code).toBe('2022EM1A0001');
    expect(getEnrollmentOutputData.balance).toBe(16999.99);
});

test('should calculate due date and return status open or overdue for each invoice', async () => {
    enrollStudent.excute(new EnrollStudentInputData({
        studentName: 'Maria Carolina Fonseca',
        studentCpf: '755.525.774-26',
        studentBirthDate: '2002-03-12',
        level: 'EM',
        module: '1',
        classRoom: 'A',
        installments: 12
    }));
    const getEnrollmentOutputData = await getEnrollment.execute('2022EM1A0001', new Date('2022-06-20'));
    expect(getEnrollmentOutputData.code).toBe('2022EM1A0001');
    expect(getEnrollmentOutputData.invoices[0].dueDate.toISOString()).toBe('2022-01-05T03:00:00.000Z');
    expect(getEnrollmentOutputData.invoices[0].status).toBe('overdue');
    expect(getEnrollmentOutputData.invoices[11].dueDate.toISOString()).toBe('2022-12-05T03:00:00.000Z');
    expect(getEnrollmentOutputData.invoices[11].status).toBe('open');
});

test('should calculate penalty and interest', async () => {
    enrollStudent.excute(new EnrollStudentInputData({
        studentName: 'Maria Carolina Fonseca',
        studentCpf: '755.525.774-26',
        studentBirthDate: '2002-03-12',
        level: 'EM',
        module: '1',
        classRoom: 'A',
        installments: 12
    }));
    const getEnrollmentOutputData = await getEnrollment.execute('2022EM1A0001', new Date('2022-06-20'));
    expect(getEnrollmentOutputData.code).toBe('2022EM1A0001');
    expect(getEnrollmentOutputData.invoices[0].penalty).toBe(141.67);
    expect(getEnrollmentOutputData.invoices[0].interests).toBe(23374.89);
    expect(getEnrollmentOutputData.invoices[11].penalty).toBe(0);
    expect(getEnrollmentOutputData.invoices[11].interests).toBe(0);
});
