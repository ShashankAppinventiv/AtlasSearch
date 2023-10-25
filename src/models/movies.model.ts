import { Schema } from 'mongoose';
import { mongo } from '../providers/database/mongo.connection';

interface Movie {
    plot: string;
    genres: string[];
    runtime: number;
    rated: string;
    cast: string[];
    num_mflix_comments: number;
    poster: string;
    title: string;
    fullplot: string;
    languages: string[];
    released: {
        $date: {
            $numberLong: string;
        };
    };
    directors: string[];
    writers: string[];
    awards: {
        wins: number;
        nominations: number;
        text: string;
    };
    lastupdated: string;
    year: number;
    imdb: {
        rating: number;
        votes: number;
        id: number;
    };
    countries: string[];
    type: string;
    tomatoes: {
        viewer: {
            rating: number;
            numReviews: number;
            meter: number;
        };
        dvd: {
            $date: string;
        };
        critic: {
            rating: number;
            numReviews: number;
            meter: number;
        };
        lastUpdated: {
            $date: string;
        };
        consensus: string;
        rotten: number;
        production: string;
        fresh: number;
    };
}

const movieSchema = new Schema<Movie>({
    plot: String,
    genres: [String],
    runtime: Number,
    rated: String,
    cast: [String],
    num_mflix_comments: Number,
    poster: String,
    title: String,
    fullplot: String,
    languages: [String],
    released: {
        $date: {
            $numberLong: String
        }
    },
    directors: [String],
    writers: [String],
    awards: {
        wins: Number,
        nominations: Number,
        text: String
    },
    lastupdated: String,
    year: Number,
    imdb: {
        rating: Number,
        votes: Number,
        id: Number
    },
    countries: [String],
    type: String,
    tomatoes: {
        viewer: {
            rating: Number,
            numReviews: Number,
            meter: Number
        },
        dvd: {
            $date: String
        },
        critic: {
            rating: Number,
            numReviews: Number,
            meter: Number
        },
        lastUpdated: {
            $date: String
        },
        consensus: String,
        rotten: Number,
        production: String,
        fresh: Number
    }
});

export const movieModel = mongo.getConnection().model('movies', movieSchema);
