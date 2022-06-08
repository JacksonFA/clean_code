import EnrollStudent from './EnrollStudent';
import EnrollStudentInputData from './EnrollStudentInputData';
import RepositoryMemoryFactory from './RepositoryMemoryFactory';

let enrollStudent: EnrollStudent;

beforeEach(() => {
    enrollStudent = new EnrollStudent(new RepositoryMemoryFactory());
})

describe('EnrollStudent Test Suite Case', () => {
    it('should not enroll without valid student name', () => {
        const enrollmentRequest = {
            studentName: 'Ana',
            studentCpf: '123.456.789-99',
            studentBirthDate: '1998-03-12',
            level: 'EM',
            module: '1',
            classRoom: 'A',
            installments: 12
        };
        expect(() => enrollStudent.excute(enrollmentRequest))
            .toThrow(new Error('Invalid name'))
    });

    it('should not enroll without valid student cpf', () => {
        const enrollmentRequest = {
            studentName: 'Ana Silva',
            studentCpf: '123.456.789-99',
            studentBirthDate: '1998-03-12',
            level: 'EM',
            module: '1',
            classRoom: 'A',
            installments: 12
        };
        expect(() => enrollStudent.excute(enrollmentRequest))
            .toThrow(new Error('Invalid cpf'))
    });

    it('should not enroll duplicate student', () => {
        const enrollmentRequest = new EnrollStudentInputData({
            studentName: 'Jackson Arceno',
            studentCpf: '098.383.469-50',
            studentBirthDate: '1998-03-12',
            level: 'EM',
            module: '1',
            classRoom: 'A',
            installments: 12
        });
        enrollStudent.excute(enrollmentRequest);
        expect(() => enrollStudent.excute(enrollmentRequest))
            .toThrow(new Error('Enrollment with duplicated student is not allowed'))
    });

    it('should generate enrollment code', () => {'1998-03-12'
        const enrollmentRequest = new EnrollStudentInputData({
            studentName: 'Maria Carolina Fonseca',
            studentCpf: '755.525.774-26',
            studentBirthDate: '1998-03-12',
            level: 'EM',
            module: '1',
            classRoom: 'A',
            installments: 12
        });
        const newEnrollment = enrollStudent.excute(enrollmentRequest);
        expect(newEnrollment.code).toBe('2022EM1A0001');
    });

    it('should not enroll student below minimum age', () => {
        const enrollmentRequest = new EnrollStudentInputData({
            studentName: 'Maria Carolina Fonseca',
            studentCpf: '755.525.774-26',
            studentBirthDate: '2006-03-12',
            level: 'EM',
            module: '3',
            classRoom: 'A',
            installments: 12
        });
        expect(() => enrollStudent.excute(enrollmentRequest)).toThrow(new Error('Student below minimum age'));
    });

    it('should not enroll student over class capacity', () => {
        enrollStudent.excute(new EnrollStudentInputData({
            studentName: 'Maria Carolina Fonseca',
            studentCpf: '755.525.774-26',
            studentBirthDate: '2003-03-12',
            level: 'EM',
            module: '3',
            classRoom: 'A',
            installments: 12
        }));
        enrollStudent.excute(new EnrollStudentInputData({
            studentName: 'Maria Carolina Fonseca',
            studentCpf: '099.305.949-06',
            studentBirthDate: '2003-03-12',
            level: 'EM',
            module: '3',
            classRoom: 'A',
            installments: 12
        }));
        const enrollmentRequest = new EnrollStudentInputData({
            studentName: 'Maria Carolina Fonseca',
            studentCpf: '098.383.469-50',
            studentBirthDate: '2003-03-12',
            level: 'EM',
            module: '3',
            classRoom: 'A',
            installments: 12
        });
        expect(() => enrollStudent.excute(enrollmentRequest)).toThrow(new Error('Class is over capacity'));
    });

    it('should not enroll after the end of the class', () => {
        const enrollmentRequest = new EnrollStudentInputData({
            studentName: 'Maria Carolina Fonseca',
            studentCpf: '755.525.774-26',
            studentBirthDate: '2002-03-12',
            level: 'EM',
            module: '1',
            classRoom: 'B',
            installments: 12
        });
        expect(() => enrollStudent.excute(enrollmentRequest)).toThrow(new Error('Class is already finished'));
    });

    it('should not enroll after 25% of the start of the class', () => {
        const enrollmentRequest = new EnrollStudentInputData({
            studentName: 'Maria Carolina Fonseca',
            studentCpf: '755.525.774-26',
            studentBirthDate: '2002-03-12',
            level: 'EM',
            module: '1',
            classRoom: 'C',
            installments: 12
        });
        expect(() => enrollStudent.excute(enrollmentRequest)).toThrow(new Error('Class is already started'));
    });

    it('should generate the invoices based on the number of installments, rounding each amount and applying the rest in the last invoice', () => {
        const enrollmentRequest = new EnrollStudentInputData({
            studentName: 'Maria Carolina Fonseca',
            studentCpf: '755.525.774-26',
            studentBirthDate: '2002-03-12',
            level: 'EM',
            module: '1',
            classRoom: 'A',
            installments: 12
        });
        const enrollment = enrollStudent.excute(enrollmentRequest);
        expect(enrollment.invoices).toHaveLength(12);
        expect(enrollment.invoices[0].amount).toBe(1416.66);
        expect(enrollment.invoices[11].amount).toBe(1416.73);
    });
});