import { Request, Response, RequestHandler } from 'express';
import * as multer from 'multer';

import { Image, ImageModel } from '../models';

/**
 *  The handler for the image upload. Creates an entry in the database for an 
 *  image that has been uploaded.
 */
export const UploadImageHandler: RequestHandler = (req: Request, res: Response): void => {  
  if (req.file === undefined) res.json({ error: "No image", message: "Please upload an image file." });
  else {
    if (req.body.title === undefined || isValidSting(req.body.title)) 
      res.json({ error: "title", message: "Please use an appropriate title." }); 
    else if (req.body.description === undefined || isValidSting(req.body.description)) 
      res.json({ error: "description", message: "Please use an appropriate description." });
    else {
      (new Image({
        title: req.body.title,
        description: req.body.description,
        location: req.file.path,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        size: req.file.size,
        fileName: req.file.filename
      })).save()
         .then(() => {
           res.json({ message: "Image created successfully." });
         }).catch(() => {
           res.json({ message: "An unexpected error occurred." });
         })
    }
  }
}

/**
 * Checks a string to see if it's valid. E.g. not just whitespace.
 * @param string the string to be checked
 * @returns whether or not the string is empty or not
 */
function isValidSting(string: string): boolean {
  return string.replace(' ', '').split('').length <= 0;
}


export const GetImageHandler: RequestHandler = (req: Request, res: Response): void => {
    Image.find({}).then(images => res.json(images)).catch(err => res.status(500).send(err)); // TODO: include a limit later.
}
