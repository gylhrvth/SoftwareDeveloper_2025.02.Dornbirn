declare module 'connect-sqlite3' {
  import session from 'express-session';

  function SQLiteStoreFactory(session: typeof session): any;
  export = SQLiteStoreFactory;
}