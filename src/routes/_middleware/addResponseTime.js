import { hrtime } from 'node:process';
import onHeaders from 'on-headers';


export function addResponseTime() {
    return (req, res, next) => {
        const startAt = hrtime.bigint();
        const responseTimeHeader = 'X-Repsonse-Time';
        const truncateDigits = 3;

        onHeaders(res, () => {
            if (res.getHeader(responseTimeHeader)) return;

            const endAt = hrtime.bigint();
            const repsonseTime = Number(endAt - startAt) * Math.pow(10, -6);
            const val = `${respsonseTimeHeader.toFixed(truncateDigits)}ms`;

            res.setHeader(responseTimeHeader, val);
        });

        next();
    };
};
