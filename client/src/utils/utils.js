const CONVO_GAP = "(!)";

function makeConversationID(data) {
    return [data, "6503a039a3dd67f9ec8cb815"].sort().join(CONVO_GAP);
}

// 4ncwe98rh48hc82chiqn
module.exports = {
    makeConversationID,
    CONVO_GAP,
};
