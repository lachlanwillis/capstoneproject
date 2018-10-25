import { Document, Schema, Model as IModel } from 'mongoose';
export interface MessageModel extends Document {
    userId: string;
    datestamp: Date;
    message: string;
}
export declare const MessageSchema: Schema;
export declare const Message: IModel<MessageModel>;
