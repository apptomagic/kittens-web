import Koa from 'koa';

import {componentServer, staticServer, errorPages} from './static.js';

const app = new Koa();

app.use(componentServer);
app.use(staticServer);
app.use(errorPages);

app.listen(3000);
console.log('Server running at http://localhost:3000/');
