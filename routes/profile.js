//  imports
const router = require('express').Router();
const { profile } = require("../controllers")

//  routes
router.get("/", profile.index);
router.get("/:id", profile.show);
router.post("/", profile.create);
router.put("/:id", profile.update);
router.delete("/:id", profile.destroy);


//  exports
module.exports = router