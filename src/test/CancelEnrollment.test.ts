import CancelEnrollment from '../domain/usecase/CancelEnrollment';
import EnrollStudent from '../domain/usecase/EnrollStudent';
import EnrollStudentInputData from '../domain/usecase/DTOs/EnrollStudentInputData';
import GetEnrollment from '../domain/usecase/GetEnrollment';
import RepositoryMemoryFactory from '../adapter/factories/RepositoryMemoryFactory';

let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;
let cancelEnrollment: CancelEnrollment;

beforeEach(() => {
    const repositoryMemoryFactory = new RepositoryMemoryFactory();
    enrollStudent = new EnrollStudent(repositoryMemoryFactory);
    getEnrollment = new GetEnrollment(repositoryMemoryFactory);
    cancelEnrollment = new CancelEnrollment(repositoryMemoryFactory);
});

test('should cancel enrollment', async () => {
    enrollStudent.excute(new EnrollStudentInputData({
        studentName: 'Maria Carolina Fonseca',
        studentCpf: '755.525.774-26',
        studentBirthDate: '2002-03-12',
        level: 'EM',
        module: '1',
        classRoom: 'A',
        installments: 12
    }));
    await cancelEnrollment.execute('2022EM1A0001');
    const getEnrollmentOutputData = await getEnrollment.execute('2022EM1A0001', new Date('2022-06-20'));
    expect(getEnrollmentOutputData.status).toBe('cancelled');
});
