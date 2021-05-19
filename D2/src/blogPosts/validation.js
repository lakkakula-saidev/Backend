import { body } from "express-validator";

export const blogPostValidator = [
  body("category").exists().withMessage("Category is a mandatory field!"),
  body("title").exists().withMessage("Title is a mandatory field!"),
  body("category").exists().withMessage("Category is a mandatory field!"),
  body("cover").exists().withMessage("Cover is a required field"),
  body("readTime")
    .exists()
    .isNumeric()
    .withMessage("author is a required field"),
  body("readTime.value")
    .exists()
    .withMessage("Author name is a required field"),
  body("readTime.unit").exists().withMessage("Avatar name is a required field"),
  body("author").exists().isObject().withMessage("author is a required field"),
  body("author.name").exists().withMessage("Author name is a required field"),
  body("author.avatar").exists().withMessage("Avatar name is a required field"),
  body("content").exists().withMessage("Avatar name is a required field"),
];
