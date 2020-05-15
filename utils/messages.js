const moment = require('moment');
const rc4 = require('../public/js/keys/rc4');
const key = require('../public/js/keys/key_generator');
// The object so that all messages have the same information.
function formatMessage(username, text) {
    const k = key();
    text = rc4(text, k);
    return {
        username,
        text,
        time: moment().format('h:mm a'),
        key: k
    }
}

module.exports = formatMessage;
