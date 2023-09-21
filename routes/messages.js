const express = require("express");
const router = express.Router();
//const upload = require("../middlewares/multer");
const {
    getMessages,
    addMessage,
    getMessageByID,
    getMessagesByConversation,
    viewMessage,
    removeMessage,
    updateMessage,
    completeMessage,
} = require("../controllers/messages");

router.route("/").get(getMessages).post(addMessage);

router.route("/complete").patch(completeMessage);

router.route("/:id").get(getMessageByID).patch(updateMessage);

router.route("/courses/:id").get(getMessagesByConversation);

router.route("/view/:id").patch(viewMessage);

router.route("/remove/:id").patch(removeMessage);

module.exports = router;
