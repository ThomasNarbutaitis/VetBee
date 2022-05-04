const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');

async function createTableDb() {
  console.log('createTableDb model ran');
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = `CREATE TABLE slscom_vetbee4.pets (id INT UNSIGNED NOT NULL AUTO_INCREMENT , 
name TEXT , dob INT, client_email TEXT, archived BOOLEAN, PRIMARY KEY (id)) ENGINE = InnoDB`;

    console.log('pries uzklausa');
    const [result] = await conn.query(sql);
    console.log('po uzklausos');
    console.log('result ===', result);
    return result;
  } catch (error) {
    console.log('error createTableDb', error);
    // return false;
    // throw new Error('error createTableDb');
    throw error;
  } finally {
    conn?.end();
  }
}

// createTableDb();

module.exports = {
  createTableDb,
};
