import ClassRoom from "./ClassRoom";

export default interface ClassRepository {
    findByCode(code: string): ClassRoom;
}