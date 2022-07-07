import { User } from '../../user.model';

export interface AuthState {
    user: User | any;
    errmess: Error | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    token: string | null;
    id: string | null;
}