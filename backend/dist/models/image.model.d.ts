import { Document, Schema, Model as IModel } from 'mongoose';
export interface ImageModel extends Document {
    title: string;
    location: string;
    description: string;
    encoding?: string;
    mimetype?: string;
    size?: number;
}
export declare const ImageSchema: Schema;
export declare const Image: IModel<ImageModel>;
