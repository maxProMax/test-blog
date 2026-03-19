import { MongoMemoryServer } from "mongodb-memory-server";

export default async function globalSetup() {
  const instance = await MongoMemoryServer.create({
    binary: { version: "8.0.13" },
  });

  global.__MONGO_INSTANCE = instance;

  process.env.DATABASE_URL = instance.getUri();
}
