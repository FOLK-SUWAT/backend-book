var express = require("express");
var router = express.Router();
const bookController = require("../controllres/bookController");
const auth = require("../middleware/auth");

router.get("/", bookController.index);

// router vertifyToken
router.post("/registerbook", auth, bookController.registerbook);
router.put("/update", auth, bookController.update);
router.put("/updatescore", auth, bookController.updatescore);
router.put("/updatestatus", auth, bookController.updatestatus);
router.delete("/delete", auth, bookController.delete);


module.exports = router;
