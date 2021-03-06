var values = [];
var host = "N/A";
var port = -1;

$(document).ready(function() {
    $.get("../properities.txt", function(data) {
        values = data.split("\n");
		return values;
    }, 'text');
	return values;
});

host = values[0];
port = Number(values[1]);

if(host == "N/A" || port == -1) {
	console.log("ERROR: Couldn't find host/port");
} else {
	console.log("Creating socket...");
	var socket = io('http://' + host + ":" + port);
	if(typeof socket === 'undefined') {
		console.log("Failed to create socket");
	} else {
		console.log("Successfully created socket");
	}
}

socket.on('reg-complete', function(data){
	if(data.success){
		console.log("Successfully created account!");
	} else {
		console.log("Failed to create account.");
		console.log("Reason: ", data.reason);
		console.log("ID: ", data.id);
	}
});

socket.on('reg-status', function(data) {
	console.log(data);
});

$('form').submit(function(){
	console.log("Registering...");
    socket.emit('register', {email: $('#email').val(), pass: $('#passwrd'.val())});
    return false;
});

function register(email, passwrd) {
	console.log("Registering...");
	socket.emit('register', {email: email, pass: passwrd});
}