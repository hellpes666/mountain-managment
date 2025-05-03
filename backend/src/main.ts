import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const PORT = process.env.PORT || 5000;
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({ whitelist: true, transform: true }),
	);

	const config = new DocumentBuilder()
		.setTitle('NestJS курс')
		.setDescription('Документация REST API')
		.setVersion('1.0.0')
		.addTag('Tag')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/api/docs', app, document);

	await app.listen(PORT, () => {
		console.log(`Server started on: http://localhost:${PORT}`);
	});
}
bootstrap();
