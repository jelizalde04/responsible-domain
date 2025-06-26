const fs = require('fs');
const path = require('path');

describe('Microservice Database Connectivity', () => {
  const dbConfigPath = path.resolve(__dirname, '../config/db.js');

  test('should verify that the database configuration file exists', () => {
    const exists = fs.existsSync(dbConfigPath);
    expect(exists).toBe(true);
  });

  test(
    'should establish a successful connection',
    async () => {
      if (!fs.existsSync(dbConfigPath)) {
        throw new Error('Database configuration file not found.');
      }
      const db = require('../config/db');
      try {
        await db.authenticate();
        expect(true).toBe(true);
      } catch (error) {
        expect(error).toBeUndefined();
      } finally {
        await db.close();
      }
    },
    35000 
  );
});