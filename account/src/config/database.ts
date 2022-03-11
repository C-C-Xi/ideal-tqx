import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// const database: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: 'nest',
//   entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')], //自动检测包含entity的文件，并引入
//   synchronize: true,
//   // logging: false, 是否打印记录
// };
//
// export default database
