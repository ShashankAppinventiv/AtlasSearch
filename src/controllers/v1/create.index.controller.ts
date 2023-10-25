import { atlasIndexing } from '../../providers/atlas/atlas.search.indexing';

export class AtlasIndexController {
    constructor() {     

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
<<<<<<< HEAD
            await atlasIndexing.updateIndex('', 'list_details', 'autocomplete_list_details_item_name_check',index);
=======
            await atlasIndexing.updateIndex('', '', '',index);
>>>>>>> 0e9aee3ce1dda4f9dba74a42b4aaa8498b848e6c
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
<<<<<<< HEAD
            await atlasIndexing.createIndex('', 'static_contents', index);
=======
            await atlasIndexing.createIndex('', '', index);
>>>>>>> 0e9aee3ce1dda4f9dba74a42b4aaa8498b848e6c
            console.log('Index Create Successfully');
        } catch (err) {
            console.log(err);
        }
    }
    private async deleteIndex() {
        try {
<<<<<<< HEAD
            await atlasIndexing.deleteIndex('', 'list_details', '');
=======
            await atlasIndexing.deleteIndex('', '', '');
>>>>>>> 0e9aee3ce1dda4f9dba74a42b4aaa8498b848e6c
            console.log('Index Delete Successfully');
        } catch (err) {
            console.log(err);
        }
    }
    private async viewIndex() {
        try {
<<<<<<< HEAD
            await atlasIndexing.viewSearchIndex('','contents','autocomplete_content_title');
=======
            await atlasIndexing.viewIndex('','','');
            // await atlasIndexing.viewSearchIndex('DiabeticU_users','meals','');
>>>>>>> 0e9aee3ce1dda4f9dba74a42b4aaa8498b848e6c
        }catch(err) {
            console.log(err);
        }
    }
}
