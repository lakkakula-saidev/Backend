import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import blogPostRoutes from "./blogPosts/index.js";
import authorRoutes from "./Authors/index.js";
import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  forbiddenErrorHandler,
  catchAllErrorHandler,
} from "./errorHandlers.js";

const server = express();
const port = 3001;

server.use(express.json()); // If I do not specify this line of code BEFORE the routes, all the request bodies are going to be undefined
server.use(cors());

server.use("/authors", authorRoutes); // /authors will be the prefix for all the endpoints contained in the authors Router
server.use("/blogPosts", blogPostRoutes);

server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(forbiddenErrorHandler);
server.use(catchAllErrorHandler);

console.table(listEndpoints(server));
server.listen(port, () => {
  console.log("server listening on port", port);
});
