const mysql = require('mysql2');

const authDB = mysql.createConnection({
  host: process.env.DB_AUTH_HOST,
  user: process.env.DB_AUTH_USER,
  password: process.env.DB_AUTH_PASSWORD,
  database: process.env.DB_AUTH_DATABASE,
})

authDB.on('error', (err) =>{
  console.error('Error en la conexión a la base de datos', err.message)
})

module.exports = authDB