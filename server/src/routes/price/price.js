import express from "express";
import { getPool } from "../../db";

const PriceRoute = express.Router();

PriceRoute.get("/", async (req, res) => {
  const pool = getPool();
  try {
    const { rows } = await pool.query("SELECT * from Price");
    res.json(rows);
  } catch (error) {
    res.send("Error occured").status(500);
  }

  res.status(200);
});

PriceRoute.post("/", async (req, res) => {
  try {
    const pool = getPool();
    const { id, city, start_date, end_date, price, status, color } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO Price (Id,City,StartDate,EndDate,Price,Status,Color) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [id, city, start_date, end_date, price, status, color]
    );
    res.json(rows).status(201);
  } catch (error) {
    console.log(error);
    res.status(500).send("failed");
  }
});

export default PriceRoute;
