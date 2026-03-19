import mongoose from "mongoose";

export function initDatabase() {
  const database_url = process.env.DATABASE_URL;

  mongoose.connection.on("open", () => {
    console.info(`database opened`);
  });

  const connection = mongoose.connect(database_url);

  return connection;
}
