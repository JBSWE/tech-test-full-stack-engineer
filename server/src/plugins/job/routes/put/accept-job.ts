import fp from 'fastify-plugin';
import type {HttpError} from 'http-errors';
import * as httpErrors from 'http-errors';
import {FastifyInstance} from "fastify";
import {jobs} from "@prisma/client";
import {jobStatus} from '../../job-status.enum'


const acceptJobPath = '/accept/:jobId';

export default fp(async server => {
    server.put<{ Params: { jobId: number }, Reply: { data: jobs } | HttpError }>(
        acceptJobPath, async (req, reply) => {
            const jobId = +req.params.jobId
            const acceptedJob = await acceptJob(server, jobId)

            if (!acceptedJob) {
                return reply.send(
                    new httpErrors.NotFound(`Failed to update status for ${jobId} to accepted`)
                );
            }

            await reply.send({
                data: acceptedJob,
            });
        });
});

const acceptJob = async (server: FastifyInstance, jobId: number): Promise<jobs | undefined> => {
    try {
        return await server.prisma.jobs.update({
            where: {
                id: jobId
            },
            data: {
                status: jobStatus.ACCEPTED,
            },
        })
    } catch (e) {
        const error = e as Error
        server.log.warn(`Error connecting to the database: ${error.message}`)
    }
}
