import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allow = new Set(['http://localhost:3001', 'http://127.0.0.1:3001']);

  app.enableCors({
    origin: (origin, cb) => {
      // no Origin = non-browser request → no CORS needed
      if (!origin) return cb(null, false);
      if (allow.has(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked: ${origin}`), false);
    },
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  });

  await app.listen(Number(process.env.PORT) || 3000, '0.0.0.0');
}
bootstrap();
