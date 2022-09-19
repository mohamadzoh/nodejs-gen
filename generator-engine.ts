import nestjsTypeormGenerator from "./generator/nestjs-typeorm-generator";
import databaseDataCollector from "./data-collector/database-data-collector";
import entityDataCollector from "./data-collector/entity-data-collector";
import expressjsTypeormGenerator from "./generator/express-typeorm-generator";
import { mode, outputType } from "./config";
async function generatorEngine() {
  let tableData: { [x: string]: any };
  if (mode == "entity") {
    tableData = await entityDataCollector();
  } else {
    tableData = await databaseDataCollector();
  }
  if (outputType == "express") await expressjsTypeormGenerator(tableData);
  else if (outputType == "nest")  await nestjsTypeormGenerator(tableData);
}

export default generatorEngine;
