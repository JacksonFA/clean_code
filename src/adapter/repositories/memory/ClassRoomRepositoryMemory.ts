import ClassRoom from "../../../domain/entity/ClassRoom";
import ClassRoomRepository from "../../../domain/repository/ClassRoomRepository";

export default class ClassRoomRepositoryMemory implements ClassRoomRepository {
    classRoom: ClassRoom[];

    constructor() {
        this.classRoom = [
            new ClassRoom({
                level: "EM",
                module: "3",
                code: "A",
                capacity: 2,
                start_date: new Date("2022-06-01"),
                end_date: new Date("2022-12-15")
            }),
            new ClassRoom({
                level: "EM",
                module: "3",
                code: "B",
                capacity: 5,
                start_date: new Date("2022-05-01"),
                end_date: new Date("2022-05-30")
            }),
            new ClassRoom({
                level: "EM",
                module: "3",
                code: "C",
                capacity: 5,
                start_date: new Date("2021-05-01"),
                end_date: new Date("2022-06-30")
            })
        ];
    }

    findByCode(code: string) {
        const classRoom = this.classRoom.find(classRoom => classRoom.code === code);
        if (!classRoom) throw new Error('Class not fount');
        return classRoom;
    }
}