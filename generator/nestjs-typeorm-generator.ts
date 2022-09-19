import fs from "fs-extra";
import moduleTemplate from "../template/nestjs-typeorm-templates/module-template";
import controllerTemplate from "../template/nestjs-typeorm-templates/controller-template";
import serviceTemplate from "../template/nestjs-typeorm-templates/service-template";
import dtoTemplate from "../template/nestjs-typeorm-templates/dto-template";
import mainTemplate from "../template/nestjs-typeorm-templates/main-template";
import appModuleTemplate from "../template/nestjs-typeorm-templates/app-module-template";
import uploadMiddlewareTemplate from "../template/nestjs-typeorm-templates/upload-middleware-template";
async function nestjsTypeormGenerator(tableData: {
  [x: string]: {
    tableData: any;
    originalTableName: any;
    relationsName: any;
    camelCaseTableName: string;
    kabebCaseTableName: string;
    pascalCaseTableName: string;
    primaryKeys:{columnName:string,
      type:string
      }[]
  };
}) {
  await fs.ensureDir("./output/");
  await fs.ensureDir("./output/nestjs-typeorm/");
  let tablesNames: string[] = [];
  const keys: string[] = Object.keys(tableData);
  for await (let tableName of keys) {
    tablesNames.push(tableName);
    let camelCaseName = tableData[tableName].camelCaseTableName;
    let kebabName = tableData[tableName].kabebCaseTableName;
    fs.ensureDir("./output/nestjs-typeorm/" + camelCaseName, (err: any) => {
      if (err) return console.log(err);
    });
    await fs.ensureDir("./output/nestjs-typeorm/" + camelCaseName + "/dto");
    await fs.ensureFile(
      "./output/nestjs-typeorm/" +
        camelCaseName +
        "/" +
        camelCaseName +
        ".module.ts"
    );

    await fs.writeFile(
      "./output/nestjs-typeorm/" +
        camelCaseName +
        "/" +
        camelCaseName +
        ".module.ts",
      moduleTemplate({ tableName, camelCaseName })
    );

    await fs.ensureFile(
      "./output/nestjs-typeorm/" +
        camelCaseName +
        "/" +
        camelCaseName +
        ".controller.ts"
    );

    await fs.writeFile(
      "./output/nestjs-typeorm/" +
        camelCaseName +
        "/" +
        camelCaseName +
        ".controller.ts",
      controllerTemplate({
        pascalCaseTableName: tableData[tableName].pascalCaseTableName,
        camelCaseName,
        kebabName,
        primaryKeys:tableData[tableName].primaryKeys
      })
    );

    await fs.ensureFile(
      "./output/nestjs-typeorm/" +
        camelCaseName +
        "/" +
        camelCaseName +
        ".service.ts"
    );
    await fs.writeFile(
      "./output/nestjs-typeorm/" +
        camelCaseName +
        "/" +
        camelCaseName +
        ".service.ts",
      serviceTemplate({
        camelCaseName,
        tableData: tableData[tableName].tableData,
        relationsName: tableData[tableName].relationsName,
        pascalCaseTableName: tableData[tableName].pascalCaseTableName,
        primaryKeys:tableData[tableName].primaryKeys

      })
    );

    await fs.ensureFile(
      "./output/nestjs-typeorm/" +
        camelCaseName +
        "/dto/" +
        camelCaseName +
        ".dto.ts"
    );
    await fs.writeFile(
      "./output/nestjs-typeorm/" +
        camelCaseName +
        "/dto/" +
        camelCaseName +
        ".dto.ts",
      dtoTemplate({
        tableData: tableData[tableName].tableData,
        pascalCaseTableName: tableData[tableName].pascalCaseTableName,
      })
    );

    await fs.ensureFile("./output/nestjs-typeorm/main.ts");
    await fs.writeFile("./output/nestjs-typeorm/main.ts", mainTemplate());
  }
  await fs.ensureFile("./output/nestjs-typeorm/app.module.ts");
  await fs.writeFile(
    "./output/nestjs-typeorm/app.module.ts",
    appModuleTemplate({ tablesNames })
  );
  await fs.ensureFile("./output/nestjs-typeorm/file-middleware.ts");
  await fs.writeFile(
    "./output/nestjs-typeorm/file-middleware.ts",
    uploadMiddlewareTemplate()
  );
}

export default nestjsTypeormGenerator;
