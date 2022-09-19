import { entityPath } from "../../config";

function serviceTemplate(props: {
  pascalCaseTableName: any;
  camelCaseName: any;
  tableData: any;
  relationsName: any;
}) {
  const pascalCaseTableName = props.pascalCaseTableName;
  const camelCaseName = props.camelCaseName;
  let relationsName: string[] = [];
  if (props.relationsName != undefined) {
    relationsName = props.relationsName;
  }

  let template = `import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import fileUploader from '../file-middleware';
    import { ${pascalCaseTableName} } from '${entityPath}${pascalCaseTableName}';
    import { Repository } from 'typeorm';
    import {Create${pascalCaseTableName}Dto,Update${pascalCaseTableName}Dto} from './dto/${pascalCaseTableName}.dto'
    @Injectable()
    export class ${pascalCaseTableName}Service {
      constructor(
        @InjectRepository(${pascalCaseTableName})
        private ${camelCaseName}Repository: Repository<${pascalCaseTableName}>,
      ) { }

      async create(body:Create${pascalCaseTableName}Dto,files:Array<Express.Multer.File>) {
        let tmp=await this.${camelCaseName}Repository.save(body);
        let allowedUploadFileName:string[]=[];
        for await (let file of files) {
          if(allowedUploadFileName.indexOf(file.fieldname)==-1){
            this.${camelCaseName}Repository.remove(tmp)
            throw new HttpException({
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'not allowed',
            }, HttpStatus.BAD_REQUEST)
          }
         tmp[file.fieldname]= fileUploader('${pascalCaseTableName}',tmp.id,file);
        }
       return await this.${camelCaseName}Repository.save(tmp)
      }


      async update(body:Update${pascalCaseTableName}Dto,files:Array<Express.Multer.File>) {
        var old = await this.${camelCaseName}Repository.findOne({ where: { id: body.id } })
        let allowedUploadFileName:string[]=[];
        Object.keys(body).forEach((element) => {
          old[element] = body[element as keyof Update${pascalCaseTableName}Dto]
        })
        for await (let file of files) {
          if(allowedUploadFileName.indexOf(file.fieldname)==-1){
            throw new HttpException({
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'not allowed',
            }, HttpStatus.BAD_REQUEST)
          }
          old[file.fieldname]= fileUploader('${pascalCaseTableName}',old.id,file);
         }
        return await this.${camelCaseName}Repository.save(old)
      }


      async filter(body:any) {
        let allowedfilterColumn:string[]=[${props.tableData.map(
          (element: { columnName: any }) => "'" + element.columnName + "'"
        )}]
        Object.keys(body).forEach((element) => {
if(allowedfilterColumn.indexOf(element)==-1){
  throw new HttpException({
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'not allowed',
  }, HttpStatus.BAD_REQUEST);}})
        return await this.${camelCaseName}Repository.find({where:body})
      }


      async getOneWithRelation(id:number){
        return await this.${camelCaseName}Repository.findOne({where:{id:id},relations:[${relationsName.map(
    (element: string) => "'" + element + "'"
  )}]})
      }


      async filterWithRelation(body:any,relations:any) {
        let allowedfilterColumn:string[]=[${props.tableData.map(
          (element: { columnName: any }) => "'" + element.columnName + "'"
        )}]
        let allowedRelations:string[]=[${relationsName.map(
          (element: string) => "'" + element + "'"
        )}];
let selectedRelations:string[]=[];
if(relations!=undefined){
selectedRelations=relations.split(',');
selectedRelations.forEach((element)=>{
  if(allowedRelations.indexOf(element)==-1){
    throw new HttpException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'not allowed',
    }, HttpStatus.BAD_REQUEST);}})
  }
  
        Object.keys(body).forEach((element) => {
if(allowedfilterColumn.indexOf(element)==-1){
  throw new HttpException({
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'not allowed',
  }, HttpStatus.BAD_REQUEST);}})
        return await this.${camelCaseName}Repository.find({where:body, relations:selectedRelations})
      }

      
      async findAllWithSelectedRelation(query:{relations?:string,skip?:number,take?:number}) {
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
    throw new HttpException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'not allowed',
    }, HttpStatus.BAD_REQUEST)
  }
        }
  const {skip,take}=query;
        return await this.${camelCaseName}Repository.find({skip:skip,take:take,relations:selectedRelations})
      }

      async findAll(query:{skip?:number,take?:number}) {
        const {skip,take}=query;
        return await this.${camelCaseName}Repository.find({skip:skip,take:take});
      }


      async findOne(id: number) {
        return await this.${camelCaseName}Repository.findOne({ where: { id: id } })
      }


      async remove(id: number) {

        return await this.${camelCaseName}Repository.delete({ id: id })
      }
    }
    `;
  return template;
}
export default serviceTemplate;
