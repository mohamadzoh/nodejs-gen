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
// main({host:"127.0.0.1",dbPortNumber:3306,
//   userName:"root",
//   password:"password",
//   dataBase:"aplo",
//   entityPath:"entities/",
//   uploadPath:"./upload",
//   mode:"mysql",
//   outputType:"nest"});
exports.default = main;
