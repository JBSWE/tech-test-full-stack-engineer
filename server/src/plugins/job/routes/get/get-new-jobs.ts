import fp from 'fastify-plugin';
import type {HttpError} from 'http-errors';
import * as httpErrors from 'http-errors';
import {jobs} from '@prisma/client';
import {getNewJobs} from "../../../../dao/job.dao";

const getNewJobsPath = '/new-jobs';

export default fp(async server => {
    server.get<{ Reply: { data: jobs[] } | HttpError }>(
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
