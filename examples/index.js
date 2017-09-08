import emoji from 'node-emoji';
import logger, { TRACE, INFO } from 'universal-logger';
import { minimal, styleable } from '../src';

const namespace = emoji.get('rainbow');
const log = logger(namespace)
    .use(minimal({
        showSource: true,
        useNativeConsoleMethods: true
    }))
    .use(styleable({
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
