"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const app_template_1 = __importDefault(require("../template/express-typeorm-templates/app-template"));
const data_source_template_1 = __importDefault(require("../template/express-typeorm-templates/data-source-template"));
const module_template_1 = __importDefault(require("../template/express-typeorm-templates/module-template"));
const multer_template_1 = __importDefault(require("../template/express-typeorm-templates/multer-template"));
const router_template_1 = __importDefault(require("../template/express-typeorm-templates/router-template"));
const upload_middleware_template_1 = __importDefault(require("../template/express-typeorm-templates/upload-middleware-template"));
async function expressjsTypeormGenerator(tableData) {
    await fs_extra_1.default.ensureDir("./output/");
    await fs_extra_1.default.ensureDir("./output/expressjs-typeorm/");
    await fs_extra_1.default.ensureDir("./output/expressjs-typeorm/router");
    await fs_extra_1.default.ensureDir("./output/expressjs-typeorm/module");
    await fs_extra_1.default.ensureFile("./output/expressjs-typeorm/file-middleware.ts");
    await fs_extra_1.default.writeFile("./output/expressjs-typeorm/file-middleware.ts", (0, upload_middleware_template_1.default)());
    await fs_extra_1.default.ensureFile("./output/expressjs-typeorm/router-upload.ts");
    await fs_extra_1.default.writeFile("./output/expressjs-typeorm/router-upload.ts", (0, multer_template_1.default)());
    let tablesNames = [];
    const keys = Object.keys(tableData);
    for await (let tableName of keys) {
        let element = tableData[tableName];
        tablesNames.push({
            pascalCaseName: element.pascalCaseTableName,
            kebabCaseName: element.kabebCaseTableName,
            camelCaseName: element.camelCaseTableName,
        });
        await fs_extra_1.default.ensureFile(`./output/expressjs-typeorm/module/${element.kabebCaseTableName}.ts`);
        await fs_extra_1.default.writeFile(`./output/expressjs-typeorm/module/${element.kabebCaseTableName}.ts`, (0, module_template_1.default)({
            relationsName: element.relationsName,
            pascalCaseTableName: element.pascalCaseTableName,
            camelCaseName: element.camelCaseTableName,
            tableData: element.tableData,
        }));
        await fs_extra_1.default.ensureFile(`./output/expressjs-typeorm/router/${element.kabebCaseTableName}.ts`);
        await fs_extra_1.default.writeFile(`./output/expressjs-typeorm/router/${element.kabebCaseTableName}.ts`, (0, router_template_1.default)(element.camelCaseTableName, element.kabebCaseTableName));
    }
    await fs_extra_1.default.ensureFile(`./output/expressjs-typeorm/app.ts`);
    await fs_extra_1.default.writeFile(`./output/expressjs-typeorm/app.ts`, (0, app_template_1.default)(tablesNames));
    await fs_extra_1.default.ensureFile(`./output/expressjs-typeorm/data-source.ts`);
    await fs_extra_1.default.writeFile(`./output/expressjs-typeorm/data-source.ts`, (0, data_source_template_1.default)(tablesNames));
}
exports.default = expressjsTypeormGenerator;
