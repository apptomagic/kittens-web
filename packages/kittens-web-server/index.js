import express from 'express';

import rpc from './rpc/index.js';
import {setupStatic} from './static.js';

const app = express();

app.use('/rpc', rpc);
setupStatic(app);

app.listen(3000, () => console.log('Server running at http://localhost:3000/'));
