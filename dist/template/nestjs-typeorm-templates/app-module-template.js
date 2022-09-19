"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
function appModuleTemplate(props) {
    let template = `
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';`;
    props.tablesNames.forEach((element) => {
        template += `
import { ${element}Module } from './${element}/${element}.module';`;
    });
    template += `
@Module({
    imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: '${config_1.host}',
      port: ${config_1.dbPortNumber},
      username: '${config_1.userName}',
      password: '${config_1.password}',
      database: '${config_1.dataBase}',
      entities: [__dirname + '/../**/entities/*.js'],
    })`;
    props.tablesNames.forEach((element) => {
        template += `,${element}Module`;
    });
    template += `],
    controllers: [],
})
export class AppModule { }`;
    return template;
}
exports.default = appModuleTemplate;
