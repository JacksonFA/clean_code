import EnrollStudent from './EnrollStudent';
import EnrollStudentInputData from './EnrollStudentInputData';
import GetEnrollment from './GetEnrollment';
import PayInvoice from './PayInvoice';
import RepositoryMemoryFactory from './RepositoryMemoryFactory';

let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;
let payInvoice: PayInvoice;

beforeEach(() => {
    const repositoryMemoryFactory = new RepositoryMemoryFactory();
    enrollStudent = new EnrollStudent(repositoryMemoryFactory);
    getEnrollment = new GetEnrollment(repositoryMemoryFactory);
    payInvoice = new PayInvoice(repositoryMemoryFactory);
});

test('should pay enrollment invoice', () => {
    enrollStudent.excute(new EnrollStudentInputData({
        studentName: 'Maria Carolina Fonseca',
        studentCpf: '755.525.774-26',
        studentBirthDate: '2002-03-12',
        level: 'EM',
        module: '1',
        classRoom: 'A',
        installments: 12
    }));
    payInvoice.execute('2022EM1A0001', 1, 2022, 1416.66);
    const getEnrollmentOutputData = getEnrollment.execute('2022EM1A0001');
    expect(getEnrollmentOutputData.code).toBe('2022EM1A0001');
    expect(getEnrollmentOutputData.balance).toBe(15583.33);
});
