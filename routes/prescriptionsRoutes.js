/* eslint-disable max-len */
/* eslint-disable camelcase */
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../src/config');

const prescriptions = express.Router();

// routes
prescriptions.post('/prescriptions', async (req, res) => {
  let conn;
  try {
    const newPrescriptionsObj = req.body;
    console.log('newPrescriptionsObj ===', newPrescriptionsObj);
    // eslint-disable-next-line object-curly-newline
    const { medication_id, pet_id, comment, timestamp } = newPrescriptionsObj;
    conn = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO prescriptions (medication_id, pet_id, comment, timestamp)
    VALUES (?, ?, ?, ?)`;
    const [insertResultObj] = await conn.execute(sql, [
      medication_id,
      pet_id,
      comment,
      timestamp,
    ]);
    if (insertResultObj.affectedRows === 1) {
      res.status(201).json(insertResultObj);
      return;
    }
    throw new Error('affected row not 1');
  } catch (error) {
    console.log('error creating prescriptions', error);
    res.sendStatus(500);
  } finally {
    await conn?.end();
  }
});

prescriptions.get('/prescriptions/:id', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);

    const sql = `SELECT *
      FROM prescriptions
      LEFT JOIN medications
      ON medications.id = prescriptions.medication_id
      WHERE prescriptions.pet_id = ${req.params.id}`;
    const [data] = await conn.execute(sql);
    console.log('data ===', data);
    return res.send(data);
  } catch (error) {
    console.log('error getting prescriptions', error);
    res.sendStatus(500);
  } finally {
    await conn?.end();
  }
});

module.exports = {
  prescriptions,
};
