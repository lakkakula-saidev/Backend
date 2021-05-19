import express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";
import { validationResult } from "express-validator";
import createError from "http-errors";
import { blogPostValidator } from "./validation.js";

const blogPostRouter = express.Router();

const blogPostsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "blogPosts.json"
);

const getBlogPosts = () => {
  const content = JSON.parse(fs.readFileSync(blogPostsJSONPath));
  return content;
};

const editedBlogPosts = (newContent) => {
  fs.writeFileSync(blogPostsJSONPath, JSON.stringify(newContent));
};

blogPostRouter.post("/", blogPostValidator, (req, res, next) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(createError(400, { errorList: errors }));
    } else {
      const newBlog = { ...req.body, _id: uniqid(), createdAt: new Date() };
      const prevBlogs = getBlogPosts(); // 1. read the requested JSON file as the as human readable by converting the BUFFER into human readable
      prevBlogs.push(newBlog);
      editedBlogPosts(prevBlogs);
      res.status(201).send(newBlog._id);
    }
  } catch (error) {}
});

blogPostRouter.get("/", (req, res) => {
  let blogPosts = getBlogPosts();
  res.send(blogPosts);
});

blogPostRouter.get("/:id", (req, res) => {
  const blogPosts = getBlogPosts();
  const particularBlogPost = blogPosts.find(
    (item) => item._id === req.params.id
  );

  res.send(particularBlogPost);
});

blogPostRouter.put("/:id", (req, res) => {
  const blogPosts = getBlogPosts();

  const remainingBlogPosts = blogPosts.filter(
    (item) => item._id !== req.params.id
  );
  const updatedBlog = { ...req.body, _id: req.params.id };
  remainingBlogPosts.push(updatedBlog);
  editedBlogPosts(remainingBlogPosts);
  res.send(updatedBlog);
});

blogPostRouter.delete("/:id", (req, res) => {
  const remainingBlogPosts = getBlogPosts().filter(
    (item) => item._id !== req.params.id
  );

  editedBlogPosts(remainingBlogPosts);
  res.status(204).send();
});
export default blogPostRouter;
