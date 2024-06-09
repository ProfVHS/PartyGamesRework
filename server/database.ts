import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

export const createDatabaseTables = () => {
  db.serialize(() => {
    db.run(
      `CREATE TABLE users ( 'id' VARCHAR(20) PRIMARY KEY, 'username' VARCHAR(16) NOT NULL, 'score' INTEGER NOT NULL, 'room_id' VARCHAR(5) NOT NULL )`
    );
    db.run(`CREATE TABLE rooms (  'id' VARCHAR(5) PRIMARY KEY )`);
  });
};
