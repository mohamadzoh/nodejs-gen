"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nestjs_typeorm_generator_1 = __importDefault(require("./generator/nestjs-typeorm-generator"));
const database_data_collector_1 = __importDefault(require("./data-collector/database-data-collector"));
const entity_data_collector_1 = __importDefault(require("./data-collector/entity-data-collector"));
const express_typeorm_generator_1 = __importDefault(require("./generator/express-typeorm-generator"));
const config_1 = require("./config");
async function generatorEngine() {
    let tableData;
    if (config_1.mode == "entity") {
        tableData = await (0, entity_data_collector_1.default)();
    }
    else {
        tableData = await (0, database_data_collector_1.default)();
    }
    if (config_1.outputType == "express")
        await (0, express_typeorm_generator_1.default)(tableData);
    else if (config_1.outputType == "nest")
        await (0, nestjs_typeorm_generator_1.default)(tableData);
}
exports.default = generatorEngine;
