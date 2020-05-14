const {userJoin, getTheCurrentUser, userLeaves, getRoomUsers,reset} = require('../utils/users');

beforeEach(() => {
    reset()
})


describe("creating new user", () => {
    test("testing if equal", () => {
        const users = [];
    
        users.push(userJoin(3, "new-user", "room1"));
    
        expect(users[0]).toStrictEqual({id:3, username:"new-user", room:"room1"})
    })
    test("testing if not equal", () => {
        const users = [];
    
        users.push(userJoin(3, "new-user", "room1"));
    
        expect(users[0]).not.toStrictEqual({id:4, username:"new-user1", room:"room2"})
    })
    test("testing values == undefined", () => {
        const users = [];
    
        users.push(userJoin());
    
        expect(users[0]).toStrictEqual({id:undefined, username:undefined, room:undefined})
    })
    test("testing values == null", () => {
        const users = [];
    
        users.push(userJoin(null, null, null));
    
        expect(users[0]).toStrictEqual({id:null, username:null, room:null})
    })
})

describe("Get user with id", () => {
    test("Get correct user", () => {
        const users = [];

        users.push(userJoin(1, "user1", "room1"))
        users.push(userJoin(2, "user2", "room2"))
        users.push(userJoin(3, "user3", "room3"))

        expect(getTheCurrentUser(2)).toStrictEqual(users[1])

    })
    test("Get wrong user", () => {
        const users = [];

        users.push(userJoin(1, "user1", "room1"))
        users.push(userJoin(2, "user2", "room2"))
        users.push(userJoin(3, "user3", "room3"))

        expect(getTheCurrentUser(3)).not.toStrictEqual(users[0])
    })
})
describe("Remove user from users array", () => {
    test("Correct user removed", () => {
        const users= []

        users.push(userJoin(1, "user1", "room1"))
        users.push(userJoin(2, "user2", "room2"))       
        
        user = userLeaves(2);

        expect(user).toStrictEqual(users[1])
    })
    test("Remove user not in the array", () => {
        const users = []

        users.push(userJoin(1, "user1", "room1"))
        users.push(userJoin(2, "user2", "room2"))       
        
        user = userLeaves(4);

        expect(user).not.toBeDefined();
    })
    test("Remove with null as parameter", () => {
        const users = []

        users.push(userJoin(1, "user1", "room1"))
        users.push(userJoin(2, "user2", "room2"))       
        
        user = userLeaves(null);

        expect(user).not.toBeDefined()
    })
    test("Remove with undefined as parameter", () => {
        const users = []

        users.push(userJoin(1, "user1", "room1"))
        users.push(userJoin(2, "user2", "room2"))       
        
        user = userLeaves(undefined);

        expect(user).not.toBeDefined()
    })
})
describe("Get users from desired room", () => {
    test("Get correct users", () => {
        const users = []

        users.push(userJoin(1, "user1", "room1"))
        userJoin(2, "user2", "room2")
        users.push(userJoin(3, "user3", "room1"))
        userJoin(4, "user4", "room2")

        expect(getRoomUsers("room1")).toStrictEqual(users)
    })
    test("Room not registered as parameter", () => {
        expect(getRoomUsers("room54")).toStrictEqual([])
    })
    test("Null as parameter", () => {
        expect(getRoomUsers(null)).toStrictEqual([])
    })
    test("Undefined as parameter", () => {
        expect(getRoomUsers(undefined)).toStrictEqual([])
    })
})