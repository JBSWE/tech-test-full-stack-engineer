import type {FastifyInstance} from 'fastify';
import fastify from 'fastify';
import type * as http from 'http';
import type pino from 'pino';
import getNewJobs from "./plugins/job/routes/get/get-new-jobs";
import getAcceptedJobs from "./plugins/job/routes/get/get-accepted-jobs";

import {applicationLogger} from "./logger/application-logger";
import {extendCorrelationId} from "./logger/correlation-id";
import prismaConnectorPlugin from "./plugins/prisma/prisma-connector";
import acceptJob from "./plugins/job/routes/put/accept-job";
import declineJob from "./plugins/job/routes/put/decline-job";

export const createFastifyServer = async (): Promise<FastifyInstance> => {
    const server = fastify<http.Server, http.IncomingMessage, http.ServerResponse, pino.Logger>({
        logger: applicationLogger,
        disableRequestLogging: true,
        genReqId: (req) => extendCorrelationId(req.headers['x-correlation-id'] as Partial<string>),
    });

    server.register(prismaConnectorPlugin)

    server.register(getNewJobs)
    server.register(getAcceptedJobs)
    server.register(acceptJob)
    server.register(declineJob)

    return server;
};
