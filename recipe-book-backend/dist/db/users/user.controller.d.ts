import { UserService } from './user.services';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    addUser(email: string, password: string): any;
    getAllUsers(): Promise<{
        email: string;
        password: string;
    }[]>;
}
