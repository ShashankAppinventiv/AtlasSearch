import { ResponseUtils } from './response.utils';
class Utils {
    public response: ResponseUtils;
    constructor() {
        this.response = new ResponseUtils();
    }
}

export const utils = new Utils();
