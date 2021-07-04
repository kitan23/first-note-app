const express = require("express");
const router = express.Router();

//Load Model
const Post = require("../models/Post");

//Display all Notes
router.get("/posts", async (req, res) => {
  const posts = await Post.find().lean().sort({ date: -1 });
  res.render("posts/index", { posts });
});

//HOMEPAGE
router.get("/", (req, res) => {
  res.render("index");
});

//ABOUT PAGES
router.get("/about", (req, res) => {
  res.render("about");
});

//Add Notes
router.get("/posts/add", (req, res) => {
  res.render("posts/add");
});

//Post Notes
router.post("/posts", async (req, res) => {
  const { title, text } = req.body;
  console.log(req.body);
  let errors = [];
  if (!title) errors.push({ msg: "Title required" });
  if (!text) errors.push({ msg: "Text required" });
  if (errors.length > 0) res.render("posts/add", { title, text });
  else {
    const newPostData = { title, text };
    const newPost = new Post(newPostData);
    await newPost.save();
    res.redirect("/posts");
  }
});

//Show Notes for editing
router.get("/posts/edit/:id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id }).lean();
  res.render("posts/edit", { post });
});

//Update changes to Database
router.put("/posts/:id", async (req, res) => {
  const { title, text } = req.body;
  await Post.findOneAndUpdate({ _id: req.params.id }, { title, text });
  res.redirect("/posts");
});

//Delete Note
router.delete("/posts/:id", async (req, res) => {
  await Post.findOneAndDelete({ _id: req.params.id });
  res.redirect("/posts");
});

module.exports = router;
