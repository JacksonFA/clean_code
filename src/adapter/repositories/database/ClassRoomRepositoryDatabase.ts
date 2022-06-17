import ClassRoom from "../../../domain/entity/ClassRoom";
import ClassRoomRepository from "../../../domain/repository/ClassRoomRepository";
import ConnectionPool from "../../../infra/database/ConnectionPool";

export default class ClassRoomRepositoryDatabase implements ClassRoomRepository {

    async findByCode(code: string): Promise<ClassRoom> {
        const classRoomData = await ConnectionPool.one("select * from system.classRoom where code = $1", [code]);
        if (!classRoomData) throw new Error('Class not fount');
        return new ClassRoom({
            level: classRoomData.level,
            module: classRoomData.module,
            code: classRoomData.code,
            capacity: classRoomData.capacity,
            start_date: classRoomData.start_date,
            end_date: classRoomData.end_date
        });
    }
}