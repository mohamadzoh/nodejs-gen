let host:string = "127.0.0.1";
let userName:string = "root";
let password:string = "password";
let dataBase:string = "aplo";
let entityPath:string = "entities/";
let uploadPath:string = "uploads/";
let mode: "entity" | "mysql" = "mysql";
let outputType: "express" | "nest" = "nest";
let dbPortNumber:number=3306;

function setConfiguration(props:{host:string,dbPortNumber:number
  userName:string,
  password:string,
  dataBase:string,
  entityPath:string,
  uploadPath:string,
  mode:"entity" | "mysql",
  outputType:"express" | "nest"}){
    dbPortNumber=props.dbPortNumber;
    userName=props.userName;
    password=props.password;
    dataBase=props.dataBase;
    entityPath=props.entityPath;
    uploadPath=props.uploadPath;
    mode=props.mode;
    outputType=props.outputType;
}
export {
  setConfiguration,
  dbPortNumber,
  host,
  userName,
  password,
  dataBase,
  entityPath,
  uploadPath,
  mode,
  outputType,
};
