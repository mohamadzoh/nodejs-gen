"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const column_type_1 = __importDefault(require("../../column-type"));
function dtoTemplate(props) {
    let tableName = props.pascalCaseTableName;
    let tableData = props.tableData;
    let template = `import { IsString, IsNumberString, IsOptional } from "class-validator";
    export class Create${tableName}Dto {`;
    for (let i = 1; i < tableData.length; i++) {
        let camelCaseName = tableData[i].columnName;
        const { typeDeclaration, type, optional } = (0, column_type_1.default)(tableData[i].nullable, tableData[i].dataType);
        template += `${optional}
${typeDeclaration}
${camelCaseName}:${type};
`;
    }
    template += `}`;
    template += ` 
export class Update${tableName}Dto {`;
    for (let i = 0; i < tableData.length; i++) {
        let camelCaseName = tableData[i].columnName;
        const { typeDeclaration, type } = (0, column_type_1.default)(tableData[i].nullable, tableData[i].dataType);
        if (i > 0) {
            template += `@IsOptional()`;
        }
        template += `
${typeDeclaration}
${camelCaseName}:${type};
`;
    }
    template += `
}`;
    return template;
}
exports.default = dtoTemplate;
