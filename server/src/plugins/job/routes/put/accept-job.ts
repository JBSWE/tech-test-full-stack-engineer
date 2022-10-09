import fp from 'fastify-plugin';
import type {HttpError} from 'http-errors';
import * as httpErrors from 'http-errors';
import {jobs} from "@prisma/client";
import {acceptJob} from "../../../../dao/job.dao";


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
