import RepositoryAbstractFactory from "../../domain/factory/RepositoryAbstractFactory";
import IsAuthrorized from "../../domain/usecase/IAuthorized";
import IsAuthenticated from "../../domain/usecase/IsAuthenticated";
import Login from "../../domain/usecase/Login";

export default class SecurityController {
    repositoryFactory: RepositoryAbstractFactory;
    
    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    async isAuthenticated(params: any, body: any, headers: any): Promise<boolean> {
        const token = headers.authentication;
        const isAuthenticated = new IsAuthenticated(this.repositoryFactory);
        return isAuthenticated.execute(token);
    }

    async isAuthorized(params: any, body: any, headers: any): Promise<boolean> {
        const token = headers.authentication;
        const isAuthorized = new IsAuthrorized(this.repositoryFactory);
        return isAuthorized.execute(token);
    }

    async login(params: any, body: any, headers: any): Promise<string> {
        const login = new Login(this.repositoryFactory);
        return login.execute(body.username, body.password);
    }
}