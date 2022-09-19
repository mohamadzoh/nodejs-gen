"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const multi_case_1 = require("../multi-case");
const config_1 = require("../config");
async function entityDataCollector() {
    const dataSource = new typeorm_1.DataSource({
        type: "mysql",
        host: config_1.host,
        port: config_1.dbPortNumber,
        username: config_1.userName,
        password: config_1.password,
        database: config_1.dataBase,
        entities: [`${config_1.entityPath}/*.*`],
    });
    let tableData = {};
    await dataSource.initialize();
    dataSource.entityMetadatas.forEach((table) => {
        const primaryKeys = table.primaryColumns.map((item) => {
            return { columnName: item.propertyName, type: item.type };
        });
        let tmptableData = {};
        tmptableData = table.ownColumns.map((element) => {
            let obj = {
                columnName: "",
                originalColumnName: "",
                dataType: "",
                nullable: "",
                pascalCaseName: "",
                camelCaseName: "",
                kebabCaseName: ""
            };
            obj.columnName = element.propertyName;
            obj.pascalCaseName = (0, multi_case_1.pascalCase)(element.propertyName);
            obj.kebabCaseName = (0, multi_case_1.kebabCase)(element.propertyName);
            obj.camelCaseName = (0, multi_case_1.camelCase)(element.propertyName);
            obj.originalColumnName = element.givenDatabaseName;
            if (element.isNullable == true) {
                obj.nullable = "YES";
            }
            else {
                obj.nullable = "NO";
            }
            obj.dataType = element.type.toString();
            return obj;
        });
        let relationsName = [];
        table.relations.forEach((element) => {
            relationsName.push(element.propertyName);
        });
        tableData[(0, multi_case_1.pascalCase)(table.givenTableName)] = {
            originalTableName: table.givenTableName,
            camelCaseTableName: (0, multi_case_1.camelCase)(table.givenTableName),
            kabebCaseTableName: (0, multi_case_1.kebabCase)(table.givenTableName),
            pascalCaseTableName: (0, multi_case_1.pascalCase)(table.givenTableName),
            tableData: tmptableData,
            relationsName: relationsName,
            primaryKeys: primaryKeys
        };
    });
    return tableData;
}
exports.default = entityDataCollector;
