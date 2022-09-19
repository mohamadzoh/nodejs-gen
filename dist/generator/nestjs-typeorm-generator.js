"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const module_template_1 = __importDefault(require("../template/nestjs-typeorm-templates/module-template"));
const controller_template_1 = __importDefault(require("../template/nestjs-typeorm-templates/controller-template"));
const service_template_1 = __importDefault(require("../template/nestjs-typeorm-templates/service-template"));
const dto_template_1 = __importDefault(require("../template/nestjs-typeorm-templates/dto-template"));
const main_template_1 = __importDefault(require("../template/nestjs-typeorm-templates/main-template"));
const app_module_template_1 = __importDefault(require("../template/nestjs-typeorm-templates/app-module-template"));
const upload_middleware_template_1 = __importDefault(require("../template/nestjs-typeorm-templates/upload-middleware-template"));
async function nestjsTypeormGenerator(tableData) {
    await fs_extra_1.default.ensureDir("./output/");
    await fs_extra_1.default.ensureDir("./output/nestjs-typeorm/");
    let tablesNames = [];
    const keys = Object.keys(tableData);
    for await (let tableName of keys) {
        tablesNames.push(tableName);
        let camelCaseName = tableData[tableName].camelCaseTableName;
        let kebabName = tableData[tableName].kabebCaseTableName;
        fs_extra_1.default.ensureDir("./output/nestjs-typeorm/" + camelCaseName, (err) => {
            if (err)
                return console.log(err);
        });
        await fs_extra_1.default.ensureDir("./output/nestjs-typeorm/" + camelCaseName + "/dto");
        await fs_extra_1.default.ensureFile("./output/nestjs-typeorm/" +
            camelCaseName +
            "/" +
            camelCaseName +
            ".module.ts");
        await fs_extra_1.default.writeFile("./output/nestjs-typeorm/" +
            camelCaseName +
            "/" +
            camelCaseName +
            ".module.ts", (0, module_template_1.default)({ tableName, camelCaseName }));
        await fs_extra_1.default.ensureFile("./output/nestjs-typeorm/" +
            camelCaseName +
            "/" +
            camelCaseName +
            ".controller.ts");
        await fs_extra_1.default.writeFile("./output/nestjs-typeorm/" +
            camelCaseName +
            "/" +
            camelCaseName +
            ".controller.ts", (0, controller_template_1.default)({
            pascalCaseTableName: tableData[tableName].pascalCaseTableName,
            camelCaseName,
            kebabName,
        }));
        await fs_extra_1.default.ensureFile("./output/nestjs-typeorm/" +
            camelCaseName +
            "/" +
            camelCaseName +
            ".service.ts");
        await fs_extra_1.default.writeFile("./output/nestjs-typeorm/" +
            camelCaseName +
            "/" +
            camelCaseName +
            ".service.ts", (0, service_template_1.default)({
            camelCaseName,
            tableData: tableData[tableName].tableData,
            relationsName: tableData[tableName].relationsName,
            pascalCaseTableName: tableData[tableName].pascalCaseTableName,
        }));
        await fs_extra_1.default.ensureFile("./output/nestjs-typeorm/" +
            camelCaseName +
            "/dto/" +
            camelCaseName +
            ".dto.ts");
        await fs_extra_1.default.writeFile("./output/nestjs-typeorm/" +
            camelCaseName +
            "/dto/" +
            camelCaseName +
            ".dto.ts", (0, dto_template_1.default)({
            tableData: tableData[tableName].tableData,
            pascalCaseTableName: tableData[tableName].pascalCaseTableName,
        }));
        await fs_extra_1.default.ensureFile("./output/nestjs-typeorm/main.ts");
        await fs_extra_1.default.writeFile("./output/nestjs-typeorm/main.ts", (0, main_template_1.default)());
    }
    await fs_extra_1.default.ensureFile("./output/nestjs-typeorm/app.module.ts");
    await fs_extra_1.default.writeFile("./output/nestjs-typeorm/app.module.ts", (0, app_module_template_1.default)({ tablesNames }));
    await fs_extra_1.default.ensureFile("./output/nestjs-typeorm/file-middleware.ts");
    await fs_extra_1.default.writeFile("./output/nestjs-typeorm/file-middleware.ts", (0, upload_middleware_template_1.default)());
}
exports.default = nestjsTypeormGenerator;
