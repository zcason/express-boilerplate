import { randomUUID } from 'node:crypto';
import rtTracer from 'cls-rtracer';


export function addRequestId() {
    return rtTracer.expressMiddleware({
        echoHeader: true,
        requestIdFactory: () => randomUUID()
    });
};
