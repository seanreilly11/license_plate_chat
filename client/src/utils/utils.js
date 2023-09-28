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

function getFormattedTime(time) {
    let formattedTime = "";
    if (isToday(time)) formattedTime = moment(time).format("h:mm a");
    else if (isThisWeek(time))
        formattedTime = moment(time).format("ddd h:mm a");
    else if (isThisYear(time))
        formattedTime = moment(time).format("DD MMM h:mm a");
    else formattedTime = moment(time).format("DD MMM YYYY h:mm a");
    return formattedTime;
}

// 4ncwe98rh48hc82chiqn
export { makeConversationID, CONVO_GAP, getFormattedTime };
