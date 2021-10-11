import { Pool } from "pg";

let mainPool = null;
const pool = () => {
  console.log(process.env.DB_URL);
  return new Pool({
    connectionString: process.env.DB_URL,
  });
};

export const getPool = () => {
  if (!mainPool) {
    mainPool = pool();
  }
  return mainPool;
};
