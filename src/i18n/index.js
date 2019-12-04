

import locales from './locales/index'

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', 
  messages: locales,
  fallbackLocale: 'en',
})

