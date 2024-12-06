const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: "./public/schoolImages",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Add a new school
router.post("/", upload.single("image"), (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file.filename;

  const query =
    "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [name, address, city, state, contact, email_id, image],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).json({ message: "School added successfully!" });
    }
  );
});

// Fetch all schools
router.get("/", (req, res) => {
  const query = "SELECT id, name, address, city, image FROM schools";
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
});

module.exports = router;
