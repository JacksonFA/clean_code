import RepositoryDatabaseFactory from "../../adapter/factories/RepositoryDatabaseFactory";
import HttpServer from "../http/HttpServer";

const repositoryFactory = new RepositoryDatabaseFactory();
HttpServer.start(repositoryFactory);