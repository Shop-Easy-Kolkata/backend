import * as mongodb from 'mongodb';
import { User } from './user';
export declare class UserService {
    getUsers(): Promise<User[]>;
    getUserByUsername(name: any): Promise<any>;
    registerNewUser(userObj: any): Promise<mongodb.InsertOneResult<mongodb.BSON.Document> | {
        acknowledged: boolean;
    }>;
    sendConfirmationMail(body: any): void;
}
