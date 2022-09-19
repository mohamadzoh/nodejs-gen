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
// main();
export default main;