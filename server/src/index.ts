import { getNumber, ProcessEnv } from './config';
import { createFastifyServer } from './create-fastify-server';

const start = async (): Promise<void> => {
    const server = await createFastifyServer();

    process.once('SIGINT', async () => {
        await server.close();
        process.exit(0);
    });

    try {
        await server.listen(
            getNumber(ProcessEnv.port),
            '0.0.0.0',
        );
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

void start();
