import generatorEngine from "./generator-engine";
import { setConfiguration} from './config' 
async function main(props:{host:string,dbPortNumber:number,
  userName:string,
  password:string,
  dataBase:string,
  entityPath:string,
  uploadPath:string,
  mode:"entity" | "mysql",
  outputType:"express" | "nest"}) {
  setConfiguration(props);
  await generatorEngine();
}
// main({host:"127.0.0.1",dbPortNumber:3306,
//   userName:"root",
//   password:"password",
//   dataBase:"aplo",
//   entityPath:"entities/",
//   uploadPath:"./upload",
//   mode:"mysql",
//   outputType:"nest"});
export default main;