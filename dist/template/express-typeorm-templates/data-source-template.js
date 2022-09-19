"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
function datasourceTemplate(tablesNames) {
    let template = `
import { DataSource,Repository } from "typeorm";`;
    tablesNames.forEach((element) => {
        template += `import {${element.pascalCaseName}} from './${config_1.entityPath}${element.pascalCaseName}'
    `;
    });
    template += `const appDataSource = new DataSource({
    type: "mysql",
    host: "${config_1.host}",
    port: ${config_1.dbPortNumber},
    username: "${config_1.userName}",
    password: "${config_1.password}",
    database: "${config_1.dataBase}",
    entities: ['${config_1.entityPath}/*.*'],
 });
 `;
    tablesNames.forEach((element) => {
        template += `const ${element.pascalCaseName}Repository: Repository<${element.pascalCaseName}>=appDataSource.getRepository(${element.pascalCaseName});
  `;
    });
    template += `
 export {${tablesNames.map((element) => { return element.pascalCaseName + 'Repository'; })}}
 export default appDataSource
 `;
    return template;
}
exports.default = datasourceTemplate;
