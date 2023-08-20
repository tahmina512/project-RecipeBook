import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './db/users/user.module';
import { RecipeModule } from './db/recipes/recipes.module';
// import { AuthModule } from './db/users/auth.module';

@Module({
  imports: [
    // AuthModule,
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/recipeBook'),
    MongooseModule.forRoot(
      'mongodb+srv://tahminatisha:RZOcFHIo64O8qgUp@cluster0.ma5jfjc.mongodb.net/recipeBook',
    ),

    UserModule,
    RecipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
