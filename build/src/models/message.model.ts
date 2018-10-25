import { Document, Schema, Model as IModel, model as Model } from 'mongoose';

export interface MessageModel extends Document {
  userId: string;
  datestamp: Date;
  message: string;
}

export const MessageSchema: Schema = new Schema({
  userId: String,
  datestamp: { type: Date, default: Date.now() },
  message: String,
});

export const Message: IModel<MessageModel> = Model<MessageModel>("Message", MessageSchema);