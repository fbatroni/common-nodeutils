# common-nodeutils [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Commonly used node functionality

## Installation

```sh
$ npm install --save common-nodeutils
```

## Usage


- LOGGER 

```js
var commonNodeutils = require('common-nodeutils');
var filename = 'logs/tests.log';
logger = commonNodeutils.logger('test', filename);
logger.info('testing 123');
logger.warn('testing 123');
logger.error('testing 123');
logger.fatal('testing 123');
logger.setLevel('DEBUG');
logger.debug('testing 123');

```

```
[2016-03-15 19:11:59.726] INFO test testing 123
[2016-03-15 19:11:59.729] WARN test testing 123
[2016-03-15 19:11:59.729] ERROR test testing 123
[2016-03-15 19:11:59.729] FATAL test testing 123
[2016-03-15 19:11:59.729] DEBUG test testing 123

```

## License

MIT © [Fritz G. Batroni](https://fritzbatroni.wordpress.com/)


[npm-image]: https://badge.fury.io/js/common-nodeutils.svg
[npm-url]: https://npmjs.org/package/common-nodeutils
[travis-image]: https://travis-ci.org/fbatroni/common-nodeutils.svg?branch=master
[travis-url]: https://travis-ci.org/fbatroni/common-nodeutils
[daviddm-image]: https://david-dm.org/fbatroni/common-nodeutils.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/fbatroni/common-nodeutils
[coveralls-image]: https://coveralls.io/repos/fbatroni/common-nodeutils/badge.svg
[coveralls-url]: https://coveralls.io/r/fbatroni/common-nodeutils
