var admin = require('firebase-admin');
var serviceAccount = require('./gjgjgj-dab19-firebase-adminsdk-tlcuq-a9005e344c.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gjgjgj-dab19.firebaseio.com"
});


module.exports = admin;