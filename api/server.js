const express = require('express');
const app = express();
const axios = require("axios");

const fs = require('fs');


const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const redis = require('redis');

//default host 127.0.0.1 and  port 6379
const redisPort = 6379
const client = redis.createClient(redisPort);

// provide Port and Host
//const client = redis.createClient(port, host);


client.on('connect', function(err) {
    if (err) {
        console.log('Could not establish a connection with Redis. ' + err);
      }
    else {
        console.log('Connected to Redis successfully!');
      }
});

client.on("error", (err) => {
    console.log(err);
});


app.post('/write', (req,res)=>{

    const dataFromReact = req.body;

    client.set('first',req.body, function(err, reply) {
        console.log(reply); // OK
      });


});

app.get('/read', (req,res)=>{

    const dataFromReact = req.body;

    client.get('first', function(err, reply) {

        if(err) throw err;

        if(reply){
            res.status(200).send({
                jobs: JSON.parse(jobs),
                message: "data retrieved from the cache"
            });
        }
        else{
            client.setEx

        }
        console.log(reply); // ReactJS
      });

});

app.get("/jobs", (req, res) => {
    const searchTerm = req.query.search;
    try {
        client.get(searchTerm, async (err, jobs) => {
            if (err) throw err;
    
            if (jobs) {
                res.status(200).send({
                    jobs: JSON.parse(jobs),
                    message: "data retrieved from the cache"
                });
            }
            else {
                const jobs = await axios.get(`https://jobs.github.com/positions.json?search=${searchTerm}`);
                client.setex(searchTerm, 600, JSON.stringify(jobs.data));
                res.status(200).send({
                    jobs: jobs.data,
                    message: "cache miss"
                });
            }
        });
    } catch(err) {
        res.status(500).send({message: err.message});
    }
});
  


app.listen(port, () => console.log(`listining onn port ${port}`));