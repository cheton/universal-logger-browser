/* eslint no-console: 0 */
import css from './object-to-css';

const noop = () => {};

const defaultStyle = {
    timestamp: css({
        lineHeight: 2,
        padding: '2px 0',
        color: '#3B5998',
        background: '#EDEFF4'
    }),
    namespace: css({
        lineHeight: 2,
        color: '#036F96'
    }),
    level: {
        trace: css({
            lineHeight: 2,
            padding: '2px 5px',
            border: '1px solid #222',
            color: '#222',
            background: '#FFF'
        }),
        debug: css({
            lineHeight: 2,
            padding: '2px 5px',
            border: '1px solid #4F8A10',
            color: '#4F8A10',
            background: '#DFF2BF'
        }),
        info: css({
            lineHeight: 2,
            padding: '2px 5px',
            border: '1px solid #00529B',
            color: '#00529B',
            background: '#BDE5F8'
        }),
        warn: css({
            lineHeight: 2,
            padding: '2px 5px',
            border: '1px solid #9F6000',
            color: '#9F6000',
            background: '#EFEFB3'
        }),
        error: css({
            lineHeight: 2,
            padding: '2px 5px',
            border: '1px solid #D8000C',
            color: '#D8000C',
            background: '#FFBABA'
        })
    }
};

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
        ...defaultStyle,
        ...options.style,
        level: {
            ...defaultStyle.level,
            ...options.style.level
        }
    };

    return (context, messages, next) => {
        if (typeof next !== 'function') {
            next = noop;
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
                const str = level.name.charAt(0).toUpperCase();
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
                formatters.push(`%c${name}%c`);
                styles.push(style.name);
                styles.push('');
            } else {
                formatters.push(name);
            }
        }

        messages = [
            formatters.join(' '),
            ...styles,
            ...messages
        ];

        if (showSource && stackframes.length > 0) {
            const stackframeIndex = Math.min(2, stackframes.length - 1);
            const source = stackframes[stackframeIndex].source || '';
            messages = messages.concat(source);
        }

        Function.prototype.apply.call(console.log, console, messages);
        next();
    };
};

export default styleable;
