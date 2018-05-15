import { Document, Schema, Model as IModel, model as Model } from 'mongoose';

export interface ImageModel extends Document {
  title: string;
  location: string;
  description: string;
  encoding?: string;
  mimetype?: string;
  size?: number;
  fileName: string;
}

export const ImageSchema: Schema = new Schema({
  title: String,
  location: String,
  description: String,
  encoding: String,
  mimetype: String,
  size: Number,
  fileName: String
});

export const Image: IModel<ImageModel> = Model<ImageModel>("Image", ImageSchema);