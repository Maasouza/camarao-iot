client = require('emitter-io').connect();
// use require('emitter-io').connect() on NodeJS

// once we're connected, subscribe to the 'chat' channel
client.subscribe({
	key: "Lxdppx1WtAsSHTYWP5c5N-AT5gjR2yyf",
	channel: "camarao-iot-test"
});

// on every message, print it out
client.on('message', function(msg){
	console.log( msg.asObject() );
});

function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function pub(){
	out = {
		'red':  randomInt(1,3000),
		'green':  randomInt(1,3000),
		'blue':  randomInt(1,3000),
		'temperature': randomInt(10,40),
		'water_level': randomInt(1,100)%2,
		'salinity': randomInt(10,30),
		'buoy_id': randomInt(1,100)%5 + 1,
    'timestamp': new Date(),
    'time': 123
	}
	console.log("Publishing \n"+JSON.stringify(out))
	client.publish({
		key: "Lxdppx1WtAsSHTYWP5c5N-AT5gjR2yyf",
		channel: "camarao-iot-test",
		message: JSON.stringify(out)
	});
}


setInterval(pub, 2000)
