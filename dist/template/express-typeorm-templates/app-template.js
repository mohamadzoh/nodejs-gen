"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function appTemplate(tablesNames) {
    let template = `
import express from "express";
import cors from "cors";
import dataSource from "./data-source";
    ${tablesNames.map((element) => {
        return `import ${element.camelCaseName}Route from './router/${element.kebabCaseName}'
`;
    }).join('')}
const app = express();
const http = require("http").Server(app);
app.use(cors())
app.use("/uploads", express.static("uploads"));
app.use(express.json())
app.use((_req: any, res: { header: (arg0: string, arg1: string) => void; }, next: () => void) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

async function main() {
  await  dataSource.initialize()
    ${tablesNames.map((element) => {
        return `app.use('/${element.kebabCaseName}',${element.camelCaseName}Route);
        `;
    }).join('')}
    http.listen(5000, function (err: any) {
      if (err) console.log(err);
      console.log('Listening on port 5000');
    });
    process.on('uncaughtException', function (ex) {
      console.log(ex);
    });
  }
  main();
  `;
    return template;
}
exports.default = appTemplate;
