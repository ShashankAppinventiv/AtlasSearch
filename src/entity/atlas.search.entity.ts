import { Model } from 'mongoose';
import { CustomException } from '../providers/utils/exception.utils';
import { ExceptionMessage, HttpStatusMessage } from '../interfaces/enum';
export class AtlasSearch {
    private Model: Model<any>;
    constructor(mongoModel: Model<any>) {
        this.Model = mongoModel;
    }
    /**
     * @description This function is use for fuzzy search
     * @param index index file name of atlas search
     * @param query data that you want to search
     * @param path field name in a document
     * @returns query result
     */
    public autoComplete = async (
        index: string,
        query: string,
        path: string
    ) => {
        // Index file
        // {
        //   "mappings": {
        //     "dynamic": true,
        //     "fields": {
        //       "label": {
        //         "foldDiacritics": true,
        //         "maxGrams": 15,
        //         "minGrams": 2,
        //         "tokenization": "edgeGram",
        //         "type": "autocomplete"
        //       }
        //     }
        //   }
        // }
        return {
            $search: {
                index: `${index}`,
                autocomplete: {
                    path: `${path}`,
                    query: `${query}`,
                    tokenOrder: 'sequential',
                    fuzzy: {
                        maxEdits: 1,
                        prefixLength: 2,
                        maxExpension:100
                    }
                }
            }
        };
    };
    /**
     * @description This function is use for synonyms based searching
     * @param index index file name of atlas search
     * @param query data that you want to search
     * @param path field name in a document
     * @param synonymsDefinitionName Name of Synonyms definition
     * @returns query result
     */
    public synonyms = async (
        index: string,
        query: string,
        path: string,
        synonymsDefinitionName: string
    ) => {
        // Index file
        // {
        //     "mappings": {
        //       "dynamic": false,
        //       "fields": {
        //         "label": {
        //           "analyzer": "lucene.english",
        //           "type": "string"
        //         }
        //       }
        //     },
        //     "synonyms": [
        //       {
        //         "analyzer": "lucene.english",
        //         "name": "LabelSynonyms",
        //         "source": {
        //           "collection": "recepies_synony"
        //         }
        //       }
        //     ]
        //   }
        try {
            return {
                $search: {
                    index: `${index}`,
                    text: {
                        path: `${path}`,
                        query: `${query}`,
                        synonyms: `${synonymsDefinitionName}`
                    }
                }
            };
        } catch (err) {
            throw Promise.reject(err);
        }
    };
    /**
     * @description This function is use for locate points in the circular area
     * @param index index file name of atlas search
     * @param path field name in a document
     * @param coordinate coordinates of location
     * @param radius radius in meter
     * @returns query result
     */
    public geoWithInCircle = async (
        index: string,
        path: string,
        coordinate: [number, number],
        radius: number
    ) => {
        try {
            // Index file
            // {
            //     "mappings": {
            //       "fields": {
            //         "location": {
            //           "type": "geo"
            //         }
            //       }
            //     }
            //   }
            return {
                $search: {
                    index: `${index}`,
                    geoWithin: {
                        circle: {
                            center: {
                                type: 'Point',
                                coordinates: coordinate
                            },
                            radius: radius //in meter
                        },
                        path: `${path}`
                    }
                }
            };
        } catch (err) {
            throw Promise.reject(err);
        }
    };
    /**
     * @description This function is use for locate points in the Box
     * @param index index file name of atlas search
     * @param path field name in a document
     * @param bottomLeft coordinates of bottom left
     * @param topRight coordinates of bottom left
     * @returns query result
     */
    public geoWithInBox = async (
        index: string,
        path: string,
        bottomLeft: [number, number],
        topRight: [number, number]
    ) => {
        // Index file
        // {
        //     "mappings": {
        //       "fields": {
        //         "location": {
        //           "type": "geo"
        //         }
        //       }
        //     }
        //   }
        try {
            if (bottomLeft[0] >= topRight[0] || bottomLeft[1] >= topRight[1]) {
                throw new CustomException(
                    ExceptionMessage.COORDINATE_ERROR,
                    HttpStatusMessage.BAD_REQUEST
                );
            }
            return {
                $search: {
                    index: `${index}`,
                    geoWithin: {
                        path: `${path}`,
                        box: {
                            bottomLeft: {
                                type: 'Point',
                                coordinates: bottomLeft
                            },
                            topRight: {
                                type: 'Point',
                                coordinates: topRight
                            }
                        }
                    }
                }
            };
        } catch (err) {
            throw err;
        }
    };
    /**
     * @description This function is use for locate points in the polygon
     * @param index index file name of atlas search
     * @param path field name in a document
     * @param coordinate coordinates of location
     * @returns query result
     */
    public geoWithInPolygon = async (
        index: string,
        path: string,
        coordinate: [number, number][][]
    ) => {
        // Index file
        // {
        //     "mappings": {
        //       "fields": {
        //         "location": {
        //           "type": "geo"
        //         }
        //       }
        //     }
        //   }
        try {
            return {
                $search: {
                    index: `${index}`,
                    geoWithin: {
                        geometry: {
                            type: 'Polygon',
                            coordinates: coordinate
                        },
                        path: `${path}`
                    }
                }
            };
        } catch (err) {
            throw err;
        }
    };
    /**
     * @description This function is use for locate points in the multiple polygon
     * @param index index file name of atlas search
     * @param path field name in a document
     * @param coordinate coordinates of location
     * @returns query result
     */
    public geoWithInMultiPolygon = async (
        index: string,
        path: string,
        coordinate: [number, number][][][]
    ) => {
        // Index file
        // {
        //     "mappings": {
        //       "fields": {
        //         "location": {
        //           "type": "geo"
        //         }
        //       }
        //     }
        //   }
        try {
            return {
                $search: {
                    index: `${index}`,
                    geoWithin: {
                        geometry: {
                            type: 'MultiPolygon',
                            coordinates: coordinate
                        },
                        path: `${path}`
                    }
                }
            };
        } catch (err) {
            throw err;
        }
    };
    /**
     * @description This function is search or documents containing an ordered sequence of terms
     * @param index index file name of atlas search
     * @param query Information that you want to search
     * @param path field name in a document
     * @param slop positional distance between words
     * @returns query result
     */
    public phraseSearch = async (
        index: string,
        query: string,
        path: string,
        slop?: number
    ) => {
        try {
            // {
            //     "mappings": {
            //       "fields": {
            //         "label": {
            //           "analyzer": "lucene.standard",
            //           "type": "string"
            //         }
            //       }
            //     }
            //   }
            let slopData = slop || 0;
            return {
                $search: {
                    index: `${index}`,
                    phrase: {
                        path: `${path}`,
                        query: `${query}`,
                        slop: slopData
                    }
                }
            };
        } catch (err) {
            throw err;
        }
    };
    /**
     * @description This function is use for case insensitive search
     * @param index index file name of atlas search
     * @param query Information that you want to search
     * @param path field name in a document
     * @returns query result
     */
    public diacriticInsensitive = async (
        index: string,
        query: string,
        path: string
    ) => {
        try {
            // {
            //     "mappings": {
            //       "fields": {
            //         "label": {
            //           "analyzer": "diacriticFolder",
            //           "type": "string"
            //         }
            //       }
            //     },
            //     "analyzers": [
            //       {
            //         "charFilters": [],
            //         "name": "diacriticFolder",
            //         "tokenFilters": [
            //           {
            //             "type": "icuFolding"
            //           }
            //         ],
            //         "tokenizer": {
            //           "type": "keyword"//change this tokenizer as per your need
            //         }
            //       }
            //     ]
            //   }
            return {
                $search: {
                    index: `${index}`,
                    text: {
                        query: `${query}`,
                        path: `${path}`
                    }
                }
            };
        } catch (err) {
            throw err;
        }
    };
    /**
     * @description This function is use for regex based(pattern based) searching
     * @param index index file name of atlas search
     * @param query Information that you want to search
     * @param path field name in a document
     * @returns query result
     */
    public regexSearch = async (index: string, query: string, path: string) => {
        {
            // "mappings": {
            //   "fields": {
            //     "label": {
            //       "analyzer": "lucene.keyword",
            //       "type": "string"
            //     }
            //   }
            // }
        }

        try {
            return {
                $search: {
                    index: `${index}`,
                    regex: {
                        path: `${path}`,
                        query: `${query}`
                    }
                }
            };
        } catch (err) {
            throw err;
        }
    };
    /**
     *
     * @param index index file name of atlas search
     * @param query Information that you want to search
     * @param path field name in a document
     * @returns query result
     */
    public wildcardSearch = async (
        index: string,
        query: string,
        path: string
    ) => {
        //"mappings": {
        //   "fields": {
        //     "label": {
        //       "analyzer": "lucene.keyword",
        //       "type": "string"
        //     }
        //   }
        // }
        try {
            return {
                $search: {
                    index: `${index}`,
                    wildcard: {
                        path: `${path}`,
                        query: `${query}`
                    }
                }
            };
        } catch (err) {
            throw err;
        }
    };
    /**
     * @description This function is use for search item in an array
     * @param index index file name of atlas search
     * @param query Information that you want to search
     * @param path field name in a document
     * @returns query result
     */
    public inOperatorSearch = async (
        index: string,
        query: [],
        path: string
    ) => {
        try {
            return {
                $search: {
                    index: `${index}`,
                    in: {
                        path: `${path}`,
                        value: query
                    }
                }
            };
        } catch (err) {
            throw err;
        }
    };
    /**
     *
     * @param index index file name of atlas search
     * @param query Information that you want to search
     * @param path field name in a document
     * @returns query result
     */
    public rangeFilter = async (
        index: string,
        query: [number, number],
        path: string
    ) => {
        try {
            // {
            //     "mappings": {
            //       "dynamic": true
            //     }
            //   }
            return {
                $search: {
                    index: `${index}`,
                    range: {
                        path: `${path}`,
                        gte: query[0],
                        lte: query[1]
                    }
                }
            };
        } catch (err) {
            throw err;
        }
    };
}
