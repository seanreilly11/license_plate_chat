function formatMessage({ senderId, text, conversationId }) {
    return {
        senderId,
        text,
        conversationId,
        createdDate: Date.now(),
    };
}

module.exports = formatMessage;
