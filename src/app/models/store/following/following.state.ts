import { Following } from '../../following.model';

export interface FollowingState {
    following: Following[] | null;
    errmess: string | null;
    isLoading: boolean;
}
export interface Error {
    message: string;
}