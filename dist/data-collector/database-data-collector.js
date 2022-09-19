"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multi_case_1 = require("../multi-case");
const config_1 = require("../config");
async function mysqlDataCollector() {
    const mysql = require("mysql2/promise");
    let tableData = {};
    const connection = await mysql.createConnection({
        host: config_1.host,
        user: config_1.userName,
        password: config_1.password,
    });
    let result = await connection.query(`select COLUMN_KEY as columnKey, column_name as columnName,table_name as tableName ,DATA_TYPE as dataType,IS_NULLABLE as nullable from information_schema.columns where table_schema = '${config_1.dataBase}' order by table_name,ordinal_position`);
    let relationResult = await connection.query("SELECT `TABLE_NAME` as tableName, `COLUMN_NAME`  as columnName, `REFERENCED_TABLE_NAME` as referencedTable, `REFERENCED_COLUMN_NAME` as referencedColumn FROM `information_schema`.`KEY_COLUMN_USAGE` WHERE `CONSTRAINT_SCHEMA` = '" +
        config_1.dataBase +
        "' AND `REFERENCED_TABLE_SCHEMA` IS NOT NULL AND `REFERENCED_TABLE_NAME` IS NOT NULL AND `REFERENCED_COLUMN_NAME` IS NOT NULL");
    result[0].forEach((element) => {
        let pascalCaseName = (0, multi_case_1.pascalCase)(element.tableName);
        if (tableData[pascalCaseName] &&
            tableData[pascalCaseName].tableData.length > 0) {
            tableData[pascalCaseName].tableData.push({
                columnName: (0, multi_case_1.camelCase)(element.columnName),
                originalColumnName: element.columnName,
                dataType: element.dataType,
                nullable: element.nullable,
                pascalCaseName: (0, multi_case_1.pascalCase)(element.columnName),
                kebabCaseName: (0, multi_case_1.kebabCase)(element.columnName),
                camelCaseName: (0, multi_case_1.camelCase)(element.columnName)
            });
        }
        else {
            tableData[pascalCaseName] = {
                tableData: [],
                originalTableName: element.tableName,
                camelCaseTableName: (0, multi_case_1.camelCase)(element.tableName),
                kabebCaseTableName: (0, multi_case_1.kebabCase)(element.tableName),
                pascalCaseTableName: (0, multi_case_1.pascalCase)(element.tableName),
                relationsName: [],
                primaryKeys: []
            };
            tableData[pascalCaseName].tableData = [
                {
                    columnName: (0, multi_case_1.camelCase)(element.columnName),
                    originalColumnName: element.columnName,
                    dataType: element.dataType,
                    nullable: element.nullable,
                },
            ];
        }
        if (element.columnKey == 'PRI') {
            tableData[pascalCaseName].primaryKeys.push({ columnName: (0, multi_case_1.camelCase)(element.columnName), type: element.dataType });
        }
    });
    Object.keys(tableData).forEach((key) => {
        let element = tableData[key].originalTableName;
        let tableRelations = relationResult[0]
            .filter((item) => {
            return item.tableName == element;
        })
            .map((item) => {
            if (item.columnName == item.referencedTable) {
                return (0, multi_case_1.camelCase)(item.columnName + "2");
            }
            else {
                let realationName = item.columnName;
                if (item.columnName.endsWith(item.referencedColumn)) {
                    realationName = realationName.replace(new RegExp(item.referencedColumn + "$"), "");
                }
                return (0, multi_case_1.camelCase)(realationName).trim();
            }
        });
        let referencedRelation = relationResult[0]
            .filter((item) => {
            return item.referencedTable == element;
        })
            .map((item) => {
            if (item.tableName[item.tableName.length - 1] == 's') {
                return (0, multi_case_1.camelCase)(item.tableName + 'es');
            }
            return (0, multi_case_1.camelCase)(item.tableName + "s");
        });
        tableData[key].relationsName = [...tableRelations, ...referencedRelation];
    });
    return tableData;
}
exports.default = mysqlDataCollector;
