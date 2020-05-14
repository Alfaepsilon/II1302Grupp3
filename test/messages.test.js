const formatMessage = require('../utils/messages');
const moment = require('moment');

describe("Format message", () => {
    test("Correct values", () => {
        user = formatMessage("user1", "hello");

        expect(user).toStrictEqual({username: "user1", text: "hello", time: moment().format('h:mm a')})
    })
    test("Wrong values", () => {
        user = formatMessage("user1", "hello");

        expect(user).not.toStrictEqual({username: "user2", text: "he", time: 7.56 })
    })
})