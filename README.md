# universal-logger-browser [![build status](https://travis-ci.org/cheton/universal-logger-browser.svg?branch=master)](https://travis-ci.org/cheton/universal-logger-browser) [![Coverage Status](https://coveralls.io/repos/github/cheton/universal-logger-browser/badge.svg?branch=master)](https://coveralls.io/github/cheton/universal-logger-browser?branch=master)

[![NPM](https://nodei.co/npm/universal-logger-browser.png?downloads=true&stars=true)](https://www.npmjs.com/package/universal-logger-browser)

**Browser plugins for [universal logger](https://github.com/cheton/universal-logger/)**

![image](https://cloud.githubusercontent.com/assets/447801/25890227/5aa8a12a-359f-11e7-94d6-7818a16acde9.png)
 
## Installation

```bash
npm install --save universal-logger universal-logger-browser
```

## Usage
```js
import emoji from 'node-emoji';
import logger, { TRACE, INFO } from 'universal-logger';
import { styleable } from 'universal-logger-browser';

const log = logger();

log.chainedHandlers = [
    styleable({
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
    })
];

// In addition to replacing the chainedHandlers array, you can register a listener for the 'log' event.
log.on('log', styleable());

log.setLevel(TRACE);
log.enableStackTrace();

log.log(INFO, 'The logger has initialized');
log.trace(emoji.get('mostly_sunny'));
log.debug(emoji.get('sun_small_cloud'));
log.info(emoji.get('barely_sunny'));
log.warn(emoji.get('rain_cloud'));
log.error(emoji.get('lightning_cloud'));
```

## API

### Styleable

Name | Type | Default | Description 
:--- | :--- | :------ | :----------
colorized | boolean | true | Show colorized output.
showSource | boolean | true | Show the source line number of the caller.<br>Note that you need to call `log.enableStackTrace()` to get stack frames.
showTimestamp | boolean | false | Show timestamp.
formatTimestamp | function(timestamp) | | Convert timestamp to string.
style | object | See [default-style.js](https://github.com/cheton/universal-logger-browser/blob/master/src/default-style.js) | Custom styles.

## License

MIT
