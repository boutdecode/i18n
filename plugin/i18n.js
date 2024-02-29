const fs = require('node:fs')
const path = require('node:path')
const parseLocale = require('accept-language-parser')
const i18next = require('i18next')

let isInit = false
const getTranslations = (translationFolder) => {
  const translations = {}
  try {
    fs.readdirSync(translationFolder).forEach(file => {
      const result = file.match(/\w+\.([a-zA-Z-]{2,5})\..*/)
      if (result) {
        if (!translations[result[1]]) {
          translations[result[1]] = { translation: {} }
        }

        translations[result[1]].translation = { ...require(`${translationFolder}/${file}`) }
      }
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('i18n plugin throw error : ', error)
  }

  return translations
}

module.exports = ({ folder, locale = 'en' }) => (context, next) => {
  const { req } = context
  const translationFolder = path.resolve(process.cwd(), folder || 'translations')

  if (!isInit) {
    i18next.init({
      fallbackLng: locale,
      resources: getTranslations(translationFolder)
    })

    isInit = true
  }

  req.attributes.locale = parseLocale.pick(i18next.languages, req.headers['accept-language']) || locale

  const match = req.url.match(/\/([a-z]{2}(?:-[a-z]{2})?)\/.*/)
  if (match) {
    req.attributes.locale = match[1]
  }

  if (req.query.lang) {
    req.attributes.locale = req.query.lang
  }

  context.set('i18n', {
    t: (key, options) => i18next.t(key, options),
    locale: req.attributes.locale
  })

  next()
}
