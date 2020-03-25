// Should be set in config
const client_options = {kafkaHost: 'localhost:9092'};
const port = 3000;

// Using kafka utils
const Consumer = require('./kafka/consumer');

const consumer = new Consumer(client_options, 'new-test');

// App
const app = require('express')();


function consume(message){
    console.log(JSON.parse(message.value))
}

consumer.listen(consume)


app.get('/logs/', async (req, res)=>{
    consumer.getLogs(res);
})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`)
})