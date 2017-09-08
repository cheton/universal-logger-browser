/* eslint no-console: 0 */
import css from './object-to-css';
import styleableStyle from './styleable-style';

const noop = () => {};

const styleable = (options) => {
    const {
        colorized = true,
        showSource = true,
        showTimestamp = false,
        formatTimestamp = (t) => new Date(t).toISOString()
    } = { ...options };

    options = options || {};
    options.style = options.style || {};
    options.style.level = options.style.level || {};
    const style = {
        ...styleableStyle,
        ...options.style,
        level: {
            ...styleableStyle.level,
            ...options.style.level
        }
    };

    return (context, messages, next) => {
        if (typeof next !== 'function') {
            next = noop;
        }
        if (typeof console === 'undefined') {
            next();
            return;
        }

        const { namespace, level, stackframes = [] } = { ...context };
        const timestamp = new Date().getTime();
        const formatters = [];
        const styles = [];

        if (showTimestamp) {
            const str = (typeof formatTimestamp === 'function')
                ? formatTimestamp(timestamp)
                : timestamp;

            if (colorized) {
                formatters.push(`%c ${str} %c`);
                styles.push(style.timestamp);
                styles.push('');
            } else {
                formatters.push(str);
            }
        }

        if (level && level.name) {
            if (colorized) {
                const str = level.name.toUpperCase();
                formatters.push(`%c${str}%c`);
                const styledLevel = style.level[level.name] || '';

                if (typeof styledLevel === 'object') {
                    styles.push(css(styledLevel));
                } else {
                    styles.push(String(styledLevel));
                }
                styles.push('');
            } else {
                formatters.push(level.name.toUpperCase());
            }
        }

        if (namespace) {
            if (colorized) {
                formatters.push(`%c${namespace}%c`);
                styles.push(style.name);
                styles.push('');
            } else {
                formatters.push(namespace);
            }
        }

        messages = [
            formatters.join(' '),
            ...styles,
            ...messages
        ];

        if (showSource && stackframes.length > 0) {
            const stackframeIndex = Math.min(4, stackframes.length - 1);
            const source = stackframes[stackframeIndex].source || '';
            messages = messages.concat(source);
        }

        const log = console.log || noop;
        Function.prototype.apply.call(log, console, messages);

        next();
    };
};

export default styleable;
