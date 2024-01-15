import { resturantModel } from '../../models/resturant.model';
import { AtlasSearch } from '../atlas.search.entity';
import BaseEntity from '../base-mongo.entity';
class RecipeEntity extends BaseEntity{
    public atlasSearch: AtlasSearch;
    constructor() {
        super(resturantModel);
        this.atlasSearch = new AtlasSearch(resturantModel);
    }
    async geoWithInCircle(payload:any){
        try {
            let pipeline: any = [];
            pipeline.push(
                await this.atlasSearch.geoWithInCircle(
                    payload.index,
                    payload.path,
                    payload.coordinate,
                    payload.radius
                )
            );
            let data = await this.aggregateData(pipeline);
            return data;
        } catch (err) {
            throw err;
        }
    }
    async geoWithInBox(payload:any) {
        try {
            let pipeline: any = [];
            pipeline.push(
                await this.atlasSearch.geoWithInBox(
                    payload.index,
                    payload.path,
                    payload.bottomLeft,
                    payload.topRight,
                )
            );
            let data = await this.aggregateData(pipeline);
            return data;
        } catch (err) {
            throw err;
        }
    }
    async geoWithInPolygon(payload:any) {
        try {
            let pipeline: any = [];
            pipeline.push(
                await this.atlasSearch.geoWithInPolygon(
                    payload.index,
                    payload.path,
                    payload.coordinate,
                )
            );
            let data = await this.aggregateData(pipeline);
            return data;
        } catch (err) {
            throw err;
        }
    }
    async geoWithInMultiPolygon(payload:any){
        try {
            let pipeline: any = [];
            pipeline.push(
                await this.atlasSearch.geoWithInMultiPolygon(
                    payload.index,
                    payload.path,
                    payload.coordinate,
                )
            );
            let data = await this.aggregateData(pipeline);
            return data;
        } catch (err) {
            throw err;
        }
    }
}
export const resturantEntity = new RecipeEntity();
