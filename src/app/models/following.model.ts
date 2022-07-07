import { User } from './user.model'
export interface Following {
    timestamp: string;
    _id: string;
    id: User;
}