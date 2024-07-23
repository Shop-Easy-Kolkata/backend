import { OrdersService } from './orders.service';
import { Response } from 'express';
export declare class OrdersController {
    private readonly orderService;
    constructor(orderService: OrdersService);
    getOrderById(id: any, response: Response): Promise<void>;
}
