import { User } from "./user.model";

export interface Album {
    _id: string;
    filename: string;
    likes: string[];
    comments: string[];
    userData: string;
    timestamp: string;
}