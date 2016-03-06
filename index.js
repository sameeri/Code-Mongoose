'use strict';

// Inspect: what is on mongoose
var mongoose = require('mongoose');
console.log('The mongoose library', mongoose);


// Inspect: what is the Schema constructor function
var Schema = mongoose.Schema;
console.log('The schema ctor fn', Schema);

var schemaSpec = {
  'name': String
};

// Inspect: an object created by the schema constructor
var bookSchema = new Schema(schemaSpec);
console.log('Books Schema', bookSchema);


// Inspect: the model helper method.
console.log('The model helper method', mongoose.model)

// Create a model object and inspect it
// The model method create a constructor function and returns it.
// Using this constructor function we can now create model objects.
// Treat the returned function as a class. You can instantiate/operate on the class now.
var BookModel = mongoose.model('Book', bookSchema);
console.log('What is the model object returned by model?', BookModel);


// Create a model instance
var theGoodParts = new BookModel({
  'name': 'JavaScript: The Good Parts'
});

// Inspect : The model instance
console.log("What's the good parts?", theGoodParts);

// Create a connection object.
mongoose.connect('mongodb://localhost/books');
var db = mongoose.connection;

//Inspect the connection object
console.log("What's the connection object?", db);

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Yay We are connected');

  //Save a doc.
  // Model instances have instance methods that lets you perform saves.
  theGoodParts.save(function(err, fluffy) {
    if (err) return console.error(err);
    console.log('the doc was saved successfully');

    //Read the doc, after it gets saved. Here you have to access the Model. Because the model represents the collection.
    BookModel.find(function(err, books) {
      if (err) {
        console.log(err);
      }
      console.log("Books after saving the good parts", books);
      //We can also use Model's create method to create a document.
      BookModel.create({
        'name': 'JavaScript The definitive guide'
      }, function(err, books) {
        if (err) {
          console.log(err);
        }
        console.log("Books after saving the definitive guide", books);

        //Remove all and read again.
        BookModel.remove(function(err) {
          if (err) return handleError(err);
          // Now reading should give us back 0 docs.
          BookModel.find(function(err, books) {
            if (err) {
              console.log(err);
            }
            console.log("Books after remove all", books);
          })
        });
      });

    })

  });






});
