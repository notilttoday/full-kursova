import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as bodyParser from 'body-parser'

import { AllExceptionFilter } from '@boilerplate/core/filters/all-exception.filter'

import { config } from '@boilerplate/back-end/config'

import { AppModule } from '@boilerplate/back-end/app.module'

console.log("123123");
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })

  app.setGlobalPrefix('api/v1')

  app.useGlobalFilters(new AllExceptionFilter())

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

  app.enableCors({
    origin: config.get('cors.origins').split(','),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })

  if (config.get('swagger.enabled')) {
    const options = new DocumentBuilder()
      .addBearerAuth()
      .addSecurity('Health Check', {
        type: 'http',
        scheme: 'basic',
        name: 'health-check',
        description: 'Health check basic auth',
      })
      .setTitle('Boilerplate API')
      .setDescription('')
      .setVersion('1.0')
      .build()
    const document = SwaggerModule.createDocument(app, options)

    SwaggerModule.setup('swagger', app, document)
  }

  await app.listen(config.get('app.port'))
}

bootstrap()
