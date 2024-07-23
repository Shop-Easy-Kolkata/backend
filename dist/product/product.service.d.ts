import { Product } from './product';
export declare class ProductService {
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product>;
    getCategories(): Promise<string[]>;
    getBrands(): Promise<string[]>;
}
