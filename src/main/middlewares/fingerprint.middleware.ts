import Fingerprint from 'express-fingerprint';
import { environmentConfig } from '../config';

const fingerPrint: any = Fingerprint;

const fingerprintMiddleware = (req: any, res: any, next: any) => {
  const headers = req.headers;
  const params: any = {
    parameters: [
      // Defaults
      fingerPrint.acceptHeaders,
      // Fingerprint.geoip,

      // personalized params
      (next: any) => {
        next(null, {
          useragent: req.headers['user-agent'],
        });
      },
      (next: any) => {
        next(null, {
          acceptLanguage: req.headers['accept-language'],
        });
      },
      (next: any) => {
        next(null, {
          id: req.ip,
        });
      },
      (next: any) => {
        next(null, {
          fingerKey: environmentConfig().serverConfig.SERVER_FINGERKEY,
        });
      },
    ],
  };
  return Fingerprint(params)(req, res, next);
};

export const fingerprint = fingerprintMiddleware;
