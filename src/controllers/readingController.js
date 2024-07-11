// src/controllers/readingController.js
const readingMaterials = require('../models/readingModel');

// Get all reading materials
const getAllReadingMaterials = (req, res) => {
  res.json(readingMaterials);
};

// Get a specific reading material by ID
const getReadingMaterialById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const material = readingMaterials.find((item) => item.id === id);
  if (material) {
    res.json(material);
  } else {
    res.status(404).json({ error: 'Reading material not found' });
  }
};

// Add a new reading material
const addReadingMaterial = (req, res) => {
  const { title, author, content } = req.body;
  const newMaterial = {
    id: readingMaterials.length + 1,
    title,
    author,
    content,
  };
  readingMaterials.push(newMaterial);
  res.status(201).json(newMaterial);
};

module.exports = {
  getAllReadingMaterials,
  getReadingMaterialById,
  addReadingMaterial,
};
