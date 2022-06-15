import ClassRoomRepositoryMemory from '../repositories/memory/ClassRoomRepositoryMemory';
import EnrollmentRepositoryMemorySingleton from '../repositories/memory/EnrollmentRepositoryMemorySingleton';
import LevelRepositoryMemory from '../repositories/memory/LevelRepositoryMemory';
import ModuleRepositoryMemory from '../repositories/memory/ModuleRepositoryMemory';
import RepositoryAbstractFactory from '../../domain/factory/RepositoryAbstractFactory';

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