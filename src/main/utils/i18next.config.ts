import { dirname, join } from 'path';
import { readdirSync, lstatSync } from 'fs';
import { fileURLToPath } from 'url';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';

const localesFolder = join(__dirname, './locales')

i18next
  .use(Backend) // you can also use any other i18next backend, like i18next-http-backend or i18next-locize-backend
  .use(middleware.LanguageDetector) // you can also use any other i18next backend, like i18next-http-backend or i18next-locize-backend
  .init({
    // debug: true,
    initImmediate: false, // setting initImediate to false, will load the resources synchronously
    fallbackLng: 'en',
    preload: readdirSync(localesFolder).filter((fileName) => {
      const joinedPath = join(localesFolder, fileName)
      return lstatSync(joinedPath).isDirectory()
    }),
    backend: {
      loadPath: join(localesFolder, '{{lng}}/{{ns}}.json')
    }
  });

// export default middleware.handle(i18next);
export const { t } = i18next;
export default i18next;
export const i18nMiddleware = middleware.handle(i18next);
