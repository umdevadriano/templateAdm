// database.js - Configuração do banco de dados SQLite
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

sqlite3.verbose();

async function openDB() {
  return open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database
  });
}

// Funções CRUD

// Create
async function createTable() {
  const db = await openDB();
  await db.exec('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, value TEXT)');
}

async function insertItem(value) {
  const db = await openDB();
  await db.run('INSERT INTO items (value) VALUES (?)', value);
}

// Read
async function readItems() {
  const db = await openDB();
  return db.all('SELECT * FROM items');
}

// Update
async function updateItem(id, value) {
  const db = await openDB();
  await db.run('UPDATE items SET value = ? WHERE id = ?', value, id);
}

// Delete
async function deleteItem(id) {
  const db = await openDB();
  await db.run('DELETE FROM items WHERE id = ?', id);
}

export { createTable, insertItem, readItems, updateItem, deleteItem };
