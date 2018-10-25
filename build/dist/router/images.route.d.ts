import { RequestHandler } from 'express';
/**
 *  The handler for the image upload. Creates an entry in the database for an
 *  image that has been uploaded.
 */
export declare const UploadImageHandler: RequestHandler;
/**
 * The handler for updating an image
 */
export declare const UpdateMyImageHandler: RequestHandler;
/**
 * The handler for getting images. Sends a list of all images when requested.
 */
export declare const GetImageHandler: RequestHandler;
export declare const GetMyImagesHandler: RequestHandler;
export declare const GetFlaggedImagesHandler: RequestHandler;
export declare const DeleteMyImageHandler: RequestHandler;
/**
 * The handler for deleting images. Removes an image by an id.
 */
export declare const DeleteImageHandler: RequestHandler;
export declare const AcceptFlaggedImageHandler: RequestHandler;
