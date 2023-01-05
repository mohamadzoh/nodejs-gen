"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const column_type_1 = __importDefault(require("../../column-type"));
const config_1 = require("../../config");
function serviceTemplate(props) {
  const pascalCaseTableName = props.pascalCaseTableName;
  const camelCaseName = props.camelCaseName;
  let relationsName = [];
  if (props.relationsName != undefined) {
    relationsName = props.relationsName;
  }
  let template = `import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import fileUploader from '../file-middleware';
    import { ${pascalCaseTableName} } from '${config_1.entityPath}${pascalCaseTableName}';
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
        let allowedfilterColumn:string[]=[${props.tableData.map((element) => "'" + element.columnName + "'")}]
        Object.keys(body).forEach((element) => {
if(allowedfilterColumn.indexOf(element)==-1){
  throw new HttpException({
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'not allowed',
  }, HttpStatus.BAD_REQUEST);}})
        return await this.${camelCaseName}Repository.find({where:body})
      }


      async getOneWithRelation(${props.primaryKeys.map((element) => { return element.columnName + ":" + (0, column_type_1.default)('NO', element.type).type; })}){
        return await this.${camelCaseName}Repository.findOne({where:{${props.primaryKeys.map((element) => {
    return element.columnName + ":" + element.columnName;
  })}},relations:[${relationsName.map((element) => "'" + element + "'")}]})
      }


      async filterWithRelation(body:any,relations:any) {
        let allowedfilterColumn:string[]=[${props.tableData.map((element) => "'" + element.columnName + "'")}]
        let allowedRelations:string[]=[${relationsName.map((element) => "'" + element + "'")}];
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
        let allowedfilterRelation=[${relationsName.map((element) => "'" + element + "'")}]
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


      async findOne(${props.primaryKeys.map((element) => { return element.columnName + ":" + (0, column_type_1.default)('NO', element.type).type; })}) {
        return await this.${camelCaseName}Repository.findOne({ where: { ${props.primaryKeys.map((element) => {
    return element.columnName + ":" + element.columnName;
  })} } })
      }


      async remove(${props.primaryKeys.map((element) => { return element.columnName + ":" + (0, column_type_1.default)('NO', element.type).type; })}) {

        return await this.${camelCaseName}Repository.delete({ ${props.primaryKeys.map((element) => {
    return element.columnName + ":" + element.columnName;
  })} })
      }
    }
    `;
  return template;
}
exports.default = serviceTemplate;
