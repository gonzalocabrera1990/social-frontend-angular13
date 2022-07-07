import { User } from './user.model';
export interface Likes {
    User: User;
    image: string[];
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}