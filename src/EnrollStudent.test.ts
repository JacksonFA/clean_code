import ClassRoomRepositoryMemory from './ClassRoomRepositoryMemory';
import EnrollmentRepositoryMemory from './EnrollmentRepositoryMemory';
import EnrollStudent from './EnrollStudent';
import LevelRepositoryMemory from './LevelRepositoryMemory';
import ModuleRepositoryMemory from './ModuleRepositoryMemory';

let enrollStudent: EnrollStudent;

beforeEach(() => {
    const levelRepository = new LevelRepositoryMemory();
    const moduleRepository = new ModuleRepositoryMemory();
    const classRoomRepository = new ClassRoomRepositoryMemory();
    const enrollmentRepository = new EnrollmentRepositoryMemory();
    enrollStudent = new EnrollStudent(
        levelRepository,
        moduleRepository,
        classRoomRepository,
        enrollmentRepository
    );
})

describe('EnrollStudent Test Suite Case', () => {
    it('should not enroll without valid student name', () => {
        const enrollmentRequest = {
            student: {
                name: 'Ana',
            }
        };
        expect(() => enrollStudent.excute(enrollmentRequest))
            .toThrow(new Error('Invalid name'))
    });

    it('should not enroll without valid student cpf', () => {
        const enrollmentRequest = { 
            student: {
                name: 'Ana Silva',
                cpf: '123.456.789-99',
            }
        };
        expect(() => enrollStudent.excute(enrollmentRequest))
            .toThrow(new Error('Invalid cpf'))
    });

    it('should not enroll duplicate student', () => {
        const enrollmentRequest = {
            student: {
                name: 'jackson Arceno',
                cpf: '098.383.469.50',
                birthDate: "1998-03-12"
            },
            level: "EM",
            module: "1",
            class: "A"
        };
        enrollStudent.excute(enrollmentRequest);
        expect(() => enrollStudent.excute(enrollmentRequest))
            .toThrow(new Error('Enrollment with duplicated student is not allowed'))
    });

    it('should generate enrollment code', () => {
        const enrollmentRequest = {
            student: {
                name: "Maria Carolina Fonseca",
                cpf: "755.525.774-26",
                birthDate: "1998-03-12"
            },
            level: "EM",
            module: "1",
            class: "A"
        };
        const newEnrollment = enrollStudent.excute(enrollmentRequest);
        expect(newEnrollment.code.value).toBe('2022EM1A0001');
    });

    it('should not enroll student below minimum age', () => {
        const enrollmentRequest = {
            student: {
                name: "Maria Carolina Fonseca",
                cpf: "755.525.774-26",
                birthDate: "2006-03-12"
            },
            level: "EM",
            module: "3",
            class: "A"
        };
        expect(() => enrollStudent.excute(enrollmentRequest)).toThrow(new Error('Student below minimum age'));
    });

    it('should not enroll student over class capacity', () => {        
        enrollStudent.excute({
            student: {
                name: "Maria Carolina Fonseca",
                cpf: "755.525.774-26",
                birthDate: "2003-03-12"
            },
            level: "EM",
            module: "3",
            class: "A"
        });
        enrollStudent.excute({
            student: {
                name: "Maria Carolina Fonseca",
                cpf: "099.305.949-06",
                birthDate: "2003-03-12"
            },
            level: "EM",
            module: "3",
            class: "A"
        });
        const enrollmentRequest = {
            student: {
                name: "Maria Carolina Fonseca",
                cpf: "098.383.469-50",
                birthDate: "2003-03-12"
            },
            level: "EM",
            module: "3",
            class: "A"
        };
        expect(() => enrollStudent.excute(enrollmentRequest)).toThrow(new Error('Class is over capacity'));
    });

    it('should not enroll after the end of the class', () => {
        const enrollmentRequest = {
            student: {
                name: "Maria Carolina Fonseca",
                cpf: "755.525.774-26",
                birthDate: "2002-03-12"
            },
            level: "EM",
            module: "1",
            class: "B"
        };
        expect(() => enrollStudent.excute(enrollmentRequest)).toThrow(new Error('Class is already finished'));
    });

    it('should not enroll after 25% of the start of the class', () => {
        const enrollmentRequest = {
            student: {
                name: "Maria Carolina Fonseca",
                cpf: "755.525.774-26",
                birthDate: "2002-03-12"
            },
            level: "EM",
            module: "1",
            class: "C"
        };
        expect(() => enrollStudent.excute(enrollmentRequest)).toThrow(new Error('Class is already started'));
    });

    it('should generate the invoices based on the number of installments, rounding each amount and applying the rest in the last invoice', () => {
        const enrollmentRequest = {
            student: {
                name: "Maria Carolina Fonseca",
                cpf: "755.525.774-26",
                birthDate: "2002-03-12"
            },
            level: "EM",
            module: "1",
            class: "A",
            installments: 12
        };
        const enrollment = enrollStudent.excute(enrollmentRequest);
        expect(enrollment.invoices).toHaveLength(12);
        expect(enrollment.invoices[0].amount).toBe(1416.66);
        expect(enrollment.invoices[11].amount).toBe(1416.73);
    });
});