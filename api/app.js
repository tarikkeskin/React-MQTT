// ***** imported modules *****
const express = require('express');
const redis = require('redis');
const rejson = require('redis-rejson');
const fs = require('fs');

/* important - this must come BEFORE creating the client */
rejson(redis); 

// initialize redis client
const client = redis.createClient();

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

const dataPath='/Users/tarikkeskin/Desktop/Lotec/mqtt/jsonfiles/1lvc02z0kuqoarwm.png.json';
// Read from given dataPath
const getDatafromDataPath = () =>{

  const jsonData = fs.readFileSync(dataPath);

  return JSON.parse(jsonData);
}


app.get('/', (req,res) => {
  console.log("App works");
  res.send('App Works !');
});

// Write request to redis
app.post('/send', (req, res) => {
  const data = req.body
  console.log("Data appjs -> ");
  console.log(typeof(data));
  console.log(typeof(data.data));
  console.log(typeof(data.data.payload));
  console.log(data.data.payload);

  client.set('firstdata',data.data.payload,function(err,reply){
    console.log(reply); //OK
  })
  
  res.send('Successfully sended data!')
});

// Write Jsonfile to redis
app.post('/writejson', (req, res) => {
  const data = req.body
  console.log("Write Json  appjs -> ");
  console.log(data);
  console.log(JSON.stringify(data.data));

  let my_json_key='my_json';
  
  client.json_set(my_json_key, '.',JSON.stringify(data.data) , function (err) {
    if (err) { throw err; }
    console.log('Set JSON at key ' + my_json_key );
    client.json_get(my_json_key, function (err, value) {
      if (err) { throw err; }
      console.log('value of test:', value); //outputs 1234
    });
  });
  

  
  
  res.send('Successfully write json data!')
});

//Read data from Redis

const readData=(key) =>{

  client.json_get(key,function(err,reply){
    if(err){
      console.log(err);
    }else{
      console.log(reply)
      console.log("Successfully read the data");
      //fs.writeFileSync('/Users/tarikkeskin/Desktop/Lotec/mqtt/jsonfiles/data.json',reply);
    }  
  });

}

app.post('/read',(req,res)=>{

  const key=req.body;
  const data = readData(key.data.key);
  res.send(data);
});


/*


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




