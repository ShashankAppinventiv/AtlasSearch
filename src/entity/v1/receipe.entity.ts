import { recepiesModel } from '../../models/recepie.model';
import { AtlasSearch } from '../atlas.search.entity';
import BaseEntity from '../base-mongo.entity';

class RecipeEntity extends BaseEntity {
    public atlasSearch: AtlasSearch;
    constructor() {
        super(recepiesModel);
        this.atlasSearch = new AtlasSearch(recepiesModel);
    }
    async autocomplete(payload: any) {
        try {
            let pipeline: any = [];
            pipeline.push(
                await this.atlasSearch.autoComplete(
                    payload.index,
                    payload.query,
                    payload.path
                )
            );
            
            let data = await this.aggregateData(pipeline);
            return data;
        } catch (err) {
            throw err;
        }
    }
    async synonyms(payload:any) {
        try {
            let pipeline: any = [];
            pipeline.push(
                await this.atlasSearch.synonyms(
                    payload.index,
                    payload.query,
                    payload.path,
                    payload.synonymsDefinitionName
                )
            );
            let data = await this.aggregateData(pipeline);
            return data;
        } catch (err) {
            throw err;
        }
    }
    async phraseSearch(payload:any) {
        try {
            let pipeline: any = [];
            pipeline.push(
                await this.atlasSearch.phraseSearch(
                    payload.index,
                    payload.query,
                    payload.path,
                    payload.slop
                ))
            let data = await this.aggregateData(pipeline);
            return data;
        } catch (err) {
            throw err;
        }
    }
    async diacriticInsensitive(payload:any){
        try {
            let pipeline: any = [];
            pipeline.push(
                await this.atlasSearch.diacriticInsensitive(
                    payload.index,
                    payload.query,
                    payload.path,
                ))
            let data = await this.aggregateData(pipeline);
            return data;
        } catch (err) {
            throw err;
        }
    }
    async regexSearch(payload:any){
        try {
            let pipeline: any = [];
            pipeline.push(
                await this.atlasSearch.regexSearch(
                    payload.index,
                    payload.query,
                    payload.path
                ))
            let data = await this.aggregateData(pipeline);
            return data;
        } catch (err) {
            throw err;
        }
    }
    async wildcardSearch(payload:any){
        try {
            let pipeline: any = [];
            pipeline.push(
                await this.atlasSearch.wildcardSearch(
                    payload.index,
                    payload.query,
                    payload.path
                ))
            let data = await this.aggregateData(pipeline);
            return data;
        } catch (err) {
            throw err;
        }
    }
}
export const recipeEntity = new RecipeEntity();
