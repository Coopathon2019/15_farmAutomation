var express = require('express');
var router = express.Router();
var fb = require('./../db');

const db = fb.database();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    /*
        let sl = { area: 'asia', checked: false, speed: 20, text:'Cooper', timeLeftToBWH: '05:33:21', waterHeight: 9 };
        writeUserData(sl);
    */
    db.ref('sls').once('value').then(function (snapshot) {
        res.json(snapshot.val());
    })
});


function writeUserData(sl) {
    db.ref('sls/' + Math.floor(Math.random() * Math.floor(1000))).set(sl);
}

module.exports = router;
