// reading.js

const express = require('express');
const multer = require('multer');
const pool = require('../../db'); // Adjusted path to db.js
const authenticate = require('../middleware/authenticate');
const logger = require('../middleware/logger');
const validateReading = require('../middleware/validateReading');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Apply logger middleware to all routes in this router
router.use(logger);

// Route to fetch all books
router.get('/books', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM readings');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to upload a new book
router.post('/upload', authenticate, upload.single('ebook'), validateReading, async (req, res) => {
  try {
    const { title, author, content } = req.body;
    const ebookPath = req.file ? req.file.path : null;

    const result = await pool.query(
      'INSERT INTO readings (title, author, content, ebook_path) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, author, content, ebookPath]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
