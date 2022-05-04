/* eslint-disable object-curly-newline */
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../src/config');
const { createTableDb } = require('../src/dbsetup');

const petsRoutes = express.Router();

// routes
petsRoutes.post('/pets', async (req, res) => {
  let conn;
  try {
    const newPetsObj = req.body;
    console.log('newPetsObj ===', newPetsObj);

    // eslint-disable-next-line camelcase
    const { name, dob, client_email, archived } = newPetsObj;

    conn = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO pets (name, dob, client_email, archived)
    VALUES (?, ?, ?, ?)`;
    // eslint-disable-next-line camelcase
    const [insertResultObj] = await conn.execute(sql, [name, dob, client_email, archived]);
    if (insertResultObj.affectedRows === 1) {
      res.status(201).json(insertResultObj);
      return;
    }
    throw new Error('affected row not 1');
  } catch (error) {
    console.log('error creating post', error);
    res.sendStatus(500);
  } finally {
    await conn?.end();
  }
});

module.exports = {
  petsRoutes,
};
