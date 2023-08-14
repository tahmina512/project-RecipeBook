import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async addUserInfo(email: string, password: string) {
    const userId = Math.random().toString();
    const newUser = new this.userModel({
      email,
      password,
    });
    const result = await newUser.save();
    // return prodId;
    console.log(result);
    return userId;
  }
  // getProducts() {
  //   return [...this.products];
  // }
  // getSingleProduct(productId: string) {
  //   const product = this.findProduct(productId)[0];
  //   return { ...product };
  // }
  // updateProduct(productId: string, title: string, desc: string, price: number) {
  //   const [product, index] = this.findProduct(productId);
  //   const updatedProduct = { ...product };
  //   if (title) {
  //     updatedProduct.title = title;
  //   }
  //   if (desc) {
  //     updatedProduct.desc = desc;
  //   }
  //   if (price) {
  //     updatedProduct.price = price;
  //   }
  //   this.products[index] = updatedProduct;
  // }
  // private findProduct(id: string): [Product, number] {
  //   const productIndex = this.products.findIndex((prod) => prod.id === id);
  //   const product = this.products[productIndex];
  //   if (!product) {
  //     throw new NotFoundException('could not find product');
  //   }
  //   return [product, productIndex];
  // }
  // deleteProduct(prodId: string) {
  //   const index = this.findProduct(prodId)[1];
  //   this.products.splice(index, 1);
  // }
}
