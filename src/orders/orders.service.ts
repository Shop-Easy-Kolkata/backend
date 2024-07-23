import { Injectable } from '@nestjs/common';
import * as mongodb from 'mongodb'
import { MongoClient } from 'mongodb'
var url: string = 'mongodb://localhost:27017';
const client: mongodb.MongoClient = new MongoClient(url);
@Injectable()
export class OrdersService {
    async addNewOrder(body){
        await client.connect();
        console.log("AFTER CONNECT");
        const db: mongodb.Db = client.db('Shop-easy');
        const collection: mongodb.Collection = db.collection('orders');
        const res = await collection.insertOne(body);
        return res;
    }
    async getOrderById(id){
        await client.connect();
        const db: mongodb.Db = client.db('Shop-easy');
        const collection: mongodb.Collection = db.collection('orders');
        const res = await collection.findOne({userId:id})
        const deliveryDetails = res.delivery;
        return deliveryDetails;

    }
    async updateDeliveryDetails(){
        await client.connect();
        const db: mongodb.Db = client.db('Shop-easy');
        const collection: mongodb.Collection = db.collection('orders');
        const res = await collection.find().toArray();
        const dateAndTime = new Date();
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            element.delivery.map((del)=>{
                if(del.date.getTime()>=dateAndTime.getTime()){
                    const updateRes = collection.updateOne({_id:element._id},{$addToSet:{delivered:element.delivery}},{upsert:true})
                    const updateRes2 = collection.updateOne({_id:element._id},{$pop:{delivery:element.delivery}},{upsert:true}) 
 
                }
            })
            
        }
    }
}
