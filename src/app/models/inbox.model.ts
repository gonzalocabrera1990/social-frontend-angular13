import { User } from "./user.model";

export interface Inbox {
    members: Members;
    room: string;
    talk: Messages[];
    timestamp: string;
    _id: string;
}

interface Members {
    userOne: User;
    userTwo: User;
}

interface Messages {
    author: string;
    content: string;
    seen: boolean;
    timestamp: string;
}

export interface Talking {
    message: Message;
    talk: Talk | null;
    receptor: string;
  }
interface Talk {
    room: string;
    _id: string | null;
    members?: Members;
    talk?: Messages[];
    timestamp?: string;
}
interface Message {
    comment: string;
}