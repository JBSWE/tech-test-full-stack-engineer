import {jobs} from "@prisma/client";

export type Jobs =  { data: jobs[] }
export type Job =  { data: jobs }
export type JobId = { jobId: string }
