import { StoriesFilter } from '../../imageswall.model';

export interface StoriesState {
    stories: StoriesFilter | null;
    errmess: string | null;
    isLoading: boolean;
}
export interface Error {
    message: string;
}