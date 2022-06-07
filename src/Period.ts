export default class Period {
    start: Date;
    end: Date;

    constructor(start: Date, end: Date) {
        this.start = start;
        this.end = end;
    }

    getDiffInMili(): number {
        return this.end.getTime() - this.start.getTime();
    }

    getDiffInDays(): number {
        return this.getDiffInMili() / (1000 * 60 * 60 * 24);
    }
}