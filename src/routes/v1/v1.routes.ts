import { Router } from 'express';
import { queryRoutes } from './query.routers';
class V1Routes {
    private route: Router;

    constructor() {
        this.route = Router();
    }
    /**
     * @description Load All V1 User activity Routes
     */
    loadAllRoutes() {
        this.route.use('/atlas-search', queryRoutes.loadRouter());
        return this.route;
    }
}

export const routesV1 = new V1Routes();
