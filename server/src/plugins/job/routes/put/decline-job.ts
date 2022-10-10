import fp from 'fastify-plugin';
import type {HttpError} from 'http-errors';
import * as httpErrors from 'http-errors';
import {declineJob} from "../../../../dao/job.dao";
import {Job, JobId} from "../../models/job.model";


const declineJobPath = '/decline/:jobId';

export default fp(async server => {
    server.put<{ Params: JobId, Reply: Job | HttpError }>(
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
