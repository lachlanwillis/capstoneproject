
import * as express from 'express';
import * as path from 'path';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import { Application } from 'express';
import { connect } from 'mongoose';

import { Router } from './router';
import { authentication } from './authentication';
  import { detectorGenerator, Detector } from './detector';

// Connect to the database. This shouldn't be here. 
// In future when we deploy we should get rid of this,
// but it just makes things so much easier.
connect(process.env.MONGO_URL || 'mongodb://localhost/rubbish');

export const app: Application = express();
export const detector = detectorGenerator();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(authentication.initialize());
app.use(authentication.session());
app.use(Router);
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
app.use('/', express.static(path.join(__dirname, '..', 'assets')));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '..', 'assets', 'index.html')));
