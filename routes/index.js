const dotenv = require("dotenv")
dotenv.config()

const express = require('express');
const router = express.Router();
const mysql = require("mysql2/promise")
const { MYSQL_HOST,  MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = require("../db/conf")
console.log(MYSQL_HOST,  MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE);

const { pool } = mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE
})
// const { pool } = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   port: 3307,
// })


router.get('/', async function (req, res, next) {
  const [result] = await pool.promise().query("SELECT * FROM fotos")
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
    descripcion,
    likes: 0,
    dislikes: 0
  }
  const result = await pool.promise().query("INSERT INTO fotos SET ?", [crearForm])
  res.redirect('/fotos')
});




router.get('/edit/:id', function (req, res, next) {
  res.render('editar', {
    id: req.params.id,
    url: req.query.url,
    titulo: req.query.titulo,
  });
});

router.post('/edit/:id', async function (req, res, next) {
  const crearForm = req.body
  const id = req.params.id
  const result = await pool.promise().query("UPDATE fotos SET ? WHERE id= ?", [crearForm, id])

  res.redirect('/fotos')
});




router.get('/delete/:id', async function (req, res, next) {
  const id = Number(req.params.id)

  const result = await pool.promise().query("DELETE from fotos WHERE id = ?", [id])

  res.redirect("/fotos")
});




router.get('/like/:id', async function (req, res, next) {
  const id = req.params.id
  const result = await pool.promise().query("UPDATE fotos SET likes=likes+1 WHERE id= ?", [id])
  res.redirect("/fotos")
});






router.get('/dislike/:id', async function (req, res, next) {
  const id = req.params.id
  const result = await pool.promise().query("UPDATE fotos SET dislikes=dislikes+1 WHERE id= ?", [id])
  res.redirect("/fotos")
});




router.get('/masvotadas', async function (req, res, next) {
  let [result] = await pool.promise().query("SELECT * FROM fotos")

  result = result.sort((a, b) => b.likes - a.likes)

  res.render('index', {
    fotos: result
  });
});



router.get('/menosvotadas', async function (req, res, next) {
  let [result] = await pool.promise().query("SELECT * FROM fotos")
  result = result.sort((a, b) => b.dislikes - a.dislikes)

  res.render('index', {
    fotos: result
  });
});

router.post('/comment/:id', async function (req, res, next) {
  const { userComment, comentario } = req.body
  const id = req.params.id
  const [[ultimoComent]] = await pool.promise().query("SELECT comment from fotos")

  let comment = ` ${userComment}: ${comentario} `
  comment = `${ultimoComent.comment} \n ${comment} `
  const result = await pool.promise().query("UPDATE fotos SET comment = ? WHERE id = ?", [comment, id])

  res.redirect("/fotos")
});



module.exports = router;
