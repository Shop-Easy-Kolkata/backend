import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { Request, Response } from 'express';

@Controller('api')
export class ProductController {
    constructor(private readonly productService:ProductService){}
    @Get("/products")
    async getAllProducts(@Res() res:Response,@Req() req:Request){
        res.send(await this.productService.getAllProducts())
    }
    @Get("/products/:id")
        async getProductById(@Res() res:Response,@Req() req:Request,@Param('id') id:string){
            res.send(await this.productService.getProductById(id))
    }
    @Get("/categories")
    async getCategories(@Res() res:Response,@Req() req:Request){
        res.send(await this.productService.getCategories())
    }
    @Get("/brands")
    async getBrands(@Res() res:Response,@Req() req:Request){
        res.send(await this.productService.getBrands())
    }
}
