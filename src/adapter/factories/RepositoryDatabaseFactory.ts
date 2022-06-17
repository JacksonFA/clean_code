import RepositoryAbstractFactory from "../../domain/factory/RepositoryAbstractFactory";
import ClassRoomRepositoryDatabase from "../repositories/database/ClassRoomRepositoryDatabase";
import EnrollmentRepositoryDatabase from "../repositories/database/EnrollmentRepositoryDatabase";
import LevelRepositoryDatabase from "../repositories/database/LevelRepositoryDatabase";
import ModuleRepositoryDatabase from "../repositories/database/ModuleRepositoryDatabase";

export default class RepositoryDatabaseFactory implements RepositoryAbstractFactory {

    constructor () {}

    createLevelRepository () {
        return new LevelRepositoryDatabase();
    }

    createModuleRepository () {
        return new ModuleRepositoryDatabase();
    }

    createClassRoomRepository () {
        return new ClassRoomRepositoryDatabase();
    }

    createEnrollmentsRepository () {
        return new EnrollmentRepositoryDatabase();
    }
}