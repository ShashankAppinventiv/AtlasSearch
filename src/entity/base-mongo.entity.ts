import {
    Model,
    AggregateOptions,
    PipelineStage,
    InsertManyOptions,
    QueryOptions,
    FilterQuery,
    ProjectionType,
    UpdateQuery,
    Types,
} from 'mongoose';
import { AcceptAny } from '../interfaces/types';

export default class BaseEntity {
    protected model: Model<AcceptAny>;
    constructor(mongoModel: Model<AcceptAny>) {
        this.model = mongoModel;
    }

    ObjectId(id?: string) {
        return new Types.ObjectId(id);
    }

    async saveData<Type>(data: Type) {
        try {
            return await new this.model(data).save();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async insertMany<Type>(data: Type, options: InsertManyOptions) {
        try {
            return await this.model.insertMany(data, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async distinct<Type>(field: string, query: FilterQuery<AcceptAny>) {
        try {
            return await this.model.distinct(field, query);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async find(
        query: FilterQuery<AcceptAny>,
        projection: ProjectionType<AcceptAny>,
        options: QueryOptions
    ) {
        try {
            return await this.model.find(query, projection, options).exec();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async findOne(
        query: FilterQuery<AcceptAny>,
        projection: ProjectionType<AcceptAny>,
        options?: QueryOptions
    ) {
        try {
            if (options != undefined) {
                options['lean'] = true;
            } else {
                options = { lean: true };
            }
            return await this.model.findOne(query, projection, options).exec();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async findOneAndUpdate(
        conditions: FilterQuery<AcceptAny>,
        update: UpdateQuery<AcceptAny>,
        options: QueryOptions
    ) {
        try {
            if (options != undefined) {
                options['writeConcern'] = { w: 'majority', wtimeout: 5000 };
            } else {
                options = { writeConcern: { w: 'majority', wtimeout: 5000 } };
            }
            return await this.model.findOneAndUpdate(conditions, update, options).exec();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async aggregateData(aggregateArray: PipelineStage[], options?: AggregateOptions) {
        try {
            return await this.model.aggregate(aggregateArray, options).exec();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async updateOne(
        query: FilterQuery<AcceptAny>,
        update: UpdateQuery<AcceptAny>,
        options: QueryOptions
    ) {
        try {
            return await this.model.updateOne(query, update, options).exec();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async updateMany(
        query: FilterQuery<AcceptAny>,
        update: UpdateQuery<AcceptAny>,
        options: QueryOptions
    ) {
        try {
            return await this.model.updateMany(query, update, options).exec();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async deleteMany(query: FilterQuery<AcceptAny>) {
        try {
            return await this.model.deleteMany(query);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async removeOne(query: FilterQuery<AcceptAny>) {
        try {
            return await this.model.deleteOne(query);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getCount(query: FilterQuery<AcceptAny>) {
        try {
            return await this.model.countDocuments(query);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
