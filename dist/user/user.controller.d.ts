import { AuthService } from 'src/auth/auth.service';
import { UserService } from './user.service';
import { Request, Response } from 'express';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    getUsers(response: Response, req: Request): Promise<void>;
    doLogin(body: any, response: Response): Promise<void>;
    registerNewUser(body: any, response: Response): Promise<void>;
}
