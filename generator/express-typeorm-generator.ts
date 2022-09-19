import fs from "fs-extra";
import appTemplate from "../template/express-typeorm-templates/app-template";
import dataSource from "../template/express-typeorm-templates/data-source-template";
import moduleTemplate from "../template/express-typeorm-templates/module-template";
import multerTemplate from "../template/express-typeorm-templates/multer-template";
import routerTemplate from "../template/express-typeorm-templates/router-template";
import uploadMiddlewareTemplate from "../template/express-typeorm-templates/upload-middleware-template";

async function expressjsTypeormGenerator(tableData: {
  [x: string]: {
    tableData: {};
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
  await fs.ensureDir("./output/expressjs-typeorm/");
  await fs.ensureDir("./output/expressjs-typeorm/router");
  await fs.ensureDir("./output/expressjs-typeorm/module");
  await fs.ensureFile("./output/expressjs-typeorm/file-middleware.ts");
  await fs.writeFile(
    "./output/expressjs-typeorm/file-middleware.ts",
    uploadMiddlewareTemplate()
  );
  await fs.ensureFile("./output/expressjs-typeorm/router-upload.ts");
  await fs.writeFile(
    "./output/expressjs-typeorm/router-upload.ts",
    multerTemplate()
  );
  let tablesNames: {
    pascalCaseName: string;
    kebabCaseName: string;
    camelCaseName: string;
    
  }[] = [];
  const keys: string[] = Object.keys(tableData);
  for await (let tableName of keys) {
    let element = tableData[tableName];
    tablesNames.push({
      pascalCaseName: element.pascalCaseTableName,
      kebabCaseName: element.kabebCaseTableName,
      camelCaseName: element.camelCaseTableName,
    });
    await fs.ensureFile(
      `./output/expressjs-typeorm/module/${element.kabebCaseTableName}.ts`
    );
    await fs.writeFile(
      `./output/expressjs-typeorm/module/${element.kabebCaseTableName}.ts`,
      moduleTemplate({
        relationsName: element.relationsName,
        pascalCaseTableName: element.pascalCaseTableName,
        camelCaseName: element.camelCaseTableName,
        tableData: element.tableData,
        primaryKeys:element.primaryKeys
      })
    );
    await fs.ensureFile(
      `./output/expressjs-typeorm/router/${element.kabebCaseTableName}.ts`
    );
    await fs.writeFile(
      `./output/expressjs-typeorm/router/${element.kabebCaseTableName}.ts`,
      routerTemplate(element.camelCaseTableName, element.kabebCaseTableName,element.primaryKeys)
    );
  }

  await fs.ensureFile(`./output/expressjs-typeorm/app.ts`);
  await fs.writeFile(
    `./output/expressjs-typeorm/app.ts`,
    appTemplate(tablesNames)
  );
  await fs.ensureFile(`./output/expressjs-typeorm/data-source.ts`);
  await fs.writeFile(
    `./output/expressjs-typeorm/data-source.ts`,
    dataSource(tablesNames)
  );
}

export default expressjsTypeormGenerator;
