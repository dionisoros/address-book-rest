import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from "koa-bodyparser";
import {timingLogger, exceptionHandler, jwtConfig} from './utils';
import {router as contactRouter} from './contact';
import {router as authRouter} from './auth';
import {router as userRouter} from './user';
import jwt from 'koa-jwt';
import cors from '@koa/cors';

const app = new Koa();

app.use(cors());
app.use(exceptionHandler);
app.use(timingLogger);
app.use(bodyParser());

const prefix = '/api';

// public
const publicApiRouter = new Router({prefix});
publicApiRouter
    .use('/auth', authRouter.routes());
app
  .use(publicApiRouter.routes())
  .use(publicApiRouter.allowedMethods());

app.use(jwt(jwtConfig));

// protected
const protectedApiRouter = new Router({ prefix });
protectedApiRouter
    .use('/contacts', contactRouter.routes())
    .use('/users', userRouter.routes());

app
    .use(protectedApiRouter.routes())
    .use(protectedApiRouter.allowedMethods());

app.listen(3000);
console.log('koa-server started on port 3000');
