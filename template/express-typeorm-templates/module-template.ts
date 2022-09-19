import columnType from "../../column-type";
function ModuleTemplate(props: {
    pascalCaseTableName: any;
    camelCaseName: any;
    tableData: any;
    relationsName: any;
    primaryKeys:{columnName:string,
      type:string
      }[]
  }) {
    const pascalCaseTableName = props.pascalCaseTableName;
    const camelCaseName = props.camelCaseName;
    let relationsName: string[] = [];
    if(props.relationsName!=undefined){
      relationsName=props.relationsName
    }
  let template = `
    import fileUploader from '../file-middleware';
    import { ${pascalCaseTableName}Repository } from "../data-source";


    async function create(body:any,files:Array<Express.Multer.File>) {
        let tmp=await ${pascalCaseTableName}Repository.save(body);
        let allowedUploadFileName:string[]=[];
        for await (let file of files) {
          if(allowedUploadFileName.indexOf(file.fieldname)==-1){
            ${pascalCaseTableName}Repository.remove(tmp)
            throw "error"
          }
         tmp[file.fieldname]= fileUploader('${pascalCaseTableName}',tmp.id,file);
        }
       return await ${pascalCaseTableName}Repository.save(tmp)
      }
      async function update(body:any,files:Array<Express.Multer.File>) {
        var old = await ${pascalCaseTableName}Repository.findOne({ where: { id: body.id } })
        let allowedUploadFileName:string[]=[];
        Object.keys(body).forEach((element) => {
          old[element] = body[element]
        })
        for await (let file of files) {
          if(allowedUploadFileName.indexOf(file.fieldname)==-1){
            throw "error"
          }
          old[file.fieldname]= fileUploader('${pascalCaseTableName}',old.id,file);
         }
        return await ${pascalCaseTableName}Repository.save(old)
      }
      async function filter(body:any) {
        let allowedfilterColumn:string[]=[${props.tableData.map(
          (element: { columnName: any }) =>
            "'" + element.columnName + "'"
        )}]
        Object.keys(body).forEach((element) => {
if(allowedfilterColumn.indexOf(element)==-1){
  throw "error"
}})
       return await ${pascalCaseTableName}Repository.find({where:body})
      }
      async function filterWithRelations(body:any,query:any) {
        let allowedfilterColumn:string[]=[${props.tableData.map(
          (element: { columnName: any }) =>
            "'" + element.columnName + "'"
        )}]
        let allowedRelations:string[]=[${relationsName.map(
          (element: string) => "'" + element + "'"
        )}];
let selectedRelations:string[]=[];
if(query!=undefined && Object.keys(query).length>0){
selectedRelations=query.relations.split(',');
selectedRelations.forEach((element)=>{
  if(allowedRelations.indexOf(element)==-1){
    throw "error"
}})
  }
  
        Object.keys(body).forEach((element) => {
if(allowedfilterColumn.indexOf(element)==-1){
  throw "error"
}})
        return await ${pascalCaseTableName}Repository.find({where:body, relations:selectedRelations})
      }
    async function findAll(query:{skip?:number,take?:number}) {
        const {skip,take}=query;
        return await ${pascalCaseTableName}Repository.find({skip:skip,take:take});
      }
      async function findOne(${props.primaryKeys.map((element)=>{
      return element.columnName+':'+columnType('NO',element.type).type
      }).join(',')}) {
        return await ${pascalCaseTableName}Repository.findOne({ where: { ${props.primaryKeys.map((element)=>{return element.columnName+":"+element.columnName})} } })
      }
      async function remove(${props.primaryKeys.map((element)=>{
      return element.columnName+':'+columnType('NO',element.type).type
      }).join(',')}) {

        return await ${pascalCaseTableName}Repository.delete({ ${props.primaryKeys.map((element)=>{return element.columnName+":"+element.columnName})} })
      }

    async function findOneWithRelation(${props.primaryKeys.map((element)=>{
    return element.columnName+':'+columnType('NO',element.type).type
    }).join(',')}){
        return await ${pascalCaseTableName}Repository.findOne({where:{id:id},relations:[${relationsName.map(
            (element: string) => "'" + element + "'"
          )}]})    }

          
          async function findAllWithSelectedRelation(query:{relations?:string;skip?:number,take?:number}) {
            let allowedfilterRelation=[${relationsName.map(
              (element) => "'" + element + "'"
            )}]
            let selectedRelations=[];
            if(query.relations!=undefined){
              selectedRelations=query.relations.split(',');
      if(!selectedRelations.every((element)=>{
        if(allowedfilterRelation.indexOf(element)==-1){
          return false;
        }
        return true;
      })){
        throw "error";
      }
            }
      const {skip,take}=query;
            return await ${pascalCaseTableName}Repository.find({skip:skip,take:take,relations:selectedRelations})
          }
    export {create,update,remove,findOne,findAll,findOneWithRelation,findAllWithSelectedRelation,filter,filterWithRelations};

    `;

return template;
  
}
export default ModuleTemplate;
