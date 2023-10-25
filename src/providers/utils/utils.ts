import { ResponseUtils } from './response.utils';
import { isArray } from 'util';
import { CustomException } from './exception.utils';
import { ExceptionMessage, HttpStatusMessage } from '../../interfaces/enum';
import * as crypto from 'crypto';
import { writeFile } from 'fs/promises';
class Utils {
    public response: ResponseUtils;
    constructor() {
        this.response = new ResponseUtils();
    }
}

export const utils = new Utils();
