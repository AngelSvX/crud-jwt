const authDB = require("../models/userDB");
const jwt = require('jsonwebtoken')

module.exports.getAuthUser = async (req, res) => {

  const SELECT = "SELECT * FROM credenciales";

  authDB.query(SELECT, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al colocar los usuarios.");
    } else {
      console.log(result);
      res.send(result)
    }
  });
};

module.exports.postAuthUser = async (req, res) => {
  const { name, password } = req.body;

  const consult = "SELECT * FROM credenciales WHERE usuario = ? AND password = ?";

  try {
    const result = await new Promise((resolve, reject) => {
      authDB.query(consult, [name, password], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    })
    
    if (result.length > 0) {
      const token = jwt.sign({name}, process.env.JWT_CLAVE, {
        expiresIn: '10m'
      })

      return res.send({token})
    } else {
      console.log('Wrong user');
      res.send({message : 'Error, wrong user'}) //Envía mensajes a la consola del navegador
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};