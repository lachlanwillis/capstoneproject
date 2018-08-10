import { Document, Schema, Model as IModel, model as Model } from 'mongoose';
import { IDetection } from '../detector/detector';
import { Detection } from 'darknet';

export interface ImageModel extends Document {
  title: string;
  location: string;
  description: string;
  encoding?: string;
  mimetype?: string;
  size?: number;
  fileName: string;
  deleted?: boolean;
  userId: string;
  detections?: Detection[];
  rubbishVisibility?: boolean;
}

export const ImageSchema: Schema = new Schema({
  title: String,
  location: String,
  description: String,
  encoding: String,
  mimetype: String,
  size: Number,
  fileName: String,
  userId: String,
  detections: [
    { 
      name: String, 
      prob: Number, 
      box: {
        x: Number,
        y: Number,
        w: Number,
        h: Number
      }
    }
  ],
  deleted: { type: Boolean, default: false },
  rubbishVisibility: {type: Boolean, default: false}
});

export const Image: IModel<ImageModel> = Model<ImageModel>("Image", ImageSchema);