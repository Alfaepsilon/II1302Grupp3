//Taken from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript user: csharptest.net, edited by: Henrik Cassé
function key_generator() {
   var length = Math.floor((Math.random() * 10) + 1); // Taken from https://www.w3schools.com/jsref/jsref_random.asp
   var result = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

module.exports = key_generator;
