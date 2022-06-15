import ClassRoomRepository from "../repository/ClassRoomRepository";
import EnrollmentRepository from "../repository/EnrollmentRepository";
import LevelRepository from "../repository/LevelRepository";
import ModuleRepository from "../repository/ModuleRepository";

export default interface RepositoryAbstractFactory {
    createLevelRepository(): LevelRepository;
    createModuleRepository(): ModuleRepository;
    createClassRoomRepository(): ClassRoomRepository;
    createEnrollmentsRepository(): EnrollmentRepository;
}