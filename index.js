'use strict';

//Inspect what is on mongoose
var mongoose = require('mongoose');
console.log('The mongoose library', mongoose);


//inspect what is the Schema constructor function
var Schema = mongoose.Schema;
console.log('The schema ctor fn', Schema);

var schemaSpec = {
  'name': String
};

//inspect an object created by the schema constructor
var bookSchema = new Schema(schemaSpec);
console.log('Books Schema', bookSchema);
