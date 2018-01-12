
//
// You should specify valid serviceAccount
//

var SerialPort = require('serialport');
var admin = require('firebase-admin');
var serviceAccount = require('./tagurox-c8d2c2f897ac.json');

//
// init serialport
//

var port = new SerialPort('/dev/tty.usbmodem1413');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tagurox-38de2.firebaseio.com",
});

port.on('error', function(err) {
  console.log('Error: ', err.message);
})

const parser = port.pipe(new SerialPort.parsers.Readline({ delimiter: '\r\n' }));
parser.on('data', function (line) {
  console.log('Data [', line, ']')
});


//
// send data to device when value changed on firebase
//

function sendDataToDevice(mes) {
  mes = String(mes);
  port.write(mes, function(err) {
    if (err) {
      console.log('Error on write: ', err.message);
      return;
    }
    console.log('State changed')
  });
}

var db = admin.database();
var ref = db.ref("ssr_module/stat");
ref.on("value", function(snapshot) {
  console.log("val=" + snapshot.val());
  sendDataToDevice(snapshot.val())
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
