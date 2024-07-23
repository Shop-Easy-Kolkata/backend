import { Injectable } from '@nestjs/common';
import * as mongodb from 'mongodb'
import { MongoClient } from 'mongodb'
import { User } from './user';
// var { MongoClient } = require('mongodb');
var url: string = 'mongodb://localhost:27017';
const client: mongodb.MongoClient = new MongoClient(url);

const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
@Injectable()
export class UserService {
    async getUsers(): Promise<User[]> {
        console.log("Before connect");
        await client.connect();
        console.log("AFTER CONNECT");
        const db: mongodb.Db = client.db('Shop-easy');
        const collection: mongodb.Collection = db.collection('users')
        const dbUsers = await collection.find().toArray() as User[];
        console.log(dbUsers);
        return dbUsers;
    }
    async getUserByUsername(name):Promise<any>{
        await client.connect();
        const db = client.db('Shop-easy');
        const collection = db.collection('users')
        const response = await collection.findOne({_id:name});
        return response;
    }
    async registerNewUser(userObj){
        await client.connect();
        const db = client.db('Shop-easy');
        const collection = db.collection('users')
        const checkId = await collection.findOne({_id:userObj._id})
        console.log(checkId);
        if(checkId==null){
            const response = await collection.insertOne(userObj);
            return response;
        }else{
            return {acknowledged:false};
        }
        
    }
    sendConfirmationMail(body){
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
                intro:['Thanks for choosing Shop-easy.',' Your registration is confirmed and we are thrilled to have you join our community of savvy shoppers.'],
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
            subject:'Shop-Easy: Confirmation Your Account has been created',
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
