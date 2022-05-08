var express = require('express');
var router = express.Router();

const config =require('./config');
const x = 3;
const name = config.name
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(`${name}`);
  res.render('index', { title:  x });
});

module.exports = router;
