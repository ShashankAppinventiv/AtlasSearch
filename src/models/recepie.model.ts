import { Schema } from "mongoose";
import { mongo } from "../providers/database/mongo.connection";

interface IRecepie {
    label:string;
}
const recepiesSchema=new Schema<IRecepie>({
    label:String,
})
export const recepiesModel=mongo.getConnection().model('recepies',recepiesSchema);