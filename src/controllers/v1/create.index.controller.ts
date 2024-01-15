import { atlasIndexing } from '../../providers/atlas/atlas.search.indexing';

export class AtlasIndexController {
    constructor() {     
      this.createIndex();
    }
    private async updateIndex() {
        try {
            const index =    {
              "mappings": {
                "dynamic": true,
                "fields": {
                  "personalizedListId":{
                        "type": "string",
                        "analyzer": "lucene.standard"
                      },
                  "item": {
                    "fields": {
                      "name": {
                        "foldDiacritics": true,
                            "maxGrams": 15,
                            "minGrams": 2,
                            "tokenization": "edgeGram",
                            "type": "autocomplete"
                      }
                    },
                    "type": "document"
                  }
              }
            }
          }
            await atlasIndexing.updateIndex('', 'list_details', 'autocomplete_list_details_item_name_check',index);
            console.log('Index Update Successfully');
        } catch (err) {
            console.log(err);
        }
    }
    private async createIndex() {
        try {
            const index = {
                name: 'autocomplete_content_title',
                definition: {
                  "mappings": {
                    "dynamic": true,
                    "fields": {
                      "title": {
                            "foldDiacritics": true,
                            "maxGrams": 15,
                            "minGrams": 2,
                            "tokenization": "edgeGram",
                            "type": "autocomplete"
                      }
                  }
                }
              }
            };
            await atlasIndexing.createIndex('local', 'static_contents', index);
            console.log('Index Create Successfully');
        } catch (err) {
            console.log(err);
        }
    }
    private async deleteIndex() {
        try {
            await atlasIndexing.deleteIndex('', 'list_details', '');
            console.log('Index Delete Successfully');
        } catch (err) {
            console.log(err);
        }
    }
    private async viewIndex() {
        try {
            await atlasIndexing.viewIndex('','contents','autocomplete_content_title');
        }catch(err) {
            console.log(err);
        }
    }
}
