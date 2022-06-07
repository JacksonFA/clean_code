import Period from "./Period";

export default class ClassRoom {
    level: string;
    module: string;
    code: string;
    capacity: number;
    start_date: Date;
    end_date: Date;
    period: Period;

    constructor({level, module, code, capacity, start_date, end_date}: {level: string, module: string, code: string, capacity: number, start_date: Date, end_date: Date}) {
        this.level = level;
        this.module = module;
        this.code = code;
        this.capacity = capacity;
        this.start_date = start_date;
        this.end_date = end_date;
        this.period = new Period(start_date, end_date);
    }

    isFinished(currentDate: Date): boolean {
        return currentDate.getTime() > this.end_date.getTime();
    }

    getProgress(currentDate: Date): number {
        const period = new Period(currentDate, this.end_date);
        const remainingDays = this.period.getDiffInDays() - period.getDiffInDays();
        return (remainingDays / this.period.getDiffInDays()) * 100;
    }
}
