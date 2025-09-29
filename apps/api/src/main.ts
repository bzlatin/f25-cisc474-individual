import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Exact allowlist (filter out undefined)
  const allowlist = new Set(
    [
      'http://localhost:3001',
      'http://127.0.0.1:3001',
      process.env.FRONTEND_ORIGIN,
    ].filter(Boolean) as string[],
  );

  app.enableCors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, false); // non-browser/SSR requests

      try {
        const url = new URL(origin);
        const ok =
          allowlist.has(origin) || // exact match (prod, localhost)
          url.host.endsWith('.vercel.app'); // allow Vercel preview deploys

        return ok
          ? cb(null, true)
          : cb(new Error(`CORS blocked: ${origin}`), false);
      } catch {
        return cb(new Error('Bad Origin header'), false);
      }
    },
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  });

  await app.listen(Number(process.env.PORT) || 3000, '0.0.0.0');
}
bootstrap();
