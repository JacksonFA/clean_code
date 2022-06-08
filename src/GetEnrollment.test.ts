import EnrollStudent from './EnrollStudent';
import EnrollStudentInputData from './EnrollStudentInputData';
import GetEnrollment from './GetEnrollment';
import RepositoryMemoryFactory from './RepositoryMemoryFactory';

let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;

beforeEach(() => {
    const repositoryMemoryFactory = new RepositoryMemoryFactory();
    enrollStudent = new EnrollStudent(repositoryMemoryFactory);
    getEnrollment = new GetEnrollment(repositoryMemoryFactory);
});

test('should get enrollment by code with invoice balance', () => {
    enrollStudent.excute(new EnrollStudentInputData({
        studentName: 'Maria Carolina Fonseca',
        studentCpf: '755.525.774-26',
        studentBirthDate: '2002-03-12',
        level: 'EM',
        module: '1',
        classRoom: 'A',
        installments: 12
    }));
    const getEnrollmentOutputData = getEnrollment.execute('2022EM1A0001');
    expect(getEnrollmentOutputData.code).toBe('2022EM1A0001');
    expect(getEnrollmentOutputData.balance).toBe(16999.99);
});
