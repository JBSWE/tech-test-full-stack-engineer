import fp from 'fastify-plugin';
import type {HttpError} from 'http-errors';
import * as httpErrors from 'http-errors';
import {FastifyInstance} from "fastify";
import {jobs} from "@prisma/client";
import {jobStatus} from '../../job-status.enum'


const declineJobPath = '/decline/:jobId';

export default fp(async server => {
    server.put<{ Params: { jobId: number }, Reply: any | HttpError }>(
        declineJobPath, async (req, reply) => {
            const jobId = +req.params.jobId
            const declinedJob = await declineJob(server, jobId)

            if (!declinedJob) {
                return reply.send(
                    new httpErrors.NotFound(`Failed to update status for ${jobId} to declined`)
                );
            }

            await reply.send({
                data: declinedJob,
            });
        });
});

const declineJob = async (server: FastifyInstance, jobId: number): Promise<jobs> => {
    return await server.prisma.jobs.update({
        where: {
            id: jobId
        },
        data: {
            status: jobStatus.DECLINED,
        },
    })
}