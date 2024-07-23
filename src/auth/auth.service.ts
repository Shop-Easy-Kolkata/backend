import { Injectable } from '@nestjs/common';
const jwt = require('jsonwebtoken')
@Injectable()
export class AuthService {
    autheniticateToken(req, res) {
        let flag=false;
        console.log(req.headers.authorization.split(' ')[1]);
        const token = req.headers.authorization.split(' ')[1]
        console.log("Line 9: "+token)

        if (!token){
            // res.send("token is not given").status(400)
            flag= false;
        }

        jwt.verify(token, "abc", (err) => {
            if (err){
                // res.send("the shared token is wrong").status(400)
            flag= false;
}
            else{
                console.log("Inside else")
                flag= true;
            }
            // next()
        })
return flag;
    }
}
