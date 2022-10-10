import {FastifyInstance} from "fastify";
import {jobs} from "@prisma/client";
import {jobStatus} from "../plugins/job/models/job-status.enum";

export const getAcceptedJobs = async (server: FastifyInstance): Promise<jobs[]> => {
    try {
        return await server.prisma.jobs.findMany({
            where:
                {
                    status: jobStatus.ACCEPTED
                },
            include: {
                suburbs: true,
                categories: true,
            }
        })
    } catch (e) {
        const error = e as Error
        server.log.warn(`Error connecting to the database: ${error.message}`)
        return []
    }
}

export const getNewJobs = async (server: FastifyInstance): Promise<jobs[]> => {
    try {
        return await server.prisma.jobs.findMany({
            where:
                {
                    status: jobStatus.NEW
                },
            include: {
                suburbs: true,
                categories: true,
            }
        })
    } catch (e) {
        const error = e as Error
        server.log.warn(`Error connecting to the database: ${error.message}`)
        return []
    }
}

export const acceptJob = async (server: FastifyInstance, jobId: number): Promise<jobs | undefined> => {
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

export const declineJob = async (server: FastifyInstance, jobId: number): Promise<jobs| undefined> => {
    try {
        return await server.prisma.jobs.update({
            where: {
                id: jobId
            },
            data: {
                status: jobStatus.DECLINED,
            },
        })
    } catch (e) {
        const error = e as Error
        server.log.warn(`Error connecting to the database: ${error.message}`)
    }
}


