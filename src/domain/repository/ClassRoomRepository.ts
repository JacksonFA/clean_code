import ClassRoom from "../entity/ClassRoom";

export default interface ClassRepository {
    findByCode(code: string): Promise<ClassRoom>;
}