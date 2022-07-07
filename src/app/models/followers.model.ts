import { User } from './user.model'
export interface Followers {
    timestamp: string;
    _id: string;
    id: User;
}