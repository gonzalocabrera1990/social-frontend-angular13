import { User } from './user.model';
export interface Notifications {
    followingId: User;
    message: string;
    readstatus: boolean;
    timestamp: string;
    _id:string;
}
export interface NotificationResponse {
    action: boolean;
    followerId: string;
    notiId: string;
}