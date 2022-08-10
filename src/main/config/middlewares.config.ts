/* eslint-disable no-unused-vars */
import { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import nocache from 'nocache';
import { bodyParser, urlEncoded, ddos, helmet, fingerprint, apiRateLimit } from '../middlewares';
import { i18nMiddleware } from '../utils/i18next.config';
// import { noCache } from '../middlewares/noChache.middleware';

export default (app: Express): void => {
  app.use(i18nMiddleware);
  app.use(fingerprint);
  app.use(cookieParser());
  app.use(bodyParser);
  app.use(urlEncoded);
  // app.use(cors);
  app.use(cors({ origin: '*', credentials: true }));
  app.use(ddos.express);
  app.use(helmet());
  app.use(nocache());
  app.use(apiRateLimit);
};
