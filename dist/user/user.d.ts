import { ObjectId } from "mongodb";
export interface User {
    _id: ObjectId;
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
}
export interface Response {
    acknowledged: boolean;
    insertedId: ObjectId;
}
