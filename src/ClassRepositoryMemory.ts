import ClassRepository from "./ClassRepository";

export default class ClassRepositoryMemory implements ClassRepository {
    clazz: any[];

    constructor() {
        this.clazz = [
            {
                level: "EM",
                module: "3",
                code: "A",
                capacity: 2,
                start_date: "2021-06-01",
                end_date: "2021-12-15"
            },
            {
                level: "EM",
                module: "3",
                code: "B",
                capacity: 5,
                start_date: "2021-05-01",
                end_date: "2021-05-30"
            },
            {
                level: "EM",
                module: "3",
                code: "C",
                capacity: 5,
                start_date: "2021-05-01",
                end_date: "2021-06-30"
            }
        ];
    }

    findByCode(code: string) {
        const clazz = this.clazz.find(clazz => clazz.code === code);
        if (!clazz) throw new Error('Class not fount');
        return clazz;
    }
}