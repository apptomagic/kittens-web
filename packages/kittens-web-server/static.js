import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';
import express from 'express';
import etbms from 'express-transform-bare-module-specifiers';
const transformMiddleware = typeof etbms === 'function' ? etbms : etbms.default;

export async function faviconServer(req, res) {
  res.redirect(301, '/assets/favicon.ico');
  res.send('Please see /assets/favicon.ico');
}

const COMPONENT_ROOT = resolve(
  dirname(fileURLToPath(import.meta.url)) + '/node_modules'
);
const transformComponent = transformMiddleware({
  rootDir: COMPONENT_ROOT,
  modulesUrl: '/components',
});
export const componentServer = express.Router();
componentServer.use(transformComponent);
componentServer.use(express.static(COMPONENT_ROOT));

const FALLBACK_BLACKLIST = ['rpc', 'assets', 'components'];
const STATIC_ROOT = resolve(process.env.STATIC_ROOT || '../kittens-web/build');

export const staticServer = express.static(STATIC_ROOT);

export function fallbackServer(req, res, next) {
  const parts = req.path.split('/');
  if (FALLBACK_BLACKLIST.includes(parts[1])) {
    return next();
  } else {
    console.log(`Falling back for ${req.path}`);
    req.originalUrl = req.url = '/';
    return staticServer(req, res, next);
  }
}

// TODO make nice 404 and 500 pages
export function errorPages(req, res, next) {
  return next();
}

export function setupStatic(app) {
  app.use('/components', componentServer);
  app.use(staticServer);
  app.get('/favicon.ico', faviconServer);
  app.use(fallbackServer);
  // app.use(errorPages);
}
