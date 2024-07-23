"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const user_service_1 = require("./user.service");
const console_1 = require("console");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let UserController = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async getUsers(response, req) {
        response.send(await this.userService.getUsers());
    }
    async doLogin(body, response) {
        try {
            console.log(body);
            if (body.username == "") {
                console.log("Inside username null");
                response.send({ message: 'Username is required', result: 1 });
            }
            else if (body.password == "") {
                console.log("Inside password null");
                response.send({ message: 'Password is required', result: 3 });
            }
            else {
                const targetUser = await this.userService.getUserByUsername(body.username);
                console.log(targetUser);
                if (targetUser == null) {
                    throw new common_1.HttpException({
                        status: common_1.HttpStatus.BAD_REQUEST,
                        error: 'Username does not exist',
                    }, common_1.HttpStatus.BAD_REQUEST, {
                        cause: console_1.error
                    });
                }
                else {
                    try {
                        console.log(body);
                        const hashedValue = await bcrypt.hash(targetUser.password, 10);
                        const compare = await bcrypt.compare(body.password, targetUser.password);
                        if (compare) {
                            const token = jwt.sign({ username: body.username }, "abc", { expiresIn: '1 hr' });
                            response.send({ token: token, message: 'logged in successfully', result: 5, user: targetUser }).status(200);
                        }
                        else {
                            response.send({ message: "Password Incorrect", result: 4 }).status(common_1.HttpStatus.NOT_ACCEPTABLE);
                        }
                    }
                    catch (err) {
                        response.send({ error: 'Cannot encrypt' });
                    }
                }
            }
        }
        catch (err) {
            console.log(err.response);
            response.send({ message: "Username does not exist", result: 2 });
        }
    }
    async registerNewUser(body, response) {
        delete body['username'];
        let flag = true;
        let keys = Object.keys(body);
        for (let index = 0; index < keys.length; index++) {
            let key = keys[index];
            if (key == 'name') {
                if (body[key].firstname == "") {
                    console.log("firstname");
                    response.send({ message: "Some fields has errors" }).status(400);
                    flag = false;
                    break;
                }
                else if (body[key].lastname == "") {
                    console.log("lastname");
                    response.send({ message: "Some fields has errors" }).status(400);
                    flag = false;
                    break;
                }
            }
            else if (key == 'address') {
                if (body[key].street == "") {
                    console.log("street");
                    response.send({ message: "Some fields has errors" }).status(400);
                    flag = false;
                    break;
                }
                else if (body[key].number == "") {
                    console.log("number");
                    response.send({ message: "Some fields has errors" }).status(400);
                    flag = false;
                    break;
                }
                else if (body[key].zip == "") {
                    console.log("zip");
                    response.send({ message: "Some fields has errors" }).status(400);
                    flag = false;
                    break;
                }
            }
            else {
                if (body[key] == "") {
                    console.log(key);
                    response.send({ message: `Some fields has errors` }).status(400);
                    flag = false;
                    break;
                }
            }
        }
        if (flag) {
            delete body['confirmPassword'];
            const hashedValue = await bcrypt.hash(body.password, 10);
            body['password'] = hashedValue;
            body['_id'] = body.email;
            delete body['email'];
            console.log(body);
            const res = await this.userService.registerNewUser(body);
            if (res.acknowledged) {
                const mailSent = this.userService.sendConfirmationMail(body);
                console.log("In Controller Mail Sent " + mailSent);
                response.send({ message: 'User Successfully registered' }).status(200);
            }
            else {
                response.send({ message: 'Username already exist' }).status(400);
            }
            console.log(res);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)("/getAllUsers"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "doLogin", null);
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerNewUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, auth_service_1.AuthService])
], UserController);
//# sourceMappingURL=user.controller.js.map