import { Request, Response, RequestHandler } from 'express';
import * as multer from 'multer';

import { Message, MessageModel } from '../models';

/**
 * The handler for getting messages. Sends a list of all messages when requested. 
 */
export const GetMyMessagesHandler: RequestHandler = (req: Request, res: Response): void => {
  Message.find({ userId: req.user.id })
     .then(messages => res.json(messages)).catch(err => res.status(500).send(err));
}