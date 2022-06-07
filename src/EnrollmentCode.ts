export default class EnrollmentCode {
    value: string;

    constructor(level: string, module: string, classRoom: string, date: Date, sequence: number) {
        this.value = `${date.getFullYear()}${level}${module}${classRoom}${new String(sequence).padStart(4, '0')}`;
    }
}