const express = require('express');
const redis = require('redis');
const client = redis.createClient();

const fs = require('fs');

app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

client.on('connect', function(err) {
  if(err){
    console.log('Could not establish a connection with Redis. '+err);
  }
  else{
  console.log('Connected!'); // Connected!
  }
});


app.get('/', (req,res) => {
  console.log("App works");
  res.send('App Works !');
});

// Write request to redis
app.post('/send', (req, res) => {
  const data = req.body
  console.log("Data appjs -> ");
  //console.log(type(data));
  console.log(data.data.payload);

  client.set('firstdata',data.data.payload,function(err,reply){
    console.log("REPLYYY   "+reply); //OK
  })
  
  res.send('Successfully sended data!')
});

//Read data from Redis

const readData=(key) =>{

  client.get(key,function(err,reply){
    if(err){
      console.log(err);
    }else{
      console.log("Successfully read the data");
      fs.writeFileSync('/Users/tarik/Desktop/mqtt/src/components/Hook/data.json',reply);
    }  
  });

}

app.post('/read',(req,res)=>{

  const key=req.body;
  const data = readData(key.data.key);
  res.send(data);
});





/*

********* Redis Database Properities **********

// Strings

client.set('framework', 'ReactJS', function(err, reply) {
  console.log(reply); // OK
});

client.get('framework', function(err, reply) {
  console.log(reply); // ReactJS
});

// Hashes

//client.hmset('frameworks_hash', 'javascript', 'ReactJS', 'css', 'TailwindCSS', 'node', 'Express');

client.hmset('frameworks_hash', {
  'javascript': 'ReactJS',
  'css': 'TailwindCSS',
  'node': 'Express',
  'tarik':'tarik'
});

client.hgetall('frameworks_hash', function(err, object) {
  console.log(object); // { javascript: 'ReactJS', css: 'TailwindCSS', node: 'Express' }
});

// Lists

client.rpush(['frameworks_list', 'ReactJS', 'Angular'], function(err, reply) {
  console.log(reply); // 2
});

client.lrange('frameworks_list', 0, -1, function(err, reply) {
  console.log(reply); // [ 'ReactJS', 'Angular' ]
});

// Sets

client.sadd(['frameworks_set', 'ReactJS', 'Angular', 'Svelte', 'VueJS', 'VueJS'], function(err, reply) {
  console.log(reply); // 4
});

client.smembers('frameworks_set', function(err, reply) {
  console.log(reply); // [ 'Angular', 'ReactJS', 'VueJS', 'Svelte' ]
});

// Check the existence of a key

client.exists('framework', function(err, reply) {
  if (reply === 1) {
    console.log('Exists!');
  } else {
    console.log('Doesn\'t exist!');
  }
});

// Delete a key

client.del('frameworks_list', function(err, reply) {
  console.log(reply); // 1
});

// Increment a key

client.set('working_days', 5, function() {
  client.incr('working_days', function(err, reply) {
    console.log(reply); // 6
  });
});
*/


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});




