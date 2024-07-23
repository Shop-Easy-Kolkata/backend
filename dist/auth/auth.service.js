"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt = require('jsonwebtoken');
let AuthService = class AuthService {
    autheniticateToken(req, res) {
        let flag = false;
        console.log(req.headers.authorization.split(' ')[1]);
        const token = req.headers.authorization.split(' ')[1];
        console.log("Line 9: " + token);
        if (!token) {
            flag = false;
        }
        jwt.verify(token, "abc", (err) => {
            if (err) {
                flag = false;
            }
            else {
                console.log("Inside else");
                flag = true;
            }
        });
        return flag;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map