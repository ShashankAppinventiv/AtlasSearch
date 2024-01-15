import { ATLAS_INDEX } from "./constant";

export const CREATE_ATLAS_INDEXING = [
    {
        INDEX: {
            name: ATLAS_INDEX.user,
            definition: {
                mappings: {
                    dynamic: true,
                    fields: {
                        title: {
                            foldDiacritics: true,
                            maxGrams: 15,
                            minGrams: 2,
                            tokenization: 'edgeGram',
                            type: 'autocomplete',
                        },
                    },
                },
            },
        },
        DATABASE: '',
        COLLECTION: '',
    },
    {
      INDEX: {
        name: ATLAS_INDEX.user,
        definition: {
            "mappings": {
                "fields": {
                  "label": {
                    "analyzer": "diacriticFolder",
                    "type": "string"
                  }
                }
              },
              "analyzers": [
                {
                  "charFilters": [],
                  "name": "diacriticFolder",
                  "tokenFilters": [
                    {
                      "type": "icuFolding"
                    }
                  ],
                  "tokenizer": {
                    "type": "keyword"//change this tokenizer as per your need
                  }
                }
            ]
        }
      },
      DATABASE: '',
      COLLECTION: '',      
    }
]