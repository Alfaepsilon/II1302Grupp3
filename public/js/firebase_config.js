// Your web app's Firebase configuration
var app_fireBase = {};
(function(){
  var firebaseConfig = {
    apiKey: "AIzaSyBwd2g3SsOtKr5gRWCAsuGPrDMuQiLdvXI", //the apiKey
    authDomain: "cryptochatt-275014.firebaseapp.com",
    databaseURL: "https://cryptochatt-275014.firebaseio.com",
    projectId: "cryptochatt-275014",
    storageBucket: "cryptochatt-275014.appspot.com",
    messagingSenderId: "728951042654",
    appId: "1:728951042654:web:098132c39d1c724c35facf",
    measurementId: "G-G55R26WZ02"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  app_fireBase = firebase;
})()
