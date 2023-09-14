const express = require("express");
var bodyParser = require("body-parser");

//express app
const app = express();
app.use(express.json())

//Morgan middleware
const morgan = require("morgan");

//Mongoose for MongoDB connections
const mongoose = require("mongoose");
const Blog = require("./blog");
const pushed = require("./push");
const mongodb = require("mongodb");

//Register view engine
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/views'))
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/jstry'))
app.use(bodyParser.json())

// COnnecting to the MongoDB database
const dbURI = "mongodb+srv://Shashwat:ryangiggs2003@testcluster.ow9vhvj.mongodb.net/";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(7000))
.catch((err) => console.log(err));

// var dbConn = mongodb.MongoClient.connect("mongodb+srv://Shashwat:ryangiggs2003@testcluster.ow9vhvj.mongodb.net/");

//listening for requests
// app.listen(8080);

app.use(morgan("dev"));

//retry
// app.post("/info", (req,res) => {
//     dbConn.then(function(db) {
//       delete req.body._id;
//       db.Collections("pusheds").insertOne(req.body);
//     });
//     res.send("Data received:\n" + JSON.stringify(req.body));
// });

// app.listen(process.env.PORT || 4000, process.env.IP || "0.0.0.0");

// app.get('/items', function(req, res){
//   res.render('index');// if jade
//   // You should use one of line depending on type of frontend you are with
//   res.sendFile(__dirname + '/index.ejs'); //if html file is root directory
//  res.sendFile("index.ejs"); //if html file is within public directory
// });

app.get("./", (req, res) => {
      res.sendFile(__dirname + "index.ejs");
      
  });


app.post("/blogs", (req,res) => {
  const pushe = new pushed({
  // console.log()
    // ` name: ${req.body.box1},
    //  age: ${req.body.box2},
    //  gender: ${req.body.gender},
    //  register: ${req.body.regi}`

    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    register: req.body.register
});
pushe.save().then(
  () => {
    res.status(201).json({
      message: 'Post saved successfully!'
    });
  }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

  //   res.send(
  //   `name: ${req.body.box1},
  //    age: ${req.body.box2},
  //    gender: ${req.body.gender},
  //    register: ${req.body.regi}`
  //   );
  // });


//   pushe.save()
//   .then((result) => {
//     // res.status(201).json(result)
//     res.send(result)
//   })
//   .catch((err) => {
//     // res.status(500).json({err: "Could not create a new document"})
//     console.log(err);
//   });

// })


  //Getting the data
// app.get("/blogs", (req, res) => {
//   pushed.find()
//   .then((result) => {
//     res.send(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// })



//mongoose and mongo sandbox routes
// app.get("/add-blog", (req, res) => {
//     const blog = new Blog({
//     title: "new blog",
//     snippet: "something something",
//     body: "bloggy blog blog"
// });

    
// app.get("/new-blog", (req,res) => {
//   const bloggy = new Blog({
//     title: "Another One",
//     snippet: "something else",
//     body: "Something more than something else"
//   });
// })

  // blog.save()
//   .then((result) => {
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// })


  //Getting the data
// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//   .then((result) => {
//     res.send(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// });


// app.get("/", (req,res) => {

//     res.sendFile("./f.html", {root: __dirname});
// });s

// app.get("/about", (req,res) => {
//     res.sendFile("./about.html", {root: __dirname});
// });

// app.get("/about-us", (req,res) => {
//     res.redirect("/about");
// });


//SAME THING BUT USING EXPRESS
app.get("/", (req,res) => {
    res.render("index");
});

app.get("/about", (req,res) => {
    res.render("about")
});

app.get("/about-us", (req,res) => {
    res.redirect("about");
})

app.get("/blogs", (req,res) =>{
  res.render("index");
})

app.use((req, res) => {
    res.render("404");
});


