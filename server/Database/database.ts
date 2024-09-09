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
      `CREATE TABLE users ( 'id' VARCHAR(20) PRIMARY KEY, 'nickname' VARCHAR(16) NOT NULL, 'score' INTEGER NOT NULL, 'room_id' VARCHAR(5) NOT NULL, 'isHost' BOOLEAN NOT NULL, 'position_in_room' INTEGER NOT NULL, 'alive' BOOLEAN NOT NULL, 'isDisconnected' BOOLEAN NOT NULL, 'selected_id' INTEGER NOT NULL, 'ready' BOOLEAN NOT NULL, FOREIGN KEY (room_id) REFERENCES rooms(id))`
    );
    db.run(
      `CREATE TABLE rooms (  'id' VARCHAR(5) PRIMARY KEY, 'round' INTEGER NOT NULL, 'players_ready' INTEGER NOT NULL, 'current_minigame' INTEGER NOT NULL, 'turn' INTEGER NOT NULL)`
    );
    db.run(
      `CREATE TABLE click_the_bomb ( 'id' VARCHAR(5) PRIMARY KEY, 'counter' INTEGER NOT NULL, 'max' INTEGER NOT NULL, FOREIGN KEY (id) REFERENCES rooms(id))`
    );
    db.run(
      `CREATE TABLE cards ( 'id' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 'card_id' INTEGER NOT NULL, 'score' INTEGER NOT NULL, 'isPossitive' BOOLEAN NOT NULL, 'room_id' VARCHAR(5) NOT NULL, FOREIGN KEY (id) REFERENCES rooms(id))`
    );
  });
};
