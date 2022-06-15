export default class EnrollStudentInputData {
    studentName: string;
    studentCpf: string;
    studentBirthDate: string;
    level: string;
    module: string;
    classRoom: string;
    installments: number;

    constructor({ studentName, studentCpf, studentBirthDate, level, module, classRoom, installments }: { studentName: string, studentCpf: string, studentBirthDate: string, level: string, module: string, classRoom: string, installments: number }) {
        this.studentName = studentName;
        this.studentCpf = studentCpf;
        this.studentBirthDate = studentBirthDate;
        this.level = level;
        this.module = module;
        this.classRoom = classRoom;
        this.installments = installments;
    }
}