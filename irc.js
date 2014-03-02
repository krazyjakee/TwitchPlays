var exec = require('child_process').exec;
var irc = require('irc');
var game = "sonic";

var client = new irc.Client('irc.twitch.tv', 'krazyjakee', {
    channels: ['#krazyjakee'],
    debug: true,
    autoConnect: false,
    showErrors: true,
    port: 6667,
    password: ''
});

console.log('Connecting');

client.connect(3, function(){
	console.log('Connected');
});

client.addListener('message', function (from, to, message) {
    if(game == "bomberman"){
        var split = message.split(' ');
        var player = false;
        if(split[0] == "black"){
            player = "black";
        }
        else if(split[0] == "white"){
            player = "white";
        }

        if(player){
            switch(split[1]){
            	case "right":
            		execute('right', from, player);
            	break;
            	case "down":
            		execute('down', from, player);
            	break;
            	case "left":
            		execute('left', from, player);
            	break;
            	case "up":
            		execute('up', from, player);
            	break;
            	case "bomb":
            		execute('bomb', from, player);
            	break;
                case "special":
                    execute('special', from, player);
                break;
            }
        }
    }else if(game == "sonic"){
        switch(message){
            case "right":
                execute('right', from);
            break;
            case "down":
                execute('down', from);
            break;
            case "left":
                execute('left', from);
            break;
            case "up":
                execute('up', from);
            break;
            case "jump":
                execute('jump', from);
            break;
        }
    }
});

client.addListener('pm', function (from, message) {
  
});

client.addListener('error', function(message) {
    console.log('error: ', message);
});

var execute = function(which, from, player){
	console.log(from + ' sent ' + which);
    var addr = false;
    if(game == "bomberman"){
        addr = "C:\\Users\\Jake\\Desktop\\TwitchPlaysGoldeneye\\scripts\\bomberman\\"+player+"\\"+which+'.exe';
    }else if(game == "sonic"){
        addr = "C:\\Users\\Jake\\Desktop\\TwitchPlaysGoldeneye\\scripts\\sonic\\"+which+'.exe';
    }
    exec(addr,function( error, stdout, stderr) 
        {
           if ( error != null ) {
                console.log(stderr);
           }
       });
}
