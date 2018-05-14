import { Request, Response } from 'express';

export function loginSuccess(req: Request, res:Response) {
	return res.send('logged in');
}