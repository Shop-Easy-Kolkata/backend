"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
var url = 'mongodb://localhost:27017';
const client = new mongodb_1.MongoClient(url);
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
let UserService = class UserService {
    async getUsers() {
        console.log("Before connect");
        await client.connect();
        console.log("AFTER CONNECT");
        const db = client.db('Shop-easy');
        const collection = db.collection('users');
        const dbUsers = await collection.find().toArray();
        console.log(dbUsers);
        return dbUsers;
    }
    async getUserByUsername(name) {
        await client.connect();
        const db = client.db('Shop-easy');
        const collection = db.collection('users');
        const response = await collection.findOne({ _id: name });
        return response;
    }
    async registerNewUser(userObj) {
        await client.connect();
        const db = client.db('Shop-easy');
        const collection = db.collection('users');
        const checkId = await collection.findOne({ _id: userObj._id });
        console.log(checkId);
        if (checkId == null) {
            const response = await collection.insertOne(userObj);
            return response;
        }
        else {
            return { acknowledged: false };
        }
    }
    sendConfirmationMail(body) {
        const transport = {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'schowdhurycse23@gmail.com',
                pass: 'vfbwvxnjpuurgvgv'
            }
        };
        const transporter = nodemailer.createTransport(transport);
        const MailGenerator = new Mailgen({
            theme: 'salted',
            product: {
                name: 'Shop-Easy',
                link: 'https://github.com/SwapnilChowdhury/shopeasy'
            }
        });
        const emailBody = {
            body: {
                greeting: 'Hi',
                signature: 'Best Regards',
                name: body.name.firstname + " " + body.name.lastname,
                intro: ['Thanks for choosing Shop-easy.', ' Your registration is confirmed and we are thrilled to have you join our community of savvy shoppers.'],
                outro: 'Enjoy Shopping. Shop_Easy | Its Easy'
            },
        };
        const mail = MailGenerator.generate(emailBody);
        console.log("Mail will be sent to " + body._id);
        const message = {
            from: 'schowdhurycse23@gmail.com',
            to: body._id,
            subject: 'Shop-Easy: Confirmation Your Account has been created',
            html: mail,
        };
        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log("Email Cannot be sent " + err);
                return false;
            }
            else {
                console.log("Mail sent " + info);
                return true;
            }
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map