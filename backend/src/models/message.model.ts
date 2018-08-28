import { Document, Schema, Model as IModel, model as Model } from 'mongoose';

export interface MessageModel extends Document {
  userId: string;
  datestamp: string;
  message: string;
}

export const MessageSchema: Schema = new Schema({
  userId: String,
  datestamp: String,
  message: String,
});

export const Message: IModel<MessageModel> = Model<MessageModel>("Image", MessageSchema);