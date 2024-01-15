import { Router, Request, Response } from 'express';
import { qbController } from '../../controllers/controller';
class QueryRoutes {
    private mainRouter: Router;
    constructor() {
        this.mainRouter = Router();
    }
    loadRouter = () => {
        this.mainRouter.get('/autocomplete', qbController.autocomplete);
        this.mainRouter.get('/synonyms',qbController.synonyms)
        this.mainRouter.get('/geoWithInCircle', qbController.geoWithInCircle);
        this.mainRouter.get('/geoWithInBox', qbController.geoWithInBox);
        this.mainRouter.get('/geoWithInPolygon', qbController.geoWithInPolygon);
        this.mainRouter.get('/geoWithInMultiPolygon', qbController.geoWithInMultiPoly);
        this.mainRouter.get('/phrase-search',qbController.phrase);
        this.mainRouter.get('/diacritic-insensitive',qbController.diacriticInsensitive);
        this.mainRouter.get('/regex-search',qbController.regex);
        this.mainRouter.get('/wildcard-search',qbController.wildcard);
        return this.mainRouter;
    };
}
export const queryRoutes = new QueryRoutes();
