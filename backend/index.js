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

// if there is an ath problem
// ALTER USER 'Jim'@'localhost' IDENTIFIED WITH mysql_native_password BY '@Main123';

app.use(express.json());
// Get all books

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books ('title', 'desc', 'cover') VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully!");
  });
});
app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
