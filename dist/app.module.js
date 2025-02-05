"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_service_1 = require("./user/user.service");
const user_controller_1 = require("./user/user.controller");
const auth_service_1 = require("./auth/auth.service");
const product_service_1 = require("./product/product.service");
const product_controller_1 = require("./product/product.controller");
const cart_service_1 = require("./cart/cart.service");
const cart_controller_1 = require("./cart/cart.controller");
const orders_service_1 = require("./orders/orders.service");
const orders_controller_1 = require("./orders/orders.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [app_controller_1.AppController, user_controller_1.UserController, product_controller_1.ProductController, cart_controller_1.CartController, orders_controller_1.OrdersController],
        providers: [app_service_1.AppService, user_service_1.UserService, auth_service_1.AuthService, product_service_1.ProductService, cart_service_1.CartService, orders_service_1.OrdersService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map