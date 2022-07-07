import { Notifications } from '../../notifications.model';

export interface NotificationsState {
    notifications: Notifications[] | null;
    errmess: string | null;
    isLoading: boolean;
}
export interface Error {
    message: string;
}