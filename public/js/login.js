//written by Alex
(function(){

  //initialize the UI
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'chat_select.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      //firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  ui.start('#firebaseui-auth-container', uiConfig);
})()


/* LEGACY CODE */
//PLEASE NOTE THAT THESE HASHING FUNCTIONS ARE NOT SECURE
//THEY SHOULD NOT BE USED FOR ANY SERIOUS CRYPTOGRAPHY UNLESS
//YOU WANT SENSITIVE DATA TO BE ACCESSED BY UNAUTHORIZED USERS

//navigation
document.getElementById("create-acc-btn").onclick = function () {
        location.href = "register.html";
    };
/*
document.getElementById("log_me_in").onsubmit = function () {
  show_input();
  //location.href = "chat_select.html";
};

//hashing function
//source: https://www.geeksforgeeks.org/how-to-create-hash-from-string-in-javascript/
function hash(string_input){
  let hash = 5059;
  if(string_input.length == 0) return hash;
  for(i=0; i<string_input.length; i++){
    char = string_input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
}
//my salting function
function hash_and_salt(text, salt){
  //debugger;
  input_to_salt = text + salt;
  salted_hash = hash(input_to_salt);
  return salted_hash;
}

//show input
function show_input(){
  let user = document.getElementById("user_field").value;
  let pass = document.getElementById("password_field").value;
  let secret = hash_and_salt(pass, user);
  alert("username: " + user + ", secret(should not match your password input): " + secret);
}
*/
