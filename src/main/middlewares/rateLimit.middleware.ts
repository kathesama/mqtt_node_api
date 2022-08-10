import rateLimit from 'express-rate-limit';
import { environmentConfig } from '../config';
import { t } from '../utils/i18next.config';

// import { HttpResponse } from '../../interfaces/http.interface';
const message: any = {
  statusCode: 429, // optional, of course
  body: {
    error: t('msg_rate_limit'),
  },
};

const options = {
  windowMs: environmentConfig().serverConfig.HOST_TIME_WINDOWD, // 1 hrs in milliseconds
  max: environmentConfig().serverConfig.HOST_MAX_PETITIONS,
  headers: true, // it will add X-RateLimit-Limit , X-RateLimit-Remaining and Retry-After Headers in the request
  message,
};

// export const apiRateLimit = fnRate;

const apiRateLimit = rateLimit({
  windowMs: environmentConfig().serverConfig.HOST_TIME_WINDOWD, // 1 hrs in milliseconds
  max: environmentConfig().serverConfig.HOST_MAX_PETITIONS,
  headers: true, // it will add X-RateLimit-Limit , X-RateLimit-Remaining and Retry-After Headers in the request
  message,
});

export { apiRateLimit };
