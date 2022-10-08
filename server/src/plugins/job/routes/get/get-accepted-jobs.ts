import fp from 'fastify-plugin';
import type {HttpError} from 'http-errors';
import * as httpErrors from 'http-errors';
import {FastifyInstance} from "fastify";
import {jobs} from "@prisma/client";
import {jobStatus} from '../../job-status.enum'


const getAcceptedJobsPath = '/accepted-jobs';

export default fp(async server => {
    server.get<{ Params: any, Reply: any | HttpError }>(
        getAcceptedJobsPath, async (req, reply) => {
            const acceptedJobs = await getAcceptedJobs(server)

            if (acceptedJobs.length === 0) {
                return reply.send(
                    new httpErrors.NotFound(`Could not find any jobs`)
                );
            }

            await reply.send({
                data: acceptedJobs,
            });
        });
});

const getAcceptedJobs = async (server: FastifyInstance): Promise<jobs[]> => {
    return await server.prisma.jobs.findMany({
        where:
            {
                status: jobStatus.ACCEPTED
            }
    })
}
