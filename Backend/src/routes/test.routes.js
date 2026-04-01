const express = require("express");
const router = express.Router();

const { generateTest } = require("../controllers/test.controller");
const { protect } = require("../middlewares/auth.middleware");


router.post("/generate", protect, generateTest);

module.exports = router;