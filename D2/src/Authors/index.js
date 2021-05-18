/*
****************** STUDENTS CRUD ********************
1. CREATE → POST http://localhost:3001/students (+ body)
2. READ → GET http://localhost:3001/students (+ optional query parameters)
3. READ → GET http://localhost:3001/students/:id
4. UPDATE → PUT http://localhost:3001/students/:id (+ body)
5. DELETE → DELETE http://localhost:3001/students/:id
*/

import express from "express";
import fs from "fs"; // core module to acess  content in the files like READ, Write into the files
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const authorRouter = express.Router();

const filePath = fileURLToPath(import.meta.url);
const currentPath = dirname(filePath);
const authorJSONPath = join(currentPath, "authors.json");

authorRouter.post("/", (req, res) => {
  const newAuthor = { ...req.body, _id: uniqid(), createdAt: new Date() };
  const contentAsBuffer = fs.readFileSync(authorJSONPath).toString(); // 1. read the requested JSON file as the as human readable by converting the BUFFER into human readable
  const authors = JSON.parse(contentAsBuffer);
  authors.push(newAuthor);
  fs.writeFileSync(authorJSONPath, JSON.stringify(authors));
  res.status(201).send(newAuthor._id);
});

authorRouter.get("/", (req, res) => {
  const contentAsBuffer = fs.readFileSync(authorJSONPath); // 1. read the requested JSON file as the Buffer of machin unerstanalll and not han understandable
  const authors = JSON.parse(contentAsBuffer);
  res.send(authors);
});

authorRouter.get("/:id", (req, res) => {
  const author = JSON.parse(fs.readFileSync(authorJSONPath).toString()).find(
    (item) => item._id === req.params.id
  );

  res.send(author);
});
authorRouter.put("/:id", (req, res) => {
  const remainingAuthors = JSON.parse(
    fs.readFileSync(authorJSONPath).toString()
  ).filter((item) => item._id !== req.params.id);
  const updatedAuthor = { ...req.body, _id: req.params.id };
  remainingAuthors.push(updatedAuthor);
  fs.writeFileSync(authorJSONPath, JSON.stringify(authors));
  res.send(updatedAuthor);
});
authorRouter.delete("/:id", (req, res) => {
  const remainingAuthors = JSON.parse(
    fs.readFileSync(authorJSONPath).toString()
  ).filter((item) => item._id !== req.params.id);

  fs.writeFileSync(authorJSONPath, JSON.stringify(authors));
  res.status(204).send();
});
export default authorRouter;
