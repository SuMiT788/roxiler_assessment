const express = require("express");
const cors = require("cors");

require("./helpers/dbConnection");
const { port: serverPort } = require("./config");
const router = require("./src/index");

const app = express();
const port = serverPort || 3000;

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`-> Server listening on port ${port}`);
});
