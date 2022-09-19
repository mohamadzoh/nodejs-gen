import { DataSource } from "typeorm";
import {pascalCase,camelCase,kebabCase} from '../multi-case'
import {host,userName,password, dataBase,entityPath,dbPortNumber} from '../config'

async function entityDataCollector(){
    const dataSource = new DataSource({
        type: "mysql",
        host: host,
        port: dbPortNumber,
        username: userName,
        password: password,
        database: dataBase,
        entities: [`${entityPath}/*.*`],
      });
      let tableData: { [index: string]: any } = {};
      await dataSource.initialize();
      dataSource.entityMetadatas.forEach((table) => {
        let tmptableData: { [index: string]: any } = {};
        tmptableData = table.ownColumns.map((element) => {
          let obj: {
            columnName: string;
            originalColumnName: string;
            pascalCaseName:string;
            camelCaseName:string;
            kebabCaseName:string
            dataType: string;
            nullable: string;
          } = {
            columnName: "",
            originalColumnName: "",
            dataType: "",
            nullable: "",
            pascalCaseName: "",
            camelCaseName: "",
            kebabCaseName: ""
          };
          obj.columnName = element.propertyName;
          obj.pascalCaseName = pascalCase(element.propertyName);
          obj.kebabCaseName = kebabCase(element.propertyName);
          obj.camelCaseName =camelCase( element.propertyName);
          obj.originalColumnName = element.givenDatabaseName!;
          if (element.isNullable == true) {
            obj.nullable = "YES";
          } else {
            obj.nullable = "NO";
          }
          obj.dataType = element.type.toString();
          return obj;
        });
     let relationsName:string[]=[]
     table.relations.forEach((element)=>{
      relationsName.push(element.propertyName)
     })
            tableData[pascalCase(table.givenTableName!)] = {
            originalTableName: table.givenTableName,
            camelCaseTableName: camelCase(table.givenTableName),
            kabebCaseTableName: kebabCase(table.givenTableName),
            pascalCaseTableName: pascalCase(table.givenTableName),
            tableData: tmptableData,
            relationsName: relationsName,
          };
      });
    return  tableData;
}
export default entityDataCollector