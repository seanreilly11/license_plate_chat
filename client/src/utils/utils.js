import moment from "moment";

const CONVO_GAP = "||";

function makeConversationID(id1, id2) {
    return [id1, id2].sort().join(CONVO_GAP);
}

function isToday(date) {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}
function isThisWeek(date) {
    const today = moment();
    return moment(date).isoWeek() === today.isoWeek();
}
function isThisYear(date) {
    const today = new Date();
    return date.getFullYear() === today.getFullYear();
}

// 4ncwe98rh48hc82chiqn
export { makeConversationID, CONVO_GAP, isToday, isThisWeek, isThisYear };
