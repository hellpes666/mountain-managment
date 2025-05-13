import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // удаляет лишние поля
            forbidNonWhitelisted: true, // ошибка, если есть лишние поля
            transform: true, // автоматически преобразует payload в типы, указанные в DTO
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('API управления альпинизмом')
        .setDescription(
            'Данный API предоставляет возможность управления данными о восхождениях в альпинистском клубе. В базе данных хранятся сведения о восхождениях, альпинистах и горах. Пользователи могут добавлять, изменять и получать информацию о восхождениях, альпинистах и горах.',
        )
        .setVersion('1.0')
        .addTag('Альпинизм')
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
