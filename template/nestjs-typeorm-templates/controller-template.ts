function controllerTemplate(props: {
  pascalCaseTableName:any;
    camelCaseName: any;
  kebabName: any;
}) {
  let tableName = props.pascalCaseTableName;
  let camelCaseName = props.camelCaseName;
  let kebabName = props.kebabName;
  var template = `
    import {
Controller, Get, Post, Body, Param,  UseInterceptors, HttpException, HttpStatus,UploadedFiles,Query
} from '@nestjs/common';

import { ${tableName}Service } from './${camelCaseName}.service';
import { FileInterceptor,AnyFilesInterceptor } from '@nestjs/platform-express';
import {Create${tableName}Dto,Update${tableName}Dto} from './dto/${tableName}.dto'
@Controller('${kebabName}')
export class ${tableName}Controller {
  constructor(
    private readonly ${camelCaseName}Service: ${tableName}Service
    ) { }

  @Post('')
  @UseInterceptors(AnyFilesInterceptor())
  async create(@Body() body:Create${tableName}Dto,@UploadedFiles() files: Array<Express.Multer.File>) {
    let response: any;
    try {
response = await this.${camelCaseName}Service.create(body,files);
    } catch (err:any) {
throw new HttpException({
  statusCode: HttpStatus.BAD_REQUEST,
  message: err.message,
}, HttpStatus.BAD_REQUEST);
    }
    return {
statusCode: HttpStatus.OK,
message: 'password Successfully',
data: response
    };
  }


  @Post('update')
  @UseInterceptors(AnyFilesInterceptor())
  async update(@Body() body:Update${tableName}Dto,@UploadedFiles() files: Array<Express.Multer.File>) {
    let response: any;
    try {
response = await this.${camelCaseName}Service.update(body,files);
    } catch (err:any) {
throw new HttpException({
  statusCode: HttpStatus.BAD_REQUEST,
  message: err.message,
}, HttpStatus.BAD_REQUEST);
    }
    return {
statusCode: HttpStatus.OK,
message: 'Successfully',
data: response
    };
  }

  @Post('filter')
  @UseInterceptors(FileInterceptor(''))
  async filter(@Body() body:any) {
    let response: any;
    try {
response = await this.${camelCaseName}Service.filter(body);
    } catch (err:any) {
throw new HttpException({
  statusCode: HttpStatus.BAD_REQUEST,
  message: err.message,
}, HttpStatus.BAD_REQUEST);
    }
    return {
statusCode: HttpStatus.OK,
message: 'Successfully',
data: response
    };
  }


  @Post('filter-with-relation/relations?')
  @UseInterceptors(FileInterceptor(''))
  async filterWithRelation(@Body() body:any,@Param('relations') relations?: string) {
    let response: any;
    try {
response = await this.${camelCaseName}Service.filterWithRelation(body,relations);
    } catch (err:any) {
throw new HttpException({
  statusCode: HttpStatus.BAD_REQUEST,
  message: err.message,
}, HttpStatus.BAD_REQUEST);
    }
    return {
statusCode: HttpStatus.OK,
message: 'Successfully',
data: response
    };
  }

  @Get('with-selected-relation')
  async findAllWithSelectedRelation(@Query() query:{relations?:string,skip?:number,take?:number}) {
    let response: any;
    try {
response = await this.${camelCaseName}Service.findAllWithSelectedRelation(query);
    } catch (err:any) {
throw new HttpException({
  statusCode: HttpStatus.BAD_REQUEST,
  message: err.message,
}, HttpStatus.BAD_REQUEST);
    }
    return {
statusCode: HttpStatus.OK,
message: 'Successfully',
data: response
    };
  }
  
  @Get('')
  async findAll(@Query() query:{skip?:number,take?:number}) {
    let response: any;
    try {
response = await this.${camelCaseName}Service.findAll(query);
    } catch (err:any) {
throw new HttpException({
  statusCode: HttpStatus.BAD_REQUEST,
  message: err.message,
}, HttpStatus.BAD_REQUEST);
    }
    return {
statusCode: HttpStatus.OK,
message: 'Success',
data: response
    };
  }

  
  @Get(':id')
  async findOne(@Param('id') id:string) {
    let response: any;
    try {
response = await this.${camelCaseName}Service.findOne(+id);
    } catch (err:any) {
throw new HttpException({
  statusCode: HttpStatus.BAD_REQUEST,
  message: err.message,
}, HttpStatus.BAD_REQUEST);
    }
    return {
statusCode: HttpStatus.OK,
message: 'Success',
data: response
    };
  }


  @Get('details/:id')
  async getOneWithRelation(@Param('id') id:string) {
    let response: any;
    try {
response = await this.${camelCaseName}Service.getOneWithRelation(+id);
    } catch (err:any) {
throw new HttpException({
  statusCode: HttpStatus.BAD_REQUEST,
  message: err.message,
}, HttpStatus.BAD_REQUEST);
    }
    return {
statusCode: HttpStatus.OK,
message: 'Success',
data: response
    };
  }

  
  @Get('remove/:id')
  async removeOne(@Param('id') id:string) {
    let response: any;
    try {
response = await this.${camelCaseName}Service.remove(+id);
    } catch (err:any) {
throw new HttpException({
  statusCode: HttpStatus.BAD_REQUEST,
  message: err.message,
}, HttpStatus.BAD_REQUEST);
    }
    return {
statusCode: HttpStatus.OK,
message: 'Success',
data: response
    };
  } 
}
`;
  return template;
}
export default controllerTemplate;
