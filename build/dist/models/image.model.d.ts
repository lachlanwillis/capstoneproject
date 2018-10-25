import { Document, Schema, Model as IModel } from 'mongoose';
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
    name?: string;
    place?: string;
}
export declare const ImageSchema: Schema;
export declare const Image: IModel<ImageModel>;
