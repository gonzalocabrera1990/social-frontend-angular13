import { Likes } from '../../likes.model';

export interface LikesState {
    likes: Likes | null;
    errmess: string | null;
    isLoading: boolean;
}
export interface Error {
    message: string;
}