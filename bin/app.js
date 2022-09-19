#! /usr/bin/env node
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main = __importDefault(require("../dist/index"))
async function runApp() {
    const config=process.argv;
let props={};
 props.host = "127.0.0.1";
 props.userName = "root";
 props.password = "";
 props.dataBase = "";
 props.entityPath = "entities/";
 props.uploadPath = "uploads/";
 props.mode = "mysql";
 props.outputType = "express";
 props.dbPortNumber=3306;
for(var i=2;i<config.length;i+=2){
switch(config[i]){
    case '-d':
        props.dataBase=config[i+1];
        break;
    case '-u':
        props.userName=config[i+1];
        break;        
    case '-p':
        props.password=config[i+1];
        break;
    case '-h':
        props.host=config[i+1];
        break;
    case '-pn':
        props.dbPortNumber=config[i+1];
        break;        
    case '-m':
        if(config[i+1]=="mysql")
        props.mode=config[i+1];
        else{
            props.mode="entity";
        }
        break;
    case '-e':
        props.entityPath=config[i+1];
        break;
    case '-o':
        if(config[i+1]=="express")
        props.outputType=config[i+1];
        else
        props.outputType="nest";
        break;
    case '-f':
        props.uploadPath=config[i+1];
        break;
       }
}
await (0, main.default)(props);
setTimeout(()=>{process.exit(0)},2000)
};
runApp()




