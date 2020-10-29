//  imports
const express = require("express");
const router = express.Router();
const { invitation } = require("../controllers")

//  routes
router.get("/", invitation.index);
router.get("/:id", invitation.show);
router.post("/", invitation.create);
router.put("/:id", invitation.update);
router.delete("/:id", invitation.destroy);


//  exports
module.exports = router