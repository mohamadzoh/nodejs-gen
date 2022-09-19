import { pascalCase, camelCase,kebabCase } from "../multi-case";
import { host, userName, password, dataBase } from "../config";
async function mysqlDataCollector() {
  const mysql = require("mysql2/promise");

  let tableData: {
    [index: string]: {
      tableData: any;
      originalTableName: string;
      primaryKeys:{columnName:string,
      type:string
      }[]
      relationsName: string[];
      camelCaseTableName:string;
      kabebCaseTableName:string;
      pascalCaseTableName:string;
    };
  } = {};
  const connection = await mysql.createConnection({
    host: host,
    user: userName,
    password: password,
  });
  let result = await connection.query(
    `select COLUMN_KEY as columnKey, column_name as columnName,table_name as tableName ,DATA_TYPE as dataType,IS_NULLABLE as nullable from information_schema.columns where table_schema = '${dataBase}' order by table_name,ordinal_position`
  );
  let relationResult = await connection.query(
    "SELECT `TABLE_NAME` as tableName, `COLUMN_NAME`  as columnName, `REFERENCED_TABLE_NAME` as referencedTable, `REFERENCED_COLUMN_NAME` as referencedColumn FROM `information_schema`.`KEY_COLUMN_USAGE` WHERE `CONSTRAINT_SCHEMA` = '" +
    dataBase +
    "' AND `REFERENCED_TABLE_SCHEMA` IS NOT NULL AND `REFERENCED_TABLE_NAME` IS NOT NULL AND `REFERENCED_COLUMN_NAME` IS NOT NULL"
  );
  result[0].forEach(
    (element: {
      tableName: string;
      columnName: string;
      originalColumnName: string;
      dataType: string;
      nullable: string;
      columnKey:string
    }) => {
      let pascalCaseName = pascalCase(element.tableName);
      if (
        tableData[pascalCaseName] &&
        tableData[pascalCaseName].tableData.length > 0
      ) {
        tableData[pascalCaseName].tableData.push({
          columnName: camelCase(element.columnName),
          originalColumnName: element.columnName,
          dataType: element.dataType,
          nullable: element.nullable,
          pascalCaseName :pascalCase(element.columnName),
          kebabCaseName : kebabCase(element.columnName),
          camelCaseName :camelCase( element.columnName)
        });
      } else {
        tableData[pascalCaseName] = {
          tableData: [],
          originalTableName: element.tableName,
          camelCaseTableName: camelCase(element.tableName),
          kabebCaseTableName: kebabCase(element.tableName),
          pascalCaseTableName: pascalCase(element.tableName),
          relationsName: [],
          primaryKeys:[]
        };
        tableData[pascalCaseName].tableData = [
          {
            columnName: camelCase(element.columnName),
            originalColumnName: element.columnName,
            dataType: element.dataType,
            nullable: element.nullable,
          },
        ];
      }
if(element.columnKey=='PRI'){
  tableData[pascalCaseName].primaryKeys.push({columnName:camelCase(element.columnName),type:element.dataType})

}
    }
  );
  Object.keys(tableData).forEach((key)=>{
    
    let element=tableData[key].originalTableName;
    let tableRelations = relationResult[0]
    .filter((item: { tableName: string }) => {
      return item.tableName == element;
    })
    .map(
      (item: {
        columnName: string;
        referencedTable: any;
        referencedColumn: string;
      }) => {
        if (item.columnName == item.referencedTable) {
          return camelCase(item.columnName + "2");
        } else {
          let realationName: string = item.columnName;
          if (item.columnName.endsWith(item.referencedColumn)) {
            realationName = realationName.replace(
              new RegExp(item.referencedColumn + "$"),
              ""
            );
          }
          return camelCase(realationName).trim();
        }
      }
    );
  let referencedRelation = relationResult[0]
    .filter((item: {
      referencedTable: string; tableName: string
    }) => {
      return item.referencedTable == element;
    })
    .map(
      (item: {
        [x: string]: string;
        columnName: string;
        referencedTable: any;
        referencedColumn: string;
        tableName:string;
      }) => {
        if(item.tableName[item.tableName.length-1]=='s'){
          return camelCase(item.tableName+'es')
        }
        return camelCase(item.tableName + "s")
      }
    );
tableData[key].relationsName=[...tableRelations,...referencedRelation]
  })

  return tableData;
}

export default mysqlDataCollector;
