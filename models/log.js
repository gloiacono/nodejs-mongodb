var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
	date: Date,
	transaction: Number, 
	message: String, 
	type: String
});

// note: the parameter n.3 is mandatory if you don't use 
// the collection's naming convention (pluralize !!)
mongoose.model('logs', logSchema, 'logs');