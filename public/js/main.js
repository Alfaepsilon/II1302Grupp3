const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

/*
 * RC4 symmetric cipher encryption/decryption (From Github user salipro4ever, forked from original creator farhadi)
 *
 * @license Public Domain
 * @param string key - secret key for encryption/decryption
 * @param string str - string to be encrypted/decrypted
 * @return string
 */
 /*
function rc4(str, key) {
  var s = [], j = 0, x, res = '';
  for (var i = 0; i < 256; i++) {
    s[i] = i;
  }
  for (i = 0; i < 256; i++) {
    j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
    x = s[i];
    s[i] = s[j];
    s[j] = x;
  }
  i = 0;
  j = 0;
  for (var y = 0; y < str.length; y++) {
    i = (i + 1) % 256;
    j = (j + s[i]) % 256;
    x = s[i];
    s[i] = s[j];
    s[j] = x;
    res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
  }
  return res;
}*/
// Get room and username from URL
const {username, room} = Qs.parse(location.search , {
    ignoreQueryPrefix: true
});

// Join chatroom
socket.emit('joinRoom' , {username, room});

// Get the room and users
socket.on('roomUsers', ({users, room}) => {
    outputRoomName(room);
    outputUsers(users);
})

// Message from server
socket.on('message', message => {
  console.log(message);
  outputMessage(message);

  // scroll the chat down to the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// submit message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text from form
    const msg = e.target.elements.msg.value;
    //const msg = e.target.elements.msg.value;

    // Emit message to the server
    socket.emit('chatMessage' ,msg);

    // Clear the input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});



//ouput message to DOMView
function outputMessage(message){
  console.log(message.text);
  message.text = rc4(message.text, message.key);
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM view
function outputRoomName(room) {
    roomName.innerText = room;
}

// add user to the userlist in the DOM view
function outputUsers(users) {
    userList.innerHTML = `
       ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}
