import { Content } from '../../start-content.model';

export interface ContentState {
    content: Content[] | null;
    errmess: string | null;
    isLoading: boolean;
}
export interface Error {
    message: string;
}