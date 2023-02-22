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

router.get('/edit/:id', function (req, res, next) {
  res.render('editar',{
    id: req.params.id,
    url: req.query.url,
    titulo: req.query.titulo,
  });
});

router.post('/edit/:id', async function (req, res, next) {
  const crearForm = req.body
  const id = req.params.id
  const result = await pool.promise().query("UPDATE fotos SET ? WHERE id= ?", [crearForm,id])
  
  res.redirect('/fotos')
});

router.get('/delete/:id', async function (req, res, next) {
  const id = Number(req.params.id)

  const result = await pool.promise().query("DELETE from fotos WHERE id = ?", [id])

  res.redirect("/fotos")
});

router.get('/like/:id',async function (req, res, next) {
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
  
  result = result.sort((a,b) => b.likes - a.likes)
  
  res.render('index', {
    fotos: result
  });
});

router.get('/menosvotadas', async function (req, res, next) {
  let [result] = await pool.promise().query("SELECT * FROM fotos")
  result = result.sort((a,b) => b.dislikes - a.dislikes)

  res.render('index', {
    fotos: result
  });
});
module.exports = router;
