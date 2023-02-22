const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/masvotadas', function(req, res, next) {
  res.send("masvotadas")
});

router.get('/menosvotadas', function(req, res, next) {
  res.send("menosvotadas")
});

module.exports = router;
