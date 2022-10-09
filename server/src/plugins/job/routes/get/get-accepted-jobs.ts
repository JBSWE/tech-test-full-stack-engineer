import fp from 'fastify-plugin';
import type {HttpError} from 'http-errors';
import * as httpErrors from 'http-errors';
import {jobs} from "@prisma/client";
import {getAcceptedJobs} from "../../../../dao/job.dao";


const getAcceptedJobsPath = '/accepted-jobs';

export default fp(async server => {
    server.get<{ Reply: { data: jobs[] } | HttpError }>(
        getAcceptedJobsPath, async (req, reply) => {
            const acceptedJobs = await getAcceptedJobs(server)

            if (acceptedJobs.length === 0) {
                return reply.send(
                    new httpErrors.NotFound(`Could not find any accepted jobs`)
                );
            }

            await reply.send({
                data: acceptedJobs,
            });
        });
});
