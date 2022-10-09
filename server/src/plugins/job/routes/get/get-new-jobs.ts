import fp from 'fastify-plugin';
import type {HttpError} from 'http-errors';
import * as httpErrors from 'http-errors';
import {FastifyInstance} from "fastify";
import {jobs} from '@prisma/client';
import {jobStatus} from '../../job-status.enum'

const getNewJobsPath = '/new-jobs';

export default fp(async server => {
    server.get<{ Params: any, Reply: any | HttpError }>(
        getNewJobsPath, async (req, reply) => {
            const newJobs = await getNewJobs(server)

            if (newJobs.length === 0) {
                return reply.send(
                    new httpErrors.NotFound(`Could not find any jobs`)
                );
            }

            await reply.send({
                data: newJobs,
            });
        });
});

const getNewJobs = async (server: FastifyInstance): Promise<jobs[]> => {
    try {
        return await server.prisma.jobs.findMany({
            where:
                {
                    status: jobStatus.NEW
                }
        })
    } catch (e) {
        const error = e as Error
        server.log.warn(`Error connecting to the database: ${error.message}`)
        return []
    }
}
