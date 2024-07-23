import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { AuthService } from './auth/auth.service';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { CartService } from './cart/cart.service';
import { CartController } from './cart/cart.controller';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, ProductController, CartController, OrdersController],
  providers: [AppService, UserService,AuthService, ProductService, CartService, OrdersService],
})
export class AppModule {}
