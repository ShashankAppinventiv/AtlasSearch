import { Request } from 'express';
import { AcceptAny } from './types';

interface Response {
    status: string;
    code: number;
    timestamp: number;
}

export interface HttpResponse extends Response {
    data: Record<string, AcceptAny> | null;
    error: Record<string, AcceptAny> | null;
    message?: string | null;
    count?: number | 0;
    page?: number | 0;
    totalPages?: number | 0;
}
