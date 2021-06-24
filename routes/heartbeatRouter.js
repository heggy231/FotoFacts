const express = require("express");
const router = express.Router();
// const { User } = require("../templates");

router.get("/", (req, res) => {
  res.send("I am up");
});

module.exports = router;
