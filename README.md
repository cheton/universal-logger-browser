# universal-logger-browser [![build status](https://travis-ci.org/cheton/universal-logger-browser.svg?branch=master)](https://travis-ci.org/cheton/universal-logger-browser) [![Coverage Status](https://coveralls.io/repos/github/cheton/universal-logger-browser/badge.svg?branch=master)](https://coveralls.io/github/cheton/universal-logger-browser?branch=master)

[![NPM](https://nodei.co/npm/universal-logger-browser.png?downloads=true&stars=true)](https://www.npmjs.com/package/universal-logger-browser)

**Browser plugins for [universal logger](https://github.com/cheton/universal-logger/)**
 
## Installation

```bash
npm install --save universal-logger-browser
```

## Usage
```js
import emoji from 'node-emoji';
import logger, { TRACE, INFO } from 'universal-logger';
import { styleable } from 'universal-logger-browser';

const log = logger();

log.chainedHandlers = [
    styleable({
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
log.on('log', styleable({
    showTimestamp: false
}));

log.setLevel(TRACE);

log.log(INFO, 'The logger has initialized');
log.trace(emoji.get('mostly_sunny'));
log.debug(emoji.get('sun_small_cloud'));
log.info(emoji.get('barely_sunny'));
log.warn(emoji.get('rain_cloud'));
log.error(emoji.get('lightning_cloud'));
```

## License

MIT
