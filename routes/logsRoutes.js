/* eslint-disable camelcase */
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../src/config');

const logsRoutes = express.Router();

// routes
logsRoutes.post('/logs', async (req, res) => {
  let conn;
  try {
    const newLogsObj = req.body;
    console.log('newLogsObj ===', newLogsObj);
    const { pet_id, description, status } = newLogsObj;
    conn = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO logs (pet_id, description, status)
    VALUES (?, ?, ?)`;
    const [insertResultObj] = await conn.execute(sql, [
      pet_id,
      description,
      status,
    ]);
    if (insertResultObj.affectedRows === 1) {
      res.status(201).json(insertResultObj);
      return;
    }
    throw new Error('affected row not 1');
  } catch (error) {
    console.log('error creating logs', error);
    res.sendStatus(500);
  } finally {
    await conn?.end();
  }
});

logsRoutes.get('/logs', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    // eslint-disable-next-line operator-linebreak
    const sql =
      "SELECT * FROM pets LEFT JOIN logs ON pets.id=logs.pet_id WHERE logs.pet_id!='null'";
    const [logsArr] = await conn.execute(sql);
    console.log('logsArr ===', logsArr);
    res.status(200).json(logsArr);
  } catch (error) {
    console.log('error getting meds', error);
    res.sendStatus(500);
  } finally {
    await conn?.end();
  }
});

module.exports = {
  logsRoutes,
};
