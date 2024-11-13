require('dotenv').config();

const handleError = (err) => {
  console.error('Erro de conexão DB:', err);
};

const baseConfig = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }  
  },
  pool: {
    min: 2,
    max: 10,
    afterCreate: (conn, done) => {
      conn.on('error', handleError);
      done(null, conn);
    }
  },
  migrations: {
    directory: './database/migrations'
  },
  seeds: {
    directory: './database/seeds'
  }
};

module.exports = {
  development: baseConfig,
  production: baseConfig
};
