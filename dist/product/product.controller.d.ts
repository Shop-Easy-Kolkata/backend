import { ProductService } from './product.service';
import { Request, Response } from 'express';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAllProducts(res: Response, req: Request): Promise<void>;
    getProductById(res: Response, req: Request, id: string): Promise<void>;
    getCategories(res: Response, req: Request): Promise<void>;
    getBrands(res: Response, req: Request): Promise<void>;
}
