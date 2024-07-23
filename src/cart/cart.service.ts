import { Injectable } from '@nestjs/common';
import * as mongodb from 'mongodb'
import { MongoClient } from 'mongodb'
var url: string = 'mongodb://localhost:27017';
const client: mongodb.MongoClient = new MongoClient(url);

const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
@Injectable()
export class CartService {
    async addToCart(userId,product){
        await client.connect();
        const db: mongodb.Db = client.db('Shop-easy');
        const collection: mongodb.Collection = db.collection('cart')
        const isPresent = await collection.findOne({userId:userId});
        const addedToCart = await collection.updateOne({userId:userId},{$addToSet:{products:product}},{upsert:true});
        return addedToCart;
    }
    async getProductsInCart(userId){
        await client.connect();
        const db: mongodb.Db = client.db('Shop-easy');
        const collection: mongodb.Collection = db.collection('cart');
        const cartData = await collection.findOne({userId:parseInt(userId)});
        console.log(cartData);
        if(cartData==null){
            return [];
        }else{
            return cartData.products;
        }
        
    }
    async updateQuantity(userId,productId,quantity){
        await client.connect();
        const db: mongodb.Db = client.db('Shop-easy');
        const collection: mongodb.Collection = db.collection('cart');
        const cartData = await collection.findOne({userId:userId});
        const cartProducts = cartData.products;
        console.log(cartProducts);
        // const targetData = cartProducts.find((c)=>c.id==productId);
        // targetData.quantity = quantity;
        // console.log("Target data = "+targetData)
        const targetDataIndex = cartProducts.findIndex((c)=>c.id==productId);
        const targetData = {...cartProducts[targetDataIndex]}
        targetData.quantity = quantity;
        // console.log("Target data Index = "+targetDataIndex)
        cartProducts[targetDataIndex] = targetData;
        console.log("New Data = "+JSON.stringify(cartProducts));
        const updateResult = await collection.updateOne({userId:userId},{$set:{products:cartProducts}})
        return updateResult;
    }
    async deleteEntry(userId,productId){
        await client.connect();
        const db: mongodb.Db = client.db('Shop-easy');
        const collection: mongodb.Collection = db.collection('cart');
        const cartData = await collection.findOne({userId:userId});
        const targetDataIndex = cartData.products.findIndex((c)=>c.id==productId);
        // const filteredCartData = cartData.products.filter((c)=>)
        cartData['products'].splice(targetDataIndex,1);
        const updateResult = await collection.updateOne({userId:userId},{$set:{products:cartData.products}})
        return updateResult;
    }
    async clearAllCart(userId){
        await client.connect();
        const db: mongodb.Db = client.db('Shop-easy');
        const collection: mongodb.Collection = db.collection('cart');
        const cartData = await collection.findOne({userId:userId});
        const res = await collection.deleteOne({userId:userId});
        const collection2: mongodb.Collection = db.collection('orders');
        const orderData = await collection2.updateOne({userId:userId},{$addToSet:{delivery:{date:new Date(),products:cartData.products}}},{upsert:true});
        return orderData;
    }

    async sendConfirmationMail(body){
        await client.connect();
        const db: mongodb.Db = client.db('Shop-easy');
        const collection: mongodb.Collection = db.collection('users');
        const userObj = collection.find({id:body.id})
        const transport = {
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
                user:'schowdhurycse23@gmail.com',
                pass:'vfbwvxnjpuurgvgv'//Need app password here
            }
        };

        const transporter = nodemailer.createTransport(transport);

        const MailGenerator = new Mailgen({
            theme:'salted',
            product:{
                name:'Shop-Easy',
                link:'https://github.com/SwapnilChowdhury/shopeasy'
            }
        });

        const emailBody = {
            body:{
                greeting:'Hi',
                signature:'Best Regards',
                name:body.name.firstname + " "+ body.name.lastname,
                intro:['Thanks for choosing Shop-easy.',' Your order is placed and will be delivered in 2 days.'],
                table:{
                            data:body
                        },
                // action:{
                //     instructions:'The EmailId and Password used for this account are.Keepr it safe. Do not share your login details with others',
                //     table:{
                //         data:[{'EmailId':body._id,'Password':body.password}]
                //     }
                // },
                outro:'Enjoy Shopping. Shop_Easy | Its Easy'
            },
        };
        const mail = MailGenerator.generate(emailBody);
        console.log("Mail will be sent to "+body._id);
        const message = {
            from:'schowdhurycse23@gmail.com',
            to:body._id,
            subject:'Shop-Easy: Confirmation Your Order has been placed',
            html:mail,
        };

        transporter.sendMail(message,(err,info)=>{
            if(err){
                console.log("Email Cannot be sent "+err);
                return false;
            }
            else{
                console.log("Mail sent "+info);
                return true;
            }
        });
    }
}
