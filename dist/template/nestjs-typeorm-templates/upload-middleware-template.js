"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
function uploadMiddlewareTemplate() {
  return `import * as fs from "fs-extra";
    export default function fileUploader(
      folderName: string,
      id: string | number,
      file: any
    ) {
   try{
    if (typeof id === "number") {
      id = id.toString();
    }
    let extension: string | string[] = file.originalname.split(".");
    extension = extension[extension.length - 1];
    let fileName: string =
      Date.now().toString().slice(-10) + file.fieldname + "." + extension;
    let fileContents = Buffer.from(file.buffer).toString("base64");
    fs.ensureDir("${config_1.uploadPath}", (err) => {
      if (err) console.log(err);
    });
    fs.ensureDir("${config_1.uploadPath}" + folderName + "/", (err) => {
      if (err) console.log(err);
    });
    fs.ensureDir("${config_1.uploadPath}" + folderName + "/" + id, (err) => {
      if (err) console.log(err);
    });
    fs.writeFile(
      "${config_1.uploadPath}" + folderName + "/" + id + "/" + fileName,
      fileContents,
      "base64",
      function (err) {
        if (err) console.log(err);
      }
    );

    return fileName;
   }catch(e){
    return '';
   }
    }
    `;
}
exports.default = uploadMiddlewareTemplate;
