export interface IMessage {
    id: string;
    author?: string;
    message: string;
    image?: string;
}

export type IMessageWithDateTime = Omit<IMessage, "id">