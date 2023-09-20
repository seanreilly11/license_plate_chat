const express = require("express");
const router = express.Router();
const {
    getConversations,
    getConversationByID,
    addConversation,
    updateConversation,
    removeConversation,
} = require("../controllers/conversations");

router.route("/").get(getConversations).post(addConversation);

router.route("/:id").get(getConversationByID).patch(updateConversation);

router.route("/remove/:id").patch(removeConversation);

module.exports = router;
