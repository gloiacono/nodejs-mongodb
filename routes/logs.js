var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET logs listing. */
router.get('/', function(req, res) {
  res.render('logs', { title: 'Logs' });
});

router.get('/count', function(req, res) {

	var logs = mongoose.model('logs');

	logs.count(function(err, m) {
		res.send('find ' + m + " logs");
	});

});

router.get('/remove', function(req, res) {
	
	var logs = mongoose.model('logs');

	logs.collection.drop();

	res.send('now log is empty!');

});

router.get('/save/:nrec', function(req, res) {
	
	var logs = mongoose.model('logs');
	var nrec = req.params.nrec;
	var msg; 
	var ds, de;

	ds = new Date();

	for (var k=0;k<nrec;k++) {

		log = new logs({
			date: new Date(),
			transaction: Math.floor(Math.random() * 6) + 1, 
			message: 'Message_'+k, 
			type: 'info'
		});

    	log.save(function(error, data){
    		if(error){
        		res.json(error);
    		}
		});

    };

    de = new Date();

    msg = "insert " + nrec + " logs in " + (de-ds) + " ms. "

    res.send(msg)

	console.log(k + " logs inserted.");

});

router.get('/insert/:nrec', function(req, res) {
	
	var logs = mongoose.model('logs');
	var nrec = req.params.nrec;
	var msg; 
	var ds, de;

	ds = new Date();

	var docs = []

	for (var k=0;k<nrec;k++) {
		docs.push({
			date: new Date(),
			transaction: Math.floor(Math.random() * 6) + 1, 
			message: 'Message_'+k, 
			type: 'info'
		})	
	}

	logs.collection.insert(
		docs, 
		function(err, records){
  			
  			de = new Date();

    		msg = "insert " + nrec + " logs in " + (de-ds) + " ms. "

    		res.send(msg)

		}
	);

});

router.get('/show/:nrec', function(req, res) {

	var logs = mongoose.model('logs');
	var nrec = req.params.nrec;

	logs
		.find()
		.limit(nrec)
		.exec(function(error, result){
			res.send(result)
		});

});

module.exports = router;
