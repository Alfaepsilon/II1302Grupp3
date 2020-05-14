const moment = require('moment');
// The object so that all messages have the same information.
function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;