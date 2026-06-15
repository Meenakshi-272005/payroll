const express = require("express");
const {
  createStatutoryRule,
  getStatutoryRules
} = require("../controllers/statutory.Controller");

const router = express.Router();

router.post("/", createStatutoryRule);
router.get("/", getStatutoryRules);

module.exports = router;
