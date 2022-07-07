import { User } from './user.model';
import { Comment } from './comment.model';
export interface Content {
    commento: Comment[];
    comments: string[];
    id: string;
    imageId?: ImagenID;
    videoId?: ImagenID;
    timestamp: string;
    userId: User;
    _id: string;
}
export interface ContentVideo {
    commento: Comment[];
    comments: string[];
    id: string;
    imageId?: ImagenID;
    videoId?: ImagenID;
    timestamp: string;
    userId: User;
    _id: string;
}
interface ImagenID {
    comments: string[];
    filename: string;
    likes: string[];
    timestamp: string;
    userData: string;
    _id: string;
}