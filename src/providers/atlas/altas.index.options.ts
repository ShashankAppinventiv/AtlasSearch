/* eslint-disable prettier/prettier */
import { CREATE_ATLAS_INDEXING } from '../../common/atlas.index';
import { atlasSearchIndex } from './provider/atlas.search.indexing';

export class AtlasSearchService {
    constructor() {
        this.createIndex();  
    }
    private async createIndex() {
        try {
            CREATE_ATLAS_INDEXING.forEach(async (data)=>{
                await atlasSearchIndex.createIndex(data.DATABASE,
                    data.COLLECTION,data.INDEX)
            })
        } catch (err) {
            console.log(err);
        }
    }
}
