const CONVO_GAP = "||";

function makeConversationID(id1, id2) {
    return [id1, id2].sort().join(CONVO_GAP);
}

// 4ncwe98rh48hc82chiqn
module.exports = {
    makeConversationID,
    CONVO_GAP,
};
