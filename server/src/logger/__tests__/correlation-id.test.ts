import { extendCorrelationId } from '../correlation-id';

describe('correlation-id.ts', () => {
    it('should append generated correlation id', () => {
        const upstreamCorrelationIdTest = 'test';

        const result = extendCorrelationId(upstreamCorrelationIdTest);

        expect(result).toMatch(new RegExp('^test,jobs-{?[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$'));
    });

    it('should generate correlation id and handle undefined upstream correlation id', () => {
        const upstreamCorrelationIdTest = undefined;

        const result = extendCorrelationId(upstreamCorrelationIdTest);

        expect(result).toMatch(new RegExp('^jobs-{?[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$'));
    });
});
