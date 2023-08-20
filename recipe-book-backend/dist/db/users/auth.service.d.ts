import { UserService } from './user.services';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    validateUser(email: string, password: string): Promise<any>;
}
