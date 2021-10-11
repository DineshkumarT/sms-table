import dotenv from "dotenv";
import express from "express";
import { getPool } from "./db";
import { PriceRoute } from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const pool = getPool();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/price", PriceRoute);

async function checkDBConnection() {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    if (rows[0]) {
      console.log("DB connected successfully!");
    }
  } catch (error) {
    console.log(error);
  }
}

app.listen(PORT, () => {
  console.log("App started successfully!");
  checkDBConnection();
});
