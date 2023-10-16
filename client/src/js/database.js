import { openDB } from 'idb';
const dbName = 'jate'
const dbVersion = 1

const initdb = async () =>
  openDB(dbName, dbVersion, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(dbName, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB(dbName, dbVersion)
  const transaction = db.transaction(dbName, 'readwrite')
  const store = transaction.objectStore(dbName)
  const request = store.put({ id: 1, content: content })
  const result = await request
  console.log(result)
}

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB(dbName, dbVersion)
  const transaction = db.transaction(dbName, 'readonly')
  const store = transaction.objectStore(dbName)
  const request = store.getAll()
  const result = await request
  console.log(result)

  if(result.length <1) {
    return
  }

  return result[0].content
}

initdb();
