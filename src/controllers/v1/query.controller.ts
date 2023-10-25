import { Request, Response, json } from 'express';
import { recipeEntity, resturantEntity } from '../../entity';
import { HttpStatusMessage } from '../../interfaces/enum';
import { utils } from '../../providers/utils/utils';
import { movieEntity } from '../../entity/v1/movie.entity';
class QueryBuilder {
    autocomplete = async (req: Request, res: Response) => {
        try {
            let payload = {
                index: 'autocomplete_static_content_question_answer',
                query: `${req.query.name}`,
                path: 'label'
            };
            let Response = await recipeEntity.autocomplete(payload);
            let finalResponse = utils.response.successResponse(
                res,
                Response,
                HttpStatusMessage.ACCEPTED,
                HttpStatusMessage.ACCEPTED
            );
            res.status(finalResponse.code).send(finalResponse);
        } catch (error) {
            let finalError = utils.response.errorResponse(res, error);
            res.status(finalError.code).send(finalError);
        }
    };
    synonyms = async (req: Request, res: Response) => {
        try {
            let payload = {
                index: 'default',
                query: `${req.query.name}`,
                path: 'label',
                synonymsDefinitionName: 'LabelSynonyms'
            };
            let Response = await recipeEntity.synonyms(payload);
            let finalResponse = utils.response.successResponse(
                res,
                Response,
                HttpStatusMessage.ACCEPTED,
                HttpStatusMessage.ACCEPTED
            );
            res.status(finalResponse.code).send(finalResponse);
        } catch (error) {
            let finalError = utils.response.errorResponse(res, error);
            res.status(finalError.code).send(finalError);
        }
    };
    geoWithInCircle = async (req: Request, res: Response) => {
        try {
            let payload = {
                index: 'resturantFind',
                path: 'location',
                coordinate: [28.60702, 77.37259],
                radius: 1600
            };
            let Response = await resturantEntity.geoWithInCircle(payload);
            let finalResponse = utils.response.successResponse(
                res,
                Response,
                HttpStatusMessage.ACCEPTED,
                HttpStatusMessage.ACCEPTED
            );
            res.status(finalResponse.code).send(finalResponse);
        } catch (error) {
            let finalError = utils.response.errorResponse(res, error);
            res.status(finalError.code).send(finalError);
        }
    };
    geoWithInBox = async (req: Request, res: Response) => {
        try {
            let payload = {
                index: 'resturantFind',
                path: 'location',
                bottomLeft: [28.60701, 77.3725],
                topRight: [28.60702, 77.37259]
            };
            let Response = await resturantEntity.geoWithInBox(payload);
            let finalResponse = utils.response.successResponse(
                res,
                Response,
                HttpStatusMessage.ACCEPTED,
                HttpStatusMessage.ACCEPTED
            );
            res.status(finalResponse.code).send(finalResponse);
        } catch (error) {
            let finalError = utils.response.errorResponse(res, error);
            res.status(finalError.code).send(finalError);
        }
    };
    geoWithInPolygon = async (req: Request, res: Response) => {
        try {
            let payload = {
                index: 'resturantFind',
                path: 'location',
                coordinate: [
                    [
                        [-161.323242, 22.512557],
                        [-152.446289, 22.065278],
                        [-156.09375, 17.811456],
                        [-161.323242, 22.512557]
                    ]
                ]
            };
            let Response = await resturantEntity.geoWithInPolygon(payload);
            let finalResponse = utils.response.successResponse(
                res,
                Response,
                HttpStatusMessage.ACCEPTED,
                HttpStatusMessage.ACCEPTED
            );
            res.status(finalResponse.code).send(finalResponse);
        } catch (error) {
            let finalError = utils.response.errorResponse(res, error);
            res.status(finalError.code).send(finalError);
        }
    };
    geoWithInMultiPoly = async (req: Request, res: Response) => {
        try {
            let payload = {
                index: 'resturantFind',
                path: 'location',
                coordinate: [
                    [
                        [
                            [-157.8412413882, 21.2882235819],
                            [-157.8607925468, 21.2962046205],
                            [-157.8646640634, 21.3077019651],
                            [-157.862776699, 21.320776283],
                            [-157.8341758705, 21.3133826738],
                            [-157.8349985678, 21.3000822569],
                            [-157.8412413882, 21.2882235819]
                        ]
                    ],
                    [
                        [
                            [-157.852898124, 21.301208833],
                            [-157.8580050499, 21.3050871833],
                            [-157.8587346108, 21.3098050385],
                            [-157.8508811028, 21.3119240258],
                            [-157.8454308541, 21.30396767],
                            [-157.852898124, 21.301208833]
                        ]
                    ]
                ]
            };
            let Response = await resturantEntity.geoWithInMultiPolygon(payload);
            let finalResponse = utils.response.successResponse(
                res,
                Response,
                HttpStatusMessage.ACCEPTED,
                HttpStatusMessage.ACCEPTED
            );
            res.status(finalResponse.code).send(finalResponse);
        } catch (error) {
            let finalError = utils.response.errorResponse(res, error);
            res.status(finalError.code).send(finalError);
        }
    };
    phrase = async (req: Request, res: Response) => {
        try {
            let payload = {
                index: 'default',
                query: 'chicken',
                path: 'label',
                slop: 3
            };
            let response = await recipeEntity.phraseSearch(payload);
            let finalResponse = utils.response.successResponse(
                res,
                response,
                HttpStatusMessage.OK
            );
            res.status(finalResponse.code).send(finalResponse);
        } catch (err) {
            let errorResponse = utils.response.errorResponse(res, err);
            res.status(errorResponse.code).send(errorResponse);
        }
    };
    diacriticInsensitive = async (req: Request, res: Response) => {
        try {
            let payload = {
                index: 'default',
                query: 'honey oat bReAd',
                path: 'label'
            };
            let response = await recipeEntity.diacriticInsensitive(payload);
            let finalResponse = utils.response.successResponse(
                res,
                response,
                HttpStatusMessage.OK
            );
            res.status(finalResponse.code).send(finalResponse);
        } catch (err) {
            let errorResponse = utils.response.errorResponse(res, err);
            res.status(errorResponse.code).send(errorResponse);
        }
    };
    regex = async (req: Request, res: Response) => {
        try {
            let payload = {
                index: 'default',
                query: '(.*)ney(.*) Bre(.*)',
                path: 'label'
            };
            let response = await recipeEntity.regexSearch(payload);
            let finalResponse = utils.response.successResponse(
                res,
                response,
                HttpStatusMessage.OK
            );
            res.status(finalResponse.code).send(finalResponse);
        } catch (err) {
            let errorResponse = utils.response.errorResponse(res, err);
            res.status(errorResponse.code).send(errorResponse);
        }
    };
    wildcard = async (req: Request, res: Response) => {
        try {
            let payload = {
                index: 'default',
                query: '*ney* Bre*',
                path: 'label'
            };
            let response = await recipeEntity.wildcardSearch(payload);

            let finalResponse = utils.response.successResponse(
                res,
                response,
                HttpStatusMessage.OK
            );
            res.status(finalResponse.code).send(finalResponse);
        } catch (err) {
            let errorResponse = utils.response.errorResponse(res, err);
            res.status(errorResponse.code).send(errorResponse);
        }
    };
    inSearch = async (req: Request, res: Response) => {
        try {
            let payload = {
                index: 'default',
                query: [2000, 2015],
                path: 'year'
            };
            let response = await movieEntity.inSearch(payload);
            let finalResponse = utils.response.successResponse(
                res,
                response,
                HttpStatusMessage.OK
            );
            res.status(finalResponse.code).send(finalResponse);

        } catch (err) {
            let errorResponse = utils.response.errorResponse(res, err);
            res.status(errorResponse.code).send(errorResponse);
        }
    };
    rangeFilter = async (req: Request, res: Response) => {
        try {
            let payload = {
                index: 'default',
                query: [2000, 2015],
                path: 'year'
            };
            let response = await movieEntity.rangeFilter(payload);
            let finalResponse = utils.response.successResponse(
                res,
                response,
                HttpStatusMessage.OK
            );
            res.status(finalResponse.code).send(finalResponse);

        } catch (err) {
            let errorResponse = utils.response.errorResponse(res, err);
            res.status(errorResponse.code).send(errorResponse);
        }
    };
}
export const qbController = new QueryBuilder();
