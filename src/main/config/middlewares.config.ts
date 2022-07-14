/* eslint-disable no-unused-vars */
import { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import nocache from 'nocache';
import { bodyParser, urlEncoded, ddos, helmet, fingerprint, apiRatelimit, language } from '../middlewares';
// import { noCache } from '../middlewares/noChache.middleware';

export default (app: Express): void => {
  app.use(language);
  app.use(fingerprint);
  app.use(cookieParser());
  app.use(bodyParser);
  app.use(urlEncoded);
  // app.use(cors);
  app.use(cors({ origin: '*', credentials: true }));
  app.use(ddos.express);
  app.use(apiRatelimit);
  app.use(helmet());
  app.use(nocache());
};
