import session from 'express-session';
import SQLiteStoreFactory from 'connect-sqlite3';

const SQLiteStore = SQLiteStoreFactory(session);