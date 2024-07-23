import * as mongodb from 'mongodb';
export declare class OrdersService {
    addNewOrder(body: any): Promise<mongodb.InsertOneResult<mongodb.BSON.Document>>;
    getOrderById(id: any): Promise<any>;
    updateDeliveryDetails(): Promise<void>;
}
