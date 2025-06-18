import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "Jim",
  password: "@Main123",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("Hello from backend!");
});

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
