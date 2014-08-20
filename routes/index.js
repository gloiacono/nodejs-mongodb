var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('logs', { title: 'Logs' });
});

module.exports = router;
