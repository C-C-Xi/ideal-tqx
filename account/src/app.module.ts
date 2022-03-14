import { resolve, join } from 'path';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { ConfigModule as envModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './modules/xxx/xxx.module';
// import { GraphModule } from './modules/graph/graph.module';
import { UsersModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

import { RoleAuthGuard } from './modules/auth/auth.guard';
import {MongooseModule} from "@nestjs/mongoose";
import {ShopModule} from "./modules/shop/shop.module";
import {CommonModule} from "./modules/common/common.module";


@Module({
  imports: [
    envModule.forRoot(),
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    GraphQLModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('graphQL'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": process.env.DB_HOST,
      "port": Number(process.env.DB_PORT),
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_DATABASE,
      "entities": ["dist/**/backend/*.entity{.ts,.js}"],
      "synchronize": true
    }),
    TypeOrmModule.forRoot({
      "type": "mysql",
      "name": 'tapout_pro',
      "host": process.env.DB_HOST,
      "port": Number(process.env.DB_PORT),
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": 'tapout_pro',
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": false
    }),
    MongooseModule.forRoot(process.env.MDB_TOGame, {
      dbName: "TOGame",
      connectionName: 'TOGame',
      useNewUrlParser: true
    }),
    MongooseModule.forRoot(process.env.MDB_TOLog, {
      connectionName: 'TOLog',
      useNewUrlParser: true
    }),
    MongooseModule.forRoot(process.env.MDB_Plane_TOLog, {
      connectionName: 'Plane_TOLog',
      useNewUrlParser: true
    }),

    MongooseModule.forRoot(process.env.MDB_Backend, {
      connectionName: 'Backend',
      useNewUrlParser: true
    }),
    MongooseModule.forRoot(process.env.MDB_TOAD, {
      connectionName: 'TOAD',
      useNewUrlParser: true
    }),
    MongooseModule.forRoot(process.env.MDB_Statistics, {
      connectionName: 'Statistics',
      useNewUrlParser: true
    }),
    MongooseModule.forRoot(process.env.MDB_CommonResource, {
      connectionName: 'CommonResource',
      useNewUrlParser: true
    }),

    // 路由模块
    AuthModule,
    XxxModule,
    UsersModule,
    ShopModule,
      CommonModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 使用全局 JWT 守卫 ，默认开启，关闭时使用装饰器: @noAuth()
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleAuthGuard,
    // },
  ],
})
export class AppModule {}


