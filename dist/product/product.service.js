"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
var url = 'mongodb://localhost:27017';
const client = new mongodb_1.MongoClient(url);
let ProductService = class ProductService {
    async getAllProducts() {
        await client.connect();
        const db = client.db('Shop-easy');
        const collection = db.collection('products');
        const dbProducts = await collection.find().toArray();
        return dbProducts;
    }
    async getProductById(id) {
        await client.connect();
        const db = client.db('Shop-easy');
        const collection = db.collection('products');
        const dbProducts = await collection.findOne({ id: parseInt(id) });
        return dbProducts;
    }
    async getCategories() {
        await client.connect();
        const db = client.db('Shop-easy');
        const collection = db.collection('products');
        const dbCategories = await collection.distinct("category");
        return dbCategories;
    }
    async getBrands() {
        await client.connect();
        const db = client.db('Shop-easy');
        const collection = db.collection('products');
        const dbCategories = await collection.distinct("brand");
        return dbCategories;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)()
], ProductService);
//# sourceMappingURL=product.service.js.map