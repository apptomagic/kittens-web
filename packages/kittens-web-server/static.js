import {existsSync} from 'fs';
import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';
import express from 'express';
import etbms from 'express-transform-bare-module-specifiers';
const transformMiddleware = typeof etbms === 'function' ? etbms : etbms.default;

export function faviconServer(req, res) {
  res.redirect(301, '/assets/favicon.ico');
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

export const fallbackStaticServer = express.static(STATIC_ROOT, {
  redirect: false,
});
// fallback everything to / and treat it as a SPA (let the front-end deal with 404s)
export function fallbackServer(req, res, next) {
  const parts = req.path.split('/');
  if (FALLBACK_BLACKLIST.includes(parts[1])) {
    return next();
  } else {
    console.log(`Falling back for ${req.path}`);
    parts.pop();
    while (parts.length) {
      const index = resolve(
        STATIC_ROOT + parts.concat(['index.html']).join('/')
      );
      // console.log(`trying ${index}`);
      if (existsSync(index)) {
        req.originalUrl = req.url = parts.join('/') + '/';
        return fallbackStaticServer(req, res, next);
      }
      parts.pop();
    }
    // shouldn't happen — if you're here it means you have no /index.html
    return next();
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
