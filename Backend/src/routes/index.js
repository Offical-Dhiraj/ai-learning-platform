const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/test", require("./test.routes"));
router.use("/results", require("./result.routes"));
router.use("/studyplan", require("./studyPlan.routes"));
router.use("/progress", require("./progress.routes"));

module.exports = router;