import { movieModel } from '../../models/movies.model';
import { AtlasSearch } from '../../providers/atlas/atlas.search';
import BaseEntity from '../base-mongo.entity';

class MovieEntity extends BaseEntity {
    private atlasSearch: AtlasSearch;
    constructor() {
        super(movieModel);
        this.atlasSearch = new AtlasSearch(movieModel);
    }
    public async inSearch(payload: any) {
        try {
            let pipeline: any = [];
            pipeline.push(
                await this.atlasSearch.inOperatorSearch(
                    payload.index,
                    payload.query,
                    payload.path
                )
            );
            pipeline.push({
                $project: {
                    _id: 1,
                    year: 1
                }
            });
            pipeline.push({
                $limit: 10
            });
            let data = await this.aggregateData(pipeline);
            return data;
        } catch (err) {
            throw err;
        }
    }
    public async rangeFilter(payload: any) {
        try {
            let pipeline: any = [];
            pipeline.push(
                await this.atlasSearch.rangeFilter(
                    payload.index,
                    payload.query,
                    payload.path
                )
            );
            pipeline.push({
                $project: {
                    _id: 1,
                    year: 1
                }
            });
            pipeline.push({
                $limit: 10
            });
            let data = await this.aggregateData(pipeline);
            return data;
        } catch (err) {
            throw err;
        }
    }
}
export const movieEntity = new MovieEntity();
