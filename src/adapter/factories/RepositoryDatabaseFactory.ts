import RepositoryAbstractFactory from "../../domain/factory/RepositoryAbstractFactory";
import ClassroomRepositoryDatabase from "../repositories/database/ClassroomRepositoryDatabase";
import EnrollmentRepositoryDatabase from "../repositories/database/EnrollmentRepositoryDatabase";
import LevelRepositoryDatabase from "../repositories/database/LevelRepositoryDatabase";
import ModuleRepositoryDatabase from "../repositories/database/ModuleRepositoryDatabase";

export default class RepositoryDatabaseFactory implements RepositoryAbstractFactory {

    constructor () {
    }

    createLevelRepository () {
        return new LevelRepositoryDatabase();
    }

    createModuleRepository () {
        return new ModuleRepositoryDatabase();
    }

    createClassroomRepository () {
        return new ClassroomRepositoryDatabase();
    }

    createEnrollmentRepository () {
        return new EnrollmentRepositoryDatabase();
    }
}