import express from 'express';

import {setupStatic} from './static.js';

const app = express();

setupStatic(app);

app.listen(3000, () => console.log('Server running at http://localhost:3000/'));
