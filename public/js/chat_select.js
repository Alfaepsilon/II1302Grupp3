//written by Alex
//firebase junk
var chatSelectApp = {};

let homeBtn = document.getElementById("home-btn");
if(homeBtn !== null){
  homeBtn.onclick = function () {
          location.href = "home.html";
      };
}

let profileBtn = document.getElementById("profile-btn");
if(profileBtn !== null){
  profileBtn.onclick = function () {
          location.href = "profile.html";
      };
}

(function(){
  var firebase = app_fireBase;

  var uid = null;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      uid = user.uid;
    }
    else{
      uid = null;
      window.location.replace("index.html");
    }
  });

  function logOut(){
    firebase.auth().signOut();
  }

  chatSelectApp.logOut = logOut;

})()
