const express = require('express');
const router = express.Router();
const mysql = require("mysql2/promise")

const { pool } = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "fotosDB"
})

router.get('/', async function (req, res, next) {
  const [result] = await pool.promise().query("SELECT * FROM fotos")
  console.log(result);
  res.render('index', {
    fotos: result
  });
});

router.get('/create', function (req, res, next) {
  res.render('crear');
});
router.post('/create', async function (req, res, next) {
  const { url, titulo, descripcion } = req.body
  const crearForm = {
    url,
    titulo,
    descripcion ,
    likes: 0,
    dislikes: 0
  }
  console.log(crearForm);
  const result = await pool.promise().query("INSERT INTO fotos SET ?", [crearForm])
  console.log(result);
  res.redirect('/fotos')
});

router.get('/edit', function (req, res, next) {
  res.render('editar');
});

router.get('/masvotadas', function (req, res, next) {
  res.send("masvotadas")
});

router.get('/menosvotadas', function (req, res, next) {
  res.send("menosvotadas")
});

module.exports = router;
