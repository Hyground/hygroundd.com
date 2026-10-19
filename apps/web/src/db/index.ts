import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL ?? "postgresql://build:build@127.0.0.1:5432/build";

const globalForDatabase = globalThis as unknown as {
  hygrounddSql?: ReturnType<typeof postgres>;
};

export const sql =
  globalForDatabase.hygrounddSql ??
  postgres(connectionString, {
    max: process.env.NODE_ENV === "production" ? 5 : 1,
    idle_timeout: 20,
    connect_timeout: 10,
    prepare: false,
  });

if (process.env.NODE_ENV !== "production") globalForDatabase.hygrounddSql = sql;

export const db = drizzle(sql, { schema });
