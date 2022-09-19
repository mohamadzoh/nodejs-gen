"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generator_engine_1 = __importDefault(require("./generator-engine"));
const config_1 = require("./config");
async function main(props) {
    (0, config_1.setConfiguration)(props);
    await (0, generator_engine_1.default)();
}
// main();
exports.default = main;
