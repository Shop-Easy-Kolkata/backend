import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { Response } from 'express';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService : CartService){}
    @Post('/addToCart')
    async addToCart(@Body() body,@Res() response:Response){
        console.log(body);
        const res = await this.cartService.addToCart(body.userId,body.product);
        response.send(res).status(200);
    }
    @Get('/getCart/:id')
    async getCart(@Param('id') id,@Res() response:Response){
        const res = await this.cartService.getProductsInCart(id);
        console.log("In Controller "+res)
        response.send(res).status(200);
    }
    @Post('/getCart/:id')
    async updateQuantity(@Param('id') id,@Res() response:Response,@Body() body){
        const res = await this.cartService.updateQuantity(parseInt(id),body.productId,body.quantity)
        response.send(res).status(200);
    }
    @Post('deleteFromCart/:id')
    async deleteFromCart(@Param('id') id,@Res() response:Response,@Body() body){
        const res = await this.cartService.deleteEntry(parseInt(id),body.productId)
        response.send(res).status(200);
    }
    @Post('/clearFromCart/:id')
    async clearFromCart(@Param('id') id,@Res() response:Response,@Body() body){
        const res = await this.cartService.clearAllCart(parseInt(id));
        const prod = await this.cartService.getProductsInCart(id);
        // const mailSent = this.cartService.sendConfirmationMail({id:id,prod:prod})
        response.send(res).status(200);
    }
}
