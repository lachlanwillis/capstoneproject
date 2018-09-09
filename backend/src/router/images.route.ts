import { Request, Response, RequestHandler } from 'express';

import { Image } from '../models';
import { isValidSting } from '../utils';
import { detector } from '..'; 
/**
 *  The handler for the image upload. Creates an entry in the database for an 
 *  image that has been uploaded.
 */
export const UploadImageHandler: RequestHandler = (req: Request, res: Response): void => {  
  if (req.file === undefined) res.json({ error: "No image", message: "Please upload an image file." });
  else {
    if (req.body.title === undefined || !isValidSting(req.body.title)) 
      res.json({ error: "title", message: "Please use an appropriate title." }); 
    else if (req.body.description === undefined || !isValidSting(req.body.description)) 
      res.json({ error: "description", message: "Please use an appropriate description." });
    else {
      (new Image({
        title: req.body.title,
        description: req.body.description,
        place: req.body.location,
        location: req.file.path,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        size: req.file.size,
        fileName: req.file.filename,
        userId: req.user.id,
        name: (req.user.facebook || {}).name || (req.user.google || {}).name || (req.user.email || '').split('@')[0] || 'Unknown User',
      })).save()
         .then(image => {
           detector.addDetection(image.id, image.location);
           res.json({ message: "Image created successfully." });
         }).catch(() => {
           res.json({ message: "An unexpected error occurred." });
         })
    }
  }
}

/**
 * The handler for updating an image
 */
export const UpdateMyImageHandler: RequestHandler = (req: Request, res: Response): void => {
  Image.findOne({ _id: req.body.id, userId: req.user.id })
    .then(image => {
      if (!image) {
        res.status(400).json({ error: true, message: 'No image was found.' });
      } else {
        if (req.body.title) image.title = req.body.title;
        if (req.body.description) image.description = req.body.description;
        image.save()
          .then(() => res.json({ success: true, message: 'Image updated successfully' }))
          .catch(err => res.status(500).json({ error: true, message: err.message }));
      }
    })
    .catch(err => res.status(500).json({ error: true, message: err.message }));
}

/**
 * The handler for getting images. Sends a list of all images when requested. 
 */
export const GetImageHandler: RequestHandler = (req: Request, res: Response): void => {
    Image.find({ deleted: false, rubbishVisibility: true })
       .then(images => res.json(images)).catch(err => res.status(500).send(err)); // TODO: include a limit later.
}

export const GetMyImagesHandler: RequestHandler = (req: Request, res: Response): void => {
    Image.find({ deleted: false, rubbishVisibility: true, userId: req.user.id })
       .then(images => res.json(images)).catch(err => res.status(500).send(err));
}

export const GetFlaggedImagesHandler: RequestHandler = (req: Request, res: Response): void => {
    Image.find({ deleted: false, rubbishVisibility: false }).then(images => res.json(images)).catch(err => res.status(500).send(err));
}


export const DeleteMyImageHandler: RequestHandler = (req: Request, res: Response): void => {
  Image.findOne({ _id: req.params.id, userId: req.user.id })
       .then(image => { image.deleted = true; image.save(); res.json({ success: true, imessage: 'Image deleted successfully.' })})
       .catch(err => res.status(500).send(err));
}

/**
 * The handler for deleting images. Removes an image by an id. 
 */
export const DeleteImageHandler: RequestHandler = (req: Request, res: Response): void => {
  if (!req.params.id) res.status(500).json({ error: true, message: 'Malformed request.' });
  else
    Image.findById(req.params.id)
        .then(image => { 
          image.deleted = true;
          image.save()
            .then(() => res.json({ success: true, error: false, message: 'Image deleted successfully.'}))
            .catch(err => res.status(500).json({ success: false, error: true, message: err }));
        })
        .catch(err => res.status(500).json({ success: true, error: true, message: err }));
}


export const AcceptFlaggedImageHandler: RequestHandler = (req: Request, res: Response): void => {
    if (!req.body.id) res.status(500).json({ error: true, message: 'Malformed accept request.' });
    else
        Image.findById(req.body.id).then(image => {
            image.rubbishVisibility = true;
            image.save().then(() => res.json({ success: true, error: false, message: 'Image accepted successfully.' }))
                .catch(err => res.status(500).json({ success: false, error: true, message: err }));
        }).catch(err => res.status(500).json({ success: true, error: true, message: err }));
}
