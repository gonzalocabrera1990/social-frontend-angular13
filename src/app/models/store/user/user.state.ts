import { User } from '../../user.model';

export interface UserState {
    user: User | any;
    isLoading: boolean;
    errmess: string | null;

}
export interface Erro {
    message: string;
}