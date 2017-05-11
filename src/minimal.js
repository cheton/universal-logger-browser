/* eslint no-console: 0 */
const defaultFormatter = (context, messages) => {
    const { level, namespace } = { ...context };
    const formatters = [];

    if (level && level.name) {
        formatters.push(level.name.toUpperCase());
    }

    if (namespace) {
        formatters.push(namespace);
    }

    messages = [
        formatters.join(' '),
        ...messages
    ];

    return messages;
};

const nativeConsoleMethods = {
    trace: (typeof console !== 'undefined') && console.trace,
    debug: (typeof console !== 'undefined') && console.debug,
    info: (typeof console !== 'undefined') && console.info,
    warn: (typeof console !== 'undefined') && console.warn,
    error: (typeof console !== 'undefined') && console.error
};

const noop = () => {};

const minimal = (options) => {
    let {
        useNativeConsoleMethods = true,
        showSource = true,
        formatter = defaultFormatter
    } = { ...options };

    if (typeof formatter !== 'function') {
        formatter = (context, messages) => messages;
    }

    return (context, messages, next = noop) => {
        if (typeof next !== 'function') {
            next = noop;
        }
        if (typeof console === 'undefined') {
            next();
            return;
        }
        messages = formatter(context, messages);

        if (showSource && context.stackframes.length > 0) {
            const stackframeIndex = Math.min(4, context.stackframes.length - 1);
            const source = context.stackframes[stackframeIndex].source || '';
            messages = messages.concat(source);
        }

        const log = useNativeConsoleMethods
            ? nativeConsoleMethods[context.level.name] || console.log || noop
            : console.log || noop;
        Function.prototype.apply.call(log, console, messages);

        next();
    };
};

export default minimal;
