import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import "dotenv/config";
import { AppModule } from "~/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const port = parseInt(process.env.PORT || "5000");
  await app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Playground at http://localhost:${port}/graphql`);
}

bootstrap();
