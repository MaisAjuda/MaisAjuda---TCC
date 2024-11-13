const knex = require('knex');
const knexfile = require('../../knexfile');

const environment = process.env.NODE_ENV || 'development';
const config = knexfile[environment];

const db = knex(config);

const testConnection = async () => {
  try {
    await db.queryBuilder().select(db.raw('1'));
    console.log('✅ Conexão com banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar com banco de dados:', error);
    process.exit(1);
  }
};
testConnection();

db.on('error', (error) => {
  console.error('Erro inesperado no banco de dados:', error);
});

module.exports = db; 