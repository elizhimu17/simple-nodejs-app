
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("customers", function(err, res) {   //creating a collection in mydb database(similar to table in MySQL)
    if (err) throw err;
    console.log("Table Created");
    var myobj = [             //using variable to insert multiple documents at the same time
    { name: 'Hannah', address: 'Mountain 21'},
    { name: 'Michael', address: ' '},
    { name: 'Sandy', address: 'Ocean blvd 2'},
    { name: 'Betty', address: 'Green Grass 1'},
    { name: 'Richard', address: ' '},
    { name: 'Susan', address: 'One way 98'},
    { name: 'Vicky', address: 'Yellow Garden 2'},
    { name: 'Ben', address: 'Park Lane 38'},

  ];
  db.collection("customers").insert(myobj, function(err, res) { //inserting documents into collection
    if (err) throw err;
    console.log("Number of records inserted: " + res.insertedCount);
    db.collection("customers").find({}).toArray(function(err, result) { //to display all the documents
      if (err) throw err;
      console.log(result);
      db.close();
      });
    });
  });
});
