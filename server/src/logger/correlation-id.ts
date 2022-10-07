import { v4 as uuid } from 'uuid';

const jobsIdPrefix = 'jobs';

export function extendCorrelationId(upstreamCorrelationId?: string): string {
    const correlationId = `${jobsIdPrefix}-${uuid()}`;
    return [upstreamCorrelationId, correlationId].filter(Boolean).join(',');
}
