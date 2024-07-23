import { ObjectId } from "mongodb"

export interface Product{
    _id:ObjectId,
    id:number,
    title:string,
    description:string,
    price:number,
    category:string,
    brand:string
}