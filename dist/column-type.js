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
        type = "number";
    }
    return { typeDeclaration, type, optional };
}
exports.default = columnType;
