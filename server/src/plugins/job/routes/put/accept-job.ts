import fp from 'fastify-plugin';
import type {HttpError} from 'http-errors';
import * as httpErrors from 'http-errors';
import {acceptJob} from "../../../../dao/job.dao";
import {Job, JobId} from "../../models/job.model";


const acceptJobPath = '/accept/:jobId';

export default fp(async server => {
    server.put<{ Params: JobId, Reply: Job | HttpError }>(
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
