"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
function moduleTemplate(props) {
  let tableName = props.tableName;
  let camelCaseName = props.camelCaseName;
  let template = `import { Module } from '@nestjs/common';
import { ${tableName}Service } from './${camelCaseName}.service';
import { ${tableName}Controller } from './${camelCaseName}.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${tableName} } from '${config_1.entityPath}${tableName}';
@Module({
  imports: [TypeOrmModule.forFeature([${tableName}])],
  controllers: [${tableName}Controller],
  providers: [${tableName}Service]
})
export class ${tableName}Module {}
`;
  return template;
}
exports.default = moduleTemplate;
