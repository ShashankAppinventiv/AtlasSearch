import { HttpStatusCode, HttpStatusMessage, ExceptionMessage } from '../../interfaces/enum';
import { AcceptAny, AcceptNullOrObject } from '../../interfaces/types';

export class ExceptionHandler {
    protected code: number;
    protected status: string;
    protected message: string;
    protected data: AcceptAny;

    getError() {
        return {
            code:
                this.getStatusCode(<keyof typeof HttpStatusCode>this.status) ||
                HttpStatusCode.BAD_REQUEST,
            status: this.status || HttpStatusMessage.BAD_REQUEST,
            message: this.message || HttpStatusMessage.BAD_REQUEST,
            data: this.data,
        };
    }

    getStatusCode(code: keyof typeof HttpStatusCode): number {
        return HttpStatusCode[code];
    }
}

export class CustomException extends ExceptionHandler {
    constructor(message: ExceptionMessage, status?: HttpStatusMessage) {
        super();
        this.data = {
            message: message,
            type: message,
        };
        this.status = status || HttpStatusMessage.BAD_REQUEST;
        this.message = message;
    }
}