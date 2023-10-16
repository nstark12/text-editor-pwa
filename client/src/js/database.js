import { openDB } from 'idb';
const dbName = 'jate'
const dbVersion = 1
const storeName = 'contents'

const initdb = async () =>
  openDB(dbName, dbVersion, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB(dbName, dbVersion)
  const transaction = db.transaction(storeName, 'readwrite')
  const store = transaction.store
  return await store.put(content)
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB(dbName, dbVersion)
  const transaction = db.transaction(storeName, 'readonly')
  const store = transaction.store
  return await store.getAll()
}

initdb();
