const express = require("express");
const router = express.Router();
const { getAllBlocked, createBlocked } = require("../controllers/blocked");

router.route("/").get(getAllBlocked).post(createBlocked);

module.exports = router;
