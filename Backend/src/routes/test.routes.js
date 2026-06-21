// const express = require("express");
// const router = express.Router();

// const { generateTest } = require("../controllers/test.controller");
// const { protect } = require("../middlewares/auth.middleware");


// router.post("/generate", protect, generateTest);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  generateTest,
  getCurrentTest,
  deleteCurrentTest
} = require("../controllers/test.controller");

const {
  protect
} = require("../middlewares/auth.middleware");

router.post(
  "/generate",
  protect,
  generateTest
);

router.get(
  "/current",
  protect,
  getCurrentTest
);

router.delete(
  "/current",
  protect,
  deleteCurrentTest
);

module.exports = router;