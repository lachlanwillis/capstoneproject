import * as express from 'express';
import { Application } from 'express';

export const app: Application = express();

app.get('/hey', (req, res) => res.send('Hey!!'));
app.get('/*', (req, res) => res.send('Hey!'));