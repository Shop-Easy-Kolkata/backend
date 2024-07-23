import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { error } from 'console';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) { }
    @Get("/getAllUsers")
    async getUsers(@Res() response: Response, @Req() req: Request) {
        response.send(await this.userService.getUsers());
    }
    @Post('/login')
    async doLogin(@Body() body, @Res() response:Response) {
        try {
            console.log(body);
            if (body.username == "") {
                console.log("Inside username null");
                response.send({ message: 'Username is required', result: 1 })
            } else if (body.password == "") {
                console.log("Inside password null");
                response.send({ message: 'Password is required', result: 3 })
            } else {
            const targetUser = await this.userService.getUserByUsername(body.username);
            console.log(targetUser);
            if (targetUser == null) {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Username does not exist',
                    
                }, HttpStatus.BAD_REQUEST, {
                    cause: error
                });
            } else {
                try {
                    console.log(body);
                    
                        const hashedValue = await bcrypt.hash(targetUser.password, 10)
                        const compare = await bcrypt.compare(body.password, targetUser.password);
                        if (compare) {
                            const token = jwt.sign({ username: body.username }, "abc", { expiresIn: '1 hr' })
                            response.send({ token: token, message: 'logged in successfully', result: 5 ,user:targetUser}).status(200)
                            // response.send({ message: "User successfully logged in" }).status(HttpStatus.ACCEPTED)

                        } else {
                            response.send({ message: "Password Incorrect", result: 4 }).status(HttpStatus.NOT_ACCEPTABLE)
                        }
                    
                } catch (err) {
                    response.send({ error: 'Cannot encrypt' })
                }
            }
        }
        } catch (err) {
            console.log(err.response);
            response.send({message:"Username does not exist",result:2});
        }


    }
    @Post('/register')
    async registerNewUser(@Body() body,@Res() response:Response){
        delete body['username'];
        let flag = true;
        let keys = Object.keys(body);
        for (let index = 0; index < keys.length; index++) {
            let key = keys[index];
            if(key=='name'){
                if(body[key].firstname==""){
                    console.log("firstname");
                    response.send({message:"Some fields has errors"}).status(400);
                    flag = false;
                    break;
                }else if(body[key].lastname==""){
                    console.log("lastname");
                    response.send({message:"Some fields has errors"}).status(400);
                    flag = false;
                    break;
                }
            }else if(key=='address'){
                if(body[key].street==""){
                    console.log("street");
                    response.send({message:"Some fields has errors"}).status(400);
                    flag = false;
                    break;
                }else if(body[key].number==""){
                    console.log("number");
                    response.send({message:"Some fields has errors"}).status(400);
                    flag = false;
                    break;
                }else if(body[key].zip==""){
                    console.log("zip");
                    response.send({message:"Some fields has errors"}).status(400);
                    flag = false;
                    break;
                }
            }else{
                if(body[key]==""){
                    console.log(key);
                    response.send({message:`Some fields has errors`}).status(400);
                    flag = false;
                    break;
                }
               

            }
        }
        // .map((key)=>{
        //     if(key=='name'){
        //         if(body[key].firstname=""){
        //             response.send({message:"Some fields has errors"}).status(400);
        //             flag = false;
        //         }else{
        //             response.send({message:"Some fields has errors"}).status(400);
        //             flag = false;
        //         }
        //     }else if(key=='address'){
        //         if(body[key].street=""){
        //             response.send({message:"Some fields has errors"}).status(400);
        //             flag = false;
        //         }else if(body[key].number=""){
        //             response.send({message:"Some fields has errors"}).status(400);
        //             flag = false;
        //         }else{
        //             response.send({message:"Some fields has errors"}).status(400);
        //             flag = false;
        //         }
        //     }else{
        //         response.send({message:`Some fields has errors`}).status(400);
        //     }
        // })
        // console.log(body);
        if(flag){
            delete body['confirmPassword'];
        // console.log(body);
        const hashedValue = await bcrypt.hash(body.password, 10)
        body['password'] = hashedValue;
        body['_id'] = body.email;
        
        delete body['email'];
        console.log(body);
        const res = await this.userService.registerNewUser(body);
        if(res.acknowledged){
            const mailSent = this.userService.sendConfirmationMail(body);
            console.log("In Controller Mail Sent "+mailSent)
            response.send({message:'User Successfully registered'}).status(200);
        }else{
            response.send({message:'Username already exist'}).status(400);
        }
        console.log(res);
        }
        
    }
}
