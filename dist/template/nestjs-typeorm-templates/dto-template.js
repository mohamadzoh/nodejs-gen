"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function columnType(nullable, dataType) {
    let typeDeclaration = "@IsString()";
    let type = "string";
    let optional = "";
    if (nullable == "YES") {
        optional = "@IsOptional()";
    }
    if (dataType == "int" ||
        dataType == "tinyint" ||
        dataType == "double" ||
        dataType == "decimal" ||
        dataType == "smallint" ||
        dataType == "float") {
        typeDeclaration = "@IsNumberString()";
        type = "number;";
    }
    return { typeDeclaration, type, optional };
}
function dtoTemplate(props) {
    let tableName = props.pascalCaseTableName;
    let tableData = props.tableData;
    let template = `import { IsString, IsNumberString, IsOptional } from "class-validator";
    export class Create${tableName}Dto {`;
    for (let i = 1; i < tableData.length; i++) {
        let camelCaseName = tableData[i].columnName;
        const { typeDeclaration, type, optional } = columnType(tableData[i].nullable, tableData[i].dataType);
        template += `${optional}
${typeDeclaration}
${camelCaseName}:${type}
`;
    }
    template += `}`;
    template += ` 
export class Update${tableName}Dto {`;
    for (let i = 0; i < tableData.length; i++) {
        let camelCaseName = tableData[i].columnName;
        const { typeDeclaration, type } = columnType(tableData[i].nullable, tableData[i].dataType);
        if (i > 0) {
            template += `@IsOptional()`;
        }
        template += `
${typeDeclaration}
${camelCaseName}:${type}
`;
    }
    template += `
}`;
    return template;
}
exports.default = dtoTemplate;
