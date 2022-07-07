import { User } from '../../user.model';

export interface OtherUserState {
    otheruser: User | null;
    isLoading: boolean;
    errmess: string | null;

}
export interface Erro {
    message: string;
}