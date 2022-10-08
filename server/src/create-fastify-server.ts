import type {FastifyInstance} from 'fastify';
import fastify from 'fastify';
import type * as http from 'http';
import type pino from 'pino';

import {applicationLogger} from "./logger/application-logger";
import {extendCorrelationId} from "./logger/correlation-id";
import prismaConnectorPlugin from "./plugins/prisma/prisma-connector";

export const createFastifyServer = async (): Promise<FastifyInstance> => {
    const server = fastify<http.Server, http.IncomingMessage, http.ServerResponse, pino.Logger>({
        logger: applicationLogger,
        disableRequestLogging: true,
        genReqId: (req) => extendCorrelationId(req.headers['x-correlation-id'] as Partial<string>),
    });

    server.register(prismaConnectorPlugin)

    return server;
};
