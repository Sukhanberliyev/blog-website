

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true, useUnifiedTopology: true
})


const homeStartingContent = "Create your own daily journal";
const aboutContent = "Write, plan, & get organized in one place.";
const contactContent = "Feel free to contact me. Please select the option that suits you the best";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = []; 

app.get("/", (req,res) => {
  res.render("Home", {
    startingContent: homeStartingContent,
    posts: posts
  });
  
  

});

app.get("/about", (req, res) => {
  res.render("about", {aboutParagraph: aboutContent});
});

app.get("/contact", (req, res) => {
  res.render("contact", {contactParagraph: contactContent});
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
   title: req.body.postTitle,
   createdAt: new Date(),
   content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName); 

  posts.forEach((post) => {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  })
});

  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });