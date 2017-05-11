import css from './object-to-css';

export default {
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
            border: '1px solid #4F8A10',
            color: '#4F8A10',
            background: '#DFF2BF'
        }),
        debug: css({
            lineHeight: 2,
            padding: '2px 5px',
            border: '1px solid #222',
            color: '#222',
            background: '#FFF'
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
