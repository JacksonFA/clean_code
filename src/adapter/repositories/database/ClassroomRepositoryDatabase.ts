import Classroom from "../../../domain/entity/ClassRoom";
import ClassroomRepository from "../../../domain/repository/ClassRoomRepository";
import ConnectionPool from "../../../infra/database/ConnectionPool";

export default class ClassroomRepositoryDatabase implements ClassroomRepository {

    async findByCode(code: string): Promise<Classroom> {
        const classroomData = await ConnectionPool.one("select * from system.classroom where code = $1", [code]);
        return new Classroom({
            level: classroomData.level,
            module: classroomData.module,
            code: classroomData.code,
            capacity: classroomData.capacity,
            start_date: classroomData.start_date,
            end_date: classroomData.end_date
        });
    }
}