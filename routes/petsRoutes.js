require('dotenv').config();
const express = require('express');

const petsRoutes = express.Router();

// routes
petsRoutes.get('/pets', async (req, res) => {
  res.json('trying to get pets');
});

module.exports = {
  petsRoutes,
};
