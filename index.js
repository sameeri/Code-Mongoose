'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Set mongoose to work with ES6 promises

mongoose.Promise = Promise;


//Routine work:
// Setup a connection
// create a schema definition
// create a model from the schema defined

var languageSchemaDefinition = {
  'name': String
};

var languageSchema = new Schema(languageSchemaDefinition);

var LanguageModel = mongoose.model('Languages', languageSchema);


mongoose.connect('mongodb://localhost/languages');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', onOpen);

function onOpen() {
  console.log('Yay We are connected');

  LanguageModel.find().then(function onSuccess(docs) {
    console.log('Yay, we got docs', docs);
  }, function onError(err) {
    console.log('error reading docs', err);
  });

  var javaScript = {
    'name': 'JavaScript'
  };

  LanguageModel.create(javaScript).then(
    function onCreateSuccess(docs) {
      console.log('Yay, we created docs', docs);

      //Let's read again
      LanguageModel.find().then(
        function onSuccess(docs) {
          console.log('Yay, we got docs', docs);

          var doc = docs[0];
          console.log("What's the doc bro?", doc);


                //Find based on id.
                LanguageModel.findById(doc._id).then(
                  function onSuccess(docs) {
                      console.log('Yay, we got a doc by its id', docs);
                      //Remove based on id now :)
                      LanguageModel.findByIdAndRemove(doc.id).then(
                      function onSuccess(docs) {
                            console.log('Yay, we removed a doc by its id', docs);
                          },
                        function onError(err) {
                          console.log('error reading doc by id', err);
                        }
                      );
                    });
        },
        function onError(err) {
          console.log('error reading docs', err);
        }
      );
    },
    function onCreateError(err) {
      console.log('error creating doc', err);
    }
  );

}
