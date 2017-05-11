# universal-logger-browser [![build status](https://travis-ci.org/cheton/universal-logger-browser.svg?branch=master)](https://travis-ci.org/cheton/universal-logger-browser) [![Coverage Status](https://coveralls.io/repos/github/cheton/universal-logger-browser/badge.svg?branch=master)](https://coveralls.io/github/cheton/universal-logger-browser?branch=master)

[![NPM](https://nodei.co/npm/universal-logger-browser.png?downloads=true&stars=true)](https://www.npmjs.com/package/universal-logger-browser)

**Browser plugins for [universal logger](https://github.com/cheton/universal-logger/)**

#### Minimal
![image](https://cloud.githubusercontent.com/assets/447801/25939366/34f461fa-3665-11e7-9d03-0042fda4c32e.png)

#### Styleable
![image](https://cloud.githubusercontent.com/assets/447801/25939476/96bd5568-3665-11e7-9b6f-b96fe0dc73d8.png)
 
## Installation

```bash
npm install --save universal-logger universal-logger-browser
```

## Usage

```js
import emoji from 'node-emoji';
import logger, { TRACE, INFO } from 'universal-logger';
import { minimal, styleable } from 'universal-logger-browser';

const log = logger()
    .use(minimal({
        showSource: true,
        useNativeConsoleMethods: true
    }))
    .use(styleable({
        showSource: true,
        showTimestamp: true,
        style: {
            level: {
                silly: { // Custom log level
                    backgroundColor: '#FFF',
                    border: '1px solid #222',
                    color: '#222',
                    lineHeight: 2,
                    padding: '2px 5px'
                }
            }
        }
    }))
    .on('log', (context, messages) => {
        // Custom log processing
    });

log.enableStackTrace();
log.setLevel(TRACE);

log.log(INFO, 'The logger has initialized');
log.trace(emoji.get('mostly_sunny'));
log.debug(emoji.get('sun_small_cloud'));
log.info(emoji.get('barely_sunny'));
log.warn(emoji.get('rain_cloud'));
log.error(emoji.get('lightning_cloud'));
```

## API

### Minimal

Name | Type | Default | Description 
:--- | :--- | :------ | :----------
formatter | function(context, messages) | | Custom log formatter.
showSource | boolean | true | Show the source line number of the caller.<br>Note that you need to call `log.enableStackTrace()` to capture stack frames.
useNativeConsoleMethods | boolean | true | Whether to use native console methods for trace, debug, info, warn, and error.

### Styleable

Name | Type | Default | Description 
:--- | :--- | :------ | :----------
colorized | boolean | true | Show colorized output.
showSource | boolean | true | Show the source line number of the caller.<br>Note that you need to call `log.enableStackTrace()` to capture stack frames.
showTimestamp | boolean | false | Show timestamp.
formatTimestamp | function(timestamp) | | Convert timestamp to string.
style | object | See [styleable-style.js](https://github.com/cheton/universal-logger-browser/blob/master/src/styleable-style.js) | Custom styles.

## License

MIT
