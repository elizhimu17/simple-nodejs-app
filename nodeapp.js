//type this command in terminal to release ports already in use : killall -9 node or just change the port number you are listening to( For example: 4000, 3000, 3001)
var http=require('http');
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/mydb"; //accessing mydb database
var str="";

http.createServer(function(req,res){ //creating a server to listen to specified port using http module
  res.writeHead(200, {
    'Content-Type': 'text/html' //to specify the type of page
  });
  MongoClient.connect(url,function(err,db){ // establishing connection to mongodb server
    if(err) throw err;
    var collection=db.collection('customers'); //accessing customers collection which is already created using database.js
    var cursor=collection.find({});  //to display all collections
    str="";
    cursor.forEach(function(item){
      if(item!= null){
        str=str+"<br>"+"Name: "+item.name+"Address: "+item.address+"<br>";
      }

    },function(err){
      if(err) throw err;
      //res.send(str);
      res.write('<!doctype html>\n<html lang="en">\n' +
        '\n<meta charset="utf-8">\n<title>Test web page on node.js</title>\n' +
        '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' +
        '\n\n<h1>Node App</h1>\n' +
        '<div id="content">'+str+'</div>' +
        '\n\n'); //creating a simple html page
        res.end(); //ending the response
      db.close(); //closing the database connection
    });
  });
}).listen(8888,'127.0.0.1');
console.log('server running at http://127.0.0.1:8888');
