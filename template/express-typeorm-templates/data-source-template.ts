import {host,userName,password,dataBase,entityPath,dbPortNumber} from '../../config'
function datasourceTemplate(tablesNames:any[]){
let template=`
import { DataSource,Repository } from "typeorm";`
tablesNames.forEach((element:{pascalCaseName:String})=>{
    template+=`import {${element.pascalCaseName}} from './${entityPath}${element.pascalCaseName}'
    `
})
 template+=`const appDataSource = new DataSource({
    type: "mysql",
    host: "${host}",
    port: ${dbPortNumber},
    username: "${userName}",
    password: "${password}",
    database: "${dataBase}",
    entities: ['${entityPath}/*.*'],
 });
 `
tablesNames.forEach((element:{pascalCaseName:string})=>{
  template+=`const ${element.pascalCaseName}Repository: Repository<${element.pascalCaseName}>=appDataSource.getRepository(${element.pascalCaseName});
  `

});

 template+=`
 export {${tablesNames.map((element:{pascalCaseName:string})=>{return element.pascalCaseName+'Repository'})}}
 export default appDataSource
 `
    return  template;

}

export default datasourceTemplate;