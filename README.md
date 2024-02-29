# I18N tools by Bout de code

![https://boutdecode.fr](https://boutdecode.fr/img/logo.png)

[Bout de code](https://boutdecode.fr) - Développement de site internet et blog avec de vrais morceaux de codes, simples, élégants, utiles (parfois) et surtout sans fioriture.

## Installation

```shell
$ npm install @boutdecode/i18n
```

## Yion plugin

For yion : 

Before create translation files like :

`whatever.<lang>.json|js`

Example :

```
/translations
  messages.en.json
  messages.fr.json
```

Finally

```javascript
const { createApp, createServer } = require('@boutdecode/yion')
const i18nPlugin = require('@boutdecode/i18n')

const app = createApp()
const server = createServer(app)

app.use(i18nPlugin({
  locale: 'en', // Default locale
  folder: 'translations' // Folder where translation files are located
}))

app.get('/', ({ i18n }) => {
  i18n.locale // Current locale, null if not detected
  i18n.t('hello') // translate hello
})

server.listen(8080)
```

## Tests

```shell
$ npm run test
```
