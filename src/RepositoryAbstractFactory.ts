import ClassRoomRepository from "./ClassRoomRepository";
import EnrollmentRepository from "./EnrollmentRepository";
import LevelRepository from "./LevelRepository";
import ModuleRepository from "./ModuleRepository";

export default interface RepositoryAbstractFactory {
    createLevelRepository(): LevelRepository;
    createModuleRepository(): ModuleRepository;
    createClassRoomRepository(): ClassRoomRepository;
    createEnrollmentsRepository(): EnrollmentRepository;
}