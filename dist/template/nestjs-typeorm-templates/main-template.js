"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mainTemplate() {
    return ` import { NestFactory } from '@nestjs/core';
   import { AppModule } from './app.module';
   import { ValidationPipe } from '@nestjs/common';
   async function bootstrap() {
     const app = await NestFactory.create(AppModule);
     app.enableCors();
     app.useGlobalPipes(new ValidationPipe());
     await app.listen(5000);
   }
   bootstrap();`;
}
exports.default = mainTemplate;
