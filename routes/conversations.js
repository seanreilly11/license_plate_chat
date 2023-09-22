const express = require("express");
const router = express.Router();
const {
    getConversations,
    getConversationByID,
    getConversationsByUser,
    getConversationByConvoID,
    createConversation,
    updateConversation,
    removeConversation,
} = require("../controllers/conversations");

router.route("/").get(getConversations).post(createConversation);

router.route("/user/:id").get(getConversationsByUser);

router.route("/find/:id").get(getConversationByConvoID);

router.route("/:id").get(getConversationByID).patch(updateConversation);

router.route("/remove/:id").patch(removeConversation);

module.exports = router;
