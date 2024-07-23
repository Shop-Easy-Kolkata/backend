import { Injectable } from '@nestjs/common';
import { Product } from './product';
import * as mongodb from 'mongodb'
import { MongoClient } from 'mongodb'
var url: string = 'mongodb://localhost:27017';
const client: mongodb.MongoClient = new MongoClient(url);
@Injectable()
export class ProductService {
    async getAllProducts():Promise<Product[]>{
        await client.connect();
        const db: mongodb.Db = client.db('Shop-easy');
        const collection: mongodb.Collection = db.collection('products')
        const dbProducts = await collection.find().toArray() as Product[];
        return dbProducts;
    }

    async getProductById(id:string):Promise<Product>{
        await client.connect();
        const db: mongodb.Db = client.db('Shop-easy');
        const collection: mongodb.Collection = db.collection('products')
        const dbProducts = await collection.findOne({id:parseInt(id)}) as Product;
        return dbProducts;
    }
    async getCategories():Promise<string[]>{
        await client.connect();
        const db: mongodb.Db = client.db('Shop-easy');
        const collection: mongodb.Collection = db.collection('products')
        const dbCategories = await collection.distinct("category") as string[];
        return dbCategories;
    }
    async getBrands():Promise<string[]>{
        await client.connect();
        const db: mongodb.Db = client.db('Shop-easy');
        const collection: mongodb.Collection = db.collection('products')
        const dbCategories = await collection.distinct("brand") as string[];
        return dbCategories;
    }
}
