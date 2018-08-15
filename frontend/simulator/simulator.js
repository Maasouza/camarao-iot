const io = require('socket.io')();

config ={
  1:{
    r:2000,
    g:2000,
    b:2000,
    t:30,
    s:30,
    n:1
  },
  2:{
    r:2000,
    g:2000,
    b:2000,
    t:30,
    s:30,
    n:1
  },
  3:{
    r:2000,
    g:2000,
    b:2000,
    t:30,
    s:30,
    n:1
  },
  4:{
    r:2000,
    g:2000,
    b:2000,
    t:30,
    s:30,
    n:1
  },
  5:{
    r:2000,
    g:2000,
    b:2000,
    t:30,
    s:30,
    n:1
  },
}

io.on('connection', (client) => {
  client.on('subscribe', (interval) => {
    console.log('client '+client.id+' is subscribing with interval ', interval);
    setInterval(() => {
      n_buoys = 5
      for(var id=1 ; id< n_buoys+1 ; id++)
      {
        if(Math.random()<0.6){
          x = -1
          if(Math.random()<0.5){
            x = 1
          }
          config[id].t += x*Math.random().toFixed(2)
        }
        if(Math.random()<0.6){
          x = -1
          if(Math.random()<0.5){
            x = 1
          }
          config[id].s += x*Math.random().toFixed(2)
        }

        if(Math.random()<0.15){
          config[id].n = 0
        }else{
          config[id].n = 1
        }

        if(Math.random()<0.15){
          config[id].r = 2501
          config[id].g = 2501
          config[id].b = 2501
        }else{
          config[id].r = 2500
          config[id].g = 2500
          config[id].b = 2500
        }

        out = {
          'red': config[id].r,
          'green': config[id].g,
          'blue': config[id].b,
          'temperature':config[id].t.toFixed(2),
          'water_level':config[id].n,
          'salinity':config[id].s.toFixed(2),
          'buoy_id': id,
          'timestamp': new Date(),
          'time': 123
        }
        client.emit('message', JSON.stringify(out));
      }
    }, interval);
  });
  client.on('disconnect', ()=>{
    console.log('Client '+client.id +' disconnected');
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);

function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}


function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
