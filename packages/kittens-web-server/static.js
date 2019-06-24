import {resolve} from 'path';

import send from 'koa-send';

// Wrapper for send() that returns false on 404
async function maybeSend(ctx, path, opts) {
  try {
    return await send(ctx, path, opts);
  } catch (err) {
    if (err.status === 404) {
      return false;
    } else {
      throw err;
    }
  }
}

export async function componentServer(ctx, next) {
  const parts = ctx.path.split('/');
  if (parts[1] === 'components') {
    // TODO
  } else {
    return next();
  }
}

const FALLBACK_BLACKLIST = [
  'rpc',
  'assets',
  'components',
];
const staticOpts = {
  index: 'index.html',
  root: resolve(process.env.STATIC_ROOT || '../kittens-web/build'),
};

export async function staticServer(ctx, next) {
  if (!await maybeSend(ctx, ctx.path, staticOpts)) {
    // fallback everything to / and treat it as a SPA (let the front-end deal with 404s)
    const parts = ctx.path.split('/');
    if (FALLBACK_BLACKLIST.includes(parts[1])) {
      return next();
    } else {
      console.log(`Falling back for ${ctx.path}`);
      return (await maybeSend(ctx, '/', staticOpts)) || next();
    }
  }
}

// TODO make nice 404 and 500 pages
export async function errorPages(ctx, next) {return next();}
