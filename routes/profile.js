//  imports
const router = require('express').Router();
const { profile } = require("../controllers")

// base url is localhost:4000/profile

//  routes
router.get("/", profile.index);
router.get("/:id", profile.show);
router.post("/", profile.create);
router.put("/:id", profile.update);
router.delete("/:id", profile.destroy);


//  exports
module.exports = router