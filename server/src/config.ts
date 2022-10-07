import * as dotEnvFlow from 'dotenv-flow';

import { isNotNullOrUndefinedUtil } from './utils/is-not-null-or-undefined.util';

dotEnvFlow.config({
    purge_dotenv: true,
    path: './config',
    silent: true,
});

export enum ProcessEnv {
    logLevel = 'LOG_LEVEL',
    port = 'PORT',
}

function parseNumber(value: string): number {
    const parsedValue = Number(value);
    if (isNaN(parsedValue)) {
        throw new Error(`Invalid environment variable type. Expected number, got value: '${value}'`);
    }
    return parsedValue;
}

function parseBoolean(value: string): boolean {
    const lowerCaseValue = value.toLocaleLowerCase();
    if (lowerCaseValue !== 'true' && lowerCaseValue !== 'false') {
        throw new Error(`Invalid environment variable type. Expected boolean, got value: '${value}'`);
    }
    return lowerCaseValue === 'true';
}

function get(variableName: ProcessEnv): string {
    const value = process.env[variableName];
    if (!isNotNullOrUndefinedUtil(value)) {
        throw new Error(`Environment variable '${variableName}' is not defined`);
    }
    return value;
}

export function getString(variableName: ProcessEnv): string {
    return get(variableName);
}

export function getNumber(variableName: ProcessEnv): number {
    const value = get(variableName);
    return parseNumber(value);
}

export function getBoolean(variableName: ProcessEnv): boolean {
    const value = get(variableName);
    return parseBoolean(value);
}

export function has(variableName: ProcessEnv): boolean {
    const value = process.env[variableName];
    return !!isNotNullOrUndefinedUtil(value);
}
