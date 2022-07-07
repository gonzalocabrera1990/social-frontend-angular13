import { Followers } from '../../followers.model';

export interface FollowersState {
    followers: Followers[] | null;
    errmess: string | null;
    isLoading: boolean;
}
export interface Error {
    message: string;
}