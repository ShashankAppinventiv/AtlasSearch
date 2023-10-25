import { ExceptionMessage, HttpStatusCode, HttpStatusMessage } from '../../interfaces/enum';
import { HttpResponse } from '../../interfaces/global.interface';
import { AcceptAny } from '../../interfaces/types';
import { Response } from 'express';

export class ResponseUtils {
    /**
     * @description Construct Success Response Object
     * @param {Record<string, AcceptAny>} data Actual Data to be Provided in Response
     * @param {number} status Status Code for Response
     * @param {string} statusMsg Status Msg for Response
     * @returns {HttpResponse} Response Object
     */
    successResponse(
        res: Response,
        data: AcceptAny,
        message: string = data?.message || HttpStatusMessage.OK,
        status: string = HttpStatusMessage.OK,
        count?: number,
        page?: number,
        totalPages?: number
    ): HttpResponse {
        const response: HttpResponse = {
            code: this.getStatusCode(<keyof typeof HttpStatusCode>status),
            status: status,
            message: message,//this.localizedMessage(res, error?.message || message),
            timestamp: new Date().getTime(),
            count: count,
            page: page,
            totalPages: totalPages,
            data: data,
            error: null,
        };
        return response;
    }

    /**
     * @description Construct Error Response Object
     * @param {HttpException} error Error Object
     * @param {number} status Status Code for Response
     * @param {string} statusMsg Status Msg for Response
     * @returns {HttpResponse} Error Response Object
     */
    errorResponse(
        res: Response,
        error: AcceptAny,
        message: ExceptionMessage = ExceptionMessage.SOMETHING_WENT_WRONG,
        status: HttpStatusMessage = HttpStatusMessage.BAD_REQUEST
    ): HttpResponse {
        let ErrorResponse: HttpResponse = {
            code: error?.code || this.getStatusCode(<keyof typeof HttpStatusCode>status),
            status: error?.status || status,
            message: message,//this.localizedMessage(res, error?.message || message),
            timestamp: new Date().getTime(),
            data: null,
            error: error //this.localizedErrorResponse(res, error?.data) || error,
        };
        return ErrorResponse;
    }
    getStatusCode(code: keyof typeof HttpStatusCode): number {
        return HttpStatusCode[code] || HttpStatusCode.BAD_REQUEST;
    }
}
