var html ="<html>" +
"<head>" +
"<style type=\"text/css\">" +
".start{" +
"	font-size:36px;" +
"	position: absolute;" +
"    top: 20%;" +
"    left: 33%;" +
"    transform: translateX(-50%) translateY(-50%);" +
"}" +
"</style>" +
"<meta charset=\"ISO-8859-1\">" +
"<title>499 Project</title>" +
"</head>" +
"<script>" +
"	var name;" +
"	var score = 0;" +
"	function play(){" +
"		name = document.getElementById('name').value;" +
"		document.getElementById('first').style.display = 'none';" +
"		console.log('hit the play button name: ' + name);" +
"		document.getElementById('second').style.display = 'block';" +
"		document.getElementById('second').innerHTML = name + '\\nScore: ' + score;" +
"	}" +
"</script>" +
"<body>" +
"<div class=\"start\" id=\"first\">" +
"	Welcome. Enter your name." +
"	" +
"	<input type=\"text\" id=\"name\">" +
"	<button onclick=\"play()\">Enter</button>" +
"</div>" +
"<div id=\"second\" style=\"display:none\" class=\"start\">" +
"	" +
"</div>" +
"</body>" +
"</html>";



var http = require('http');
    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(html);

    }).listen(1337, "127.0.0.1");
    console.log('Server running at http://127.0.0.1:1337/');


var awsIot = require('aws-iot-device-sdk');
    var device = awsIot.device({
     keyPath: "cert/79b2885f48-private.pem.key",
     certPath: "cert/79b2885f48-certificate.pem.crt",
     caPath: "cert/VeriSign-Class_3-Public-Primary-Certification-Authority-G5.pem",
     clientId: "nexus6",
     region: "us-west-2"
    });

   device
  .on('connect', function() {
    console.log('connect');
    device.subscribe('things/ee499-projecto');
    //device.publish('things/ee499-projecto', JSON.stringify({ test_data: 1}));
    });

device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
    http.res.end(html);
  });