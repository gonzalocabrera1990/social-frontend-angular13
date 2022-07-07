import { Inbox } from '../../inbox.model';

export interface InboxState {
    inbox: Inbox[] | null;
    errmess: string | null;
    isLoading: boolean;
}
export interface Error {
    message: string;
}