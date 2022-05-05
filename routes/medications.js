require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../src/config');

const medicationsRoutes = express.Router();

// routes
medicationsRoutes.post('/meds', async (req, res) => {
  let conn;
  try {
    const newMedicationsObj = req.body;
    console.log('newMedicationsObj ===', newMedicationsObj);
    const { name, description } = newMedicationsObj;
    conn = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO medications (name, description)
    VALUES (?, ?)`;
    const [insertResultObj] = await conn.execute(sql, [name, description]);
    if (insertResultObj.affectedRows === 1) {
      res.status(201).json(insertResultObj);
      return;
    }
    throw new Error('affected row not 1');
  } catch (error) {
    console.log('error creating meds', error);
    res.sendStatus(500);
  } finally {
    await conn?.end();
  }
});

medicationsRoutes.get('/meds', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM medications';
    const [medicationsArr] = await conn.execute(sql);
    console.log('medicationsArr ===', medicationsArr);
  } catch (error) {
    console.log('error getting meds', error);
    res.sendStatus(500);
  } finally {
    await conn?.end();
  }
});

module.exports = {
  medicationsRoutes,
};
