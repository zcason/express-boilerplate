import { createLogger, format, transports } from 'winston';
import rTracer from 'cls-rtracer';
import { NODE_ENV } from './config';

const requestId = format(info => {
    const rId = rTracer.id();
    if (rId) info.requestId = rId;

    return info;
});

const localDevelopment = () => {
    const colorizer = format.colorize();

    return format.combine(
        format.timestamp(),
        requestId(),
        format.colorize({
            colors: {
                timestamp: 'dim',
                prefix: 'magenta',
                field: 'cyan',
                debug: 'grey'
            }
        }),
        format.printf((info) => {
            const { component, level, message, service, timestamp, ...fields} = info;
            const prefix = component || service;
            const timestampColor = colorizer.colorize('timestamp', timestamp);
            const prefixColor = colorizer.colorize('prefix', prefix);

            const extraFields = Object.entries(fields)
            .map(
                ([key, value]) => `${colorizer.colorize('field', `${key}`)}=${value}`
            )
            .join(' ');

            return `${timestampColor} ${prefixColor} ${level} ${message} ${extraFields}`;
        })
    );
};

const deployment = () => {
    return format.combine(
        format.timestamp(),
        requestId(),
        format.json()
    );
};

const logger = createLogger({
    level: 'info',
    format: format.combine(
        NODE_ENV === 'production'
        ? deployment()
        : localDevelopment()
    ),
    transports: [new transports.Console()]
})
.child({ service: 'backstage-metrics-service' });

export default logger;