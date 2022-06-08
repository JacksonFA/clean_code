import ClassRoomRepositoryMemory from "./ClassRoomRepositoryMemory";
import EnrollmentRepositoryMemorySingleton from "./EnrollmentRepositoryMemorySingleton";
import LevelRepositoryMemory from "./LevelRepositoryMemory";
import ModuleRepositoryMemory from "./ModuleRepositoryMemory";
import RepositoryAbstractFactory from "./RepositoryAbstractFactory";

export default class RepositoryMemoryFactory implements RepositoryAbstractFactory {
    constructor() {
        EnrollmentRepositoryMemorySingleton.destroyInstance();
    }

    createLevelRepository() {
        return new LevelRepositoryMemory();
    }
    createModuleRepository() {
        return new ModuleRepositoryMemory();
    }
    createClassRoomRepository() {
        return new ClassRoomRepositoryMemory();
    }
    createEnrollmentsRepository() {
        return EnrollmentRepositoryMemorySingleton.getInstance();
    }
}