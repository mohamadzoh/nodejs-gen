function columnType(nullable: string, dataType: string) {
    let typeDeclaration = "@IsString()";
    let type = "string";
    let optional = "";
    if (nullable == "YES") {
      optional = "@IsOptional()";
    }
    if (
      dataType == "int" ||
      dataType == "tinyint" ||
      dataType == "double" ||
      dataType == "decimal" ||
      dataType == "smallint" ||
      dataType == "float"
    ) {
      typeDeclaration = "@IsNumberString()";
      type = "number";
    }
    return { typeDeclaration, type, optional};
  }
  export default columnType;