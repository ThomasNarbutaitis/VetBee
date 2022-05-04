require('dotenv').config();
const express = require('express');
const { dbConfig } = require('../src/config');
const { createTableDb } = require('../src/dbsetup');

const petsRoutes = express.Router();

// routes
petsRoutes.get('/pets', async (req, res) => {
  res.json('trying to get pets');
  console.log('dbconfig ===', dbConfig);
});

module.exports = {
  petsRoutes,
};
