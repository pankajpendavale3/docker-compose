const express = require("express");
const { Client } = require("pg");

const app = express();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("✅ Database Connected");
  } catch (err) {
    console.log("❌ DB not ready, retrying in 5 seconds...");
    setTimeout(connectDB, 5000);
  }
};

connectDB();

app.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT NOW()");
    res.send("Database Connected: " + result.rows[0].now);
  } catch (err) {
    res.send("DB not ready yet...");
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("App running on port 3000");
});
