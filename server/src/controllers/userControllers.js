const userDB = require('../models/userDB')

module.exports.createUser = async (req, res) => {
  const nombre = req.body.nombre
  const edad = req.body.edad;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const anios = req.body.anios;

  userDB.query(
    "INSERT INTO clientela(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)",
    [nombre, edad, pais, cargo, anios],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

module.exports.getUser = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize || 5);

  const offset = (page - 1) * pageSize;

  userDB.query(
    "SELECT * FROM clientela LIMIT ?, ?",
    [offset, pageSize],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        userDB.query(
          "SELECT COUNT(*) as total from clientela",
          (err, countResult) => {
            if (err) {
              console.log(err);
            } else {
              const totalUsers = countResult[0].total;
              const totalPages = Math.ceil(totalUsers / pageSize);

              res.send({
                users: result,
                totalPages: totalPages,
              });
            }
          }
        );
      }
    }
  );
};

module.exports.updateUser = async (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    userDB.query(
      "UPDATE clientela SET nombre = ?, edad = ?, pais = ?, cargo = ?, anios = ? WHERE id = ?",
      [nombre, edad, pais, cargo, anios, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
};

module.exports.deleteUser = async (req, res) =>{
  const id = req.params.id;

  userDB.query("DELETE FROM clientela WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}