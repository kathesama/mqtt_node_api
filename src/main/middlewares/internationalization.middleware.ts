import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';

// ========= LOCALIZATION
i18next
  .use(middleware.LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: 'en',
    preload: ['es', 'en'],
    backend: {
      loadPath: './locales/{{lng}}/translation.json',
    },
  });

export const language = middleware.handle(i18next);
