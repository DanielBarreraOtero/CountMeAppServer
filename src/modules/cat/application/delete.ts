import mongoose from "mongoose";
import CatBD from "../entities-bbdd/Cat_entity";


export default class DeleteCat{
    async execute(id: string){
        return await CatBD.deleteOne({'_id': id})
    }
}