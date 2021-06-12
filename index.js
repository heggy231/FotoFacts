const express = require("express");
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");

const app = express();

// ----------------------------------------------------------------------------
//                                Middleware
// ----------------------------------------------------------------------------
app.use(cors());
app.use(express.static("public"));
// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded (converts str => json)

// Configure Template Engine
app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html");

app.get("/heartbeat", (req, res) => {
  res.send("I am up");
});

app.listen("8080", () => {
  console.log("running on port http://localhost:8080");
});
