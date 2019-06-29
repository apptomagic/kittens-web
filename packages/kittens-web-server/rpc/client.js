import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';
import caller from 'grpc-caller';

const BACKEND_ADDR = process.env.KITTENS_BACKEND || 'localhost:50051';
const PROTO_PATH = resolve(
  dirname(resolve(fileURLToPath(import.meta.url))) + '/../kittens-api/proto'
);

export default function client(proto, service, ...more) {
  return caller(BACKEND_ADDR, `${PROTO_PATH}/${proto}.proto`, service, ...more);
}
