import * as SQLite from 'expo-sqlite';

let db;

export async function init() {
  db = await SQLite.openDatabaseAsync('places');
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      );
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    throw error;
  }
}

export async function insertPlace(place) {
  // Ensure the database is open before inserting
  if (!db) {
    db = await SQLite.openDatabaseAsync('places');
  }
  try {
    const result = await db.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]
    );
    
    // result.lastInsertRowId contains the ID of the new entry
    return result; 
  } catch (error) {
    console.error('Insert failed:', error);
    throw error;
  }
}

export async function fetchPlaces(){
  if(!db){
    db = await SQLite.openDatabaseAsync('places');
  }
  try{
    const result = await db.getAllAsync(
      'SELECT * FROM places',
    )
    return result
  }catch(error){
    throw error
  }
}

export async function fetchPlaceDetails(id) {
  if(!db){
    db = await SQLite.openDatabaseAsync('places')
  }
  try{
    const result = await db.getFirstAsync(
      'SELECT * FROM places WHERE id = ?',
      [id]
    )
    return result
  }catch(error){
    throw error
  }
}