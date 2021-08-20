const express = require('express');
const app = express();
const bodyParser = require('body-parser');

import { notfound } from './middleware/notfound';
import * as routes from './routes';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
routes.init(app);

app.use(notfound);

export default app;
