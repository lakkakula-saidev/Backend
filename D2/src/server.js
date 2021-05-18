import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";

import authorRoutes from "./Authors/index.js";

const server = express();
const port = 3001;

server.use(express.json()); // If I do not specify this line of code BEFORE the routes, all the request bodies are going to be undefined
server.use(cors());

server.use("/authors", authorRoutes); // /students will be the prefix for all the endpoints contained in the students Router

console.table(listEndpoints(server));
server.listen(port, () => {
  console.log("server listening on port", port);
});
