import fp from 'fastify-plugin';
import type {HttpError} from 'http-errors';
import * as httpErrors from 'http-errors';
import {getNewJobs} from "../../../../dao/job.dao";
import {Jobs} from "../../models/job.model";

const getNewJobsPath = '/new-jobs';

export default fp(async server => {
    server.get<{ Reply: Jobs | HttpError }>(
        getNewJobsPath, async (req, reply) => {
            const newJobs = await getNewJobs(server)

            if (newJobs.length === 0) {
                return reply.send(
                    new httpErrors.NotFound(`Could not find any new jobs`)
                );
            }

            await reply.send({
                data: newJobs,
            });
        });
});
