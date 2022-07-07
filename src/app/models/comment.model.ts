import { User } from './user.model'
export interface Comment {
    _id: string;
    comment: string;
    author: User;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface CommentInterface {
    comment: string,
    author: string,
    image: string
}
export interface CommentParameter {
    commentValue: string,
    imageId: string
}