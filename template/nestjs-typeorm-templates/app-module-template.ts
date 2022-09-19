import {host,userName,password,dataBase,dbPortNumber} from '../../config'

function appModuleTemplate(props: { tablesNames: any; }){
let template=`
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';`
props.tablesNames.forEach((element: any) => {
    template+=`
import { ${element}Module } from './${element}/${element}.module';`
});
template+=`
@Module({
    imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: '${host}',
      port: ${dbPortNumber},
      username: '${userName}',
      password: '${password}',
      database: '${dataBase}',
      entities: [__dirname + '/../**/entities/*.js'],
    })`;
    props.tablesNames.forEach((element: any) => {
        template+=`,${element}Module`
    });
    template+=`],
    controllers: [],
})
export class AppModule { }`
return template;
}

export default appModuleTemplate;

