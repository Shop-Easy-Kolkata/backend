import { Controller, Get, Param, Res } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Response } from 'express';

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService:OrdersService){}

    @Get('/getOrder/:id')
    async getOrderById(@Param('id') id,@Res() response:Response){
        const orders = await this.orderService.getOrderById(parseInt(id));
        response.send(orders).status(200);
    }
}
