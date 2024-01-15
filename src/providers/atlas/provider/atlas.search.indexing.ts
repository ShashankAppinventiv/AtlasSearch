import { MongoClient } from 'mongodb';

class AtlasSearchIndex {
    private client!: MongoClient;
    constructor() {
        this.loadClient();
    }
    private loadClient = async () => {
        this.client = new MongoClient('');//connection uri
        console.log('Atlas search indexing client connected');
    };
    public createIndex = async (dbName: string, collectionName: string, index: any) => {
        try {
            if (!(await this.checkIndexExist(dbName, collectionName, index.name))) {
                console.log(`Index already exist on collection ${collectionName}`);
                return;
            }
            const database = this.client.db(`${dbName}`);
            const collection = database.collection(`${collectionName}`);
            // run the helper method
            const result = await collection.createSearchIndex(index);
            console.log(`Index Created on ${collectionName} with name`, result);
        } catch (err) {
            throw err;
        }
    };
    public deleteIndex = async (dbName: string, collectionName: string, index: string) => {
        try {
            const database = this.client.db(`${dbName}`);
            const collection = database.collection(`${collectionName}`);
            // run the helper method
            await collection.dropSearchIndex(index);
            console.log(`Index delete successfully on ${collectionName}`);
        } catch (err) {
            throw err;
        }
    };
    public updateIndex = async (
        dbName: string,
        collectionName: string,
        indexName: string,
        index: object
    ) => {
        try {
            const database = this.client.db(`${dbName}`);
            const collection = database.collection(`${collectionName}`);
            // run the helper method
            const result = await collection.updateSearchIndex(indexName, index);
            console.log(`Index update successfully on collection ${collectionName}`, result);
        } catch (err) {
            throw err;
        }
    };
    public checkIndexExist = async (dbName: string, collectionName: string, indexName: string) => {
        try {
            const database = this.client.db(`${dbName}`);
            const collection = database.collection(`${collectionName}`);
            // run the helper method
            const result = await collection.listSearchIndexes(indexName).toArray();
            if (result.length <= 0) {
                return true;
            }
            return false;
        } catch (err) {
            throw err;
        }
    };
    public viewIndex = async (dbName: string, collectionName: string, indexName: string) => {
        try {
            const database = this.client.db(`${dbName}`);
            const collection = database.collection(`${collectionName}`);
            // run the helper method
            const result = await collection.listSearchIndexes(indexName).toArray();
            return result;
        } catch (err) {
            throw err;
        }
    };
}
export const atlasSearchIndex = new AtlasSearchIndex();
