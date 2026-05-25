[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# nanologger

Cute browser logger.

## Usage
```js
import Nanologger from '@pirxpilot/nanologger'
const log = new Nanologger('my-cool-logger')

log.debug('it works!')
log.info('hey')
log.warn('oh')
log.error('oh no!')
log.fatal('send help')
```

## API
### `log = logger([name][, opts])`
Create a new `nanologger` instance. Name defaults to `'unknown'`. Opts should be an object with the following properties:

- colors: Key/value object used to set the colors of the logger. If any of the expected colors is not set, it will use [the defaults][12], any extra color will be ignored.

### `level = log.logLevel`
Read the current logLevel. The log level can be set through
`localStorage.setItem('logLevel', '<level>')`. It's read once at boot time.

### `log.debug(message)`
Emit a message at loglevel 🐛

### `log.info(message)`
Emit a message at loglevel ✨

### `log.warn(message)`
Emit a message at loglevel ⚠️

### `log.error(message)`
Emit a message at loglevel 🚨

### `log.fatal(message)`
Emit a message at loglevel 💀

## See Also
- [lrlna/pino-colada](https://github.com/lrlna/pino-colada)
- [pinojs/pino](https://github.com/pinojs/pino)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/@pirxpilot/nanologger
[npm-url]: https://npmjs.org/package/@pirxpilot/nanologger

[build-url]: https://github.com/pirxpilot/nanologger/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/nanologger/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/@pirxpilot/nanologger
[deps-url]: https://libraries.io/npm/@pirxpilot%2Fnanologger
