import { CartService } from './cart.service';
import { Response } from 'express';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(body: any, response: Response): Promise<void>;
    getCart(id: any, response: Response): Promise<void>;
    updateQuantity(id: any, response: Response, body: any): Promise<void>;
    deleteFromCart(id: any, response: Response, body: any): Promise<void>;
    clearFromCart(id: any, response: Response, body: any): Promise<void>;
}
