"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
var url = 'mongodb://localhost:27017';
const client = new mongodb_1.MongoClient(url);
let OrdersService = class OrdersService {
    async addNewOrder(body) {
        await client.connect();
        console.log("AFTER CONNECT");
        const db = client.db('Shop-easy');
        const collection = db.collection('orders');
        const res = await collection.insertOne(body);
        return res;
    }
    async getOrderById(id) {
        await client.connect();
        const db = client.db('Shop-easy');
        const collection = db.collection('orders');
        const res = await collection.findOne({ userId: id });
        const deliveryDetails = res.delivery;
        return deliveryDetails;
    }
    async updateDeliveryDetails() {
        await client.connect();
        const db = client.db('Shop-easy');
        const collection = db.collection('orders');
        const res = await collection.find().toArray();
        const dateAndTime = new Date();
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            element.delivery.map((del) => {
                if (del.date.getTime() >= dateAndTime.getTime()) {
                    const updateRes = collection.updateOne({ _id: element._id }, { $addToSet: { delivered: element.delivery } }, { upsert: true });
                    const updateRes2 = collection.updateOne({ _id: element._id }, { $pop: { delivery: element.delivery } }, { upsert: true });
                }
            });
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)()
], OrdersService);
//# sourceMappingURL=orders.service.js.map