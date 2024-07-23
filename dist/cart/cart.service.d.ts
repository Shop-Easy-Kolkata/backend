import * as mongodb from 'mongodb';
export declare class CartService {
    addToCart(userId: any, product: any): Promise<mongodb.UpdateResult<mongodb.BSON.Document>>;
    getProductsInCart(userId: any): Promise<any>;
    updateQuantity(userId: any, productId: any, quantity: any): Promise<mongodb.UpdateResult<mongodb.BSON.Document>>;
    deleteEntry(userId: any, productId: any): Promise<mongodb.UpdateResult<mongodb.BSON.Document>>;
    clearAllCart(userId: any): Promise<mongodb.UpdateResult<mongodb.BSON.Document>>;
    sendConfirmationMail(body: any): Promise<void>;
}
