import { Comment } from '../../comment.model';

export interface CommentsState {
    comments: Comment[] | null;
    errmess: string | null;
    isLoading: boolean;
}
export interface Error {
    message: string;
}