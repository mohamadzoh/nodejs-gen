import { entityPath } from "../../config";
function moduleTemplate(props: { tableName: any; camelCaseName: any }) {
  let tableName = props.tableName;
  let camelCaseName = props.camelCaseName;
  let template = `import { Module } from '@nestjs/common';
import { ${tableName}Service } from './${camelCaseName}.service';
import { ${tableName}Controller } from './${camelCaseName}.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${tableName} } from '${entityPath}${tableName}';
@Module({
  imports: [TypeOrmModule.forFeature([${tableName}])],
  controllers: [${tableName}Controller],
  providers: [${tableName}Service]
})
export class ${tableName}Module {}
`;
  return template;
}
export default moduleTemplate;
