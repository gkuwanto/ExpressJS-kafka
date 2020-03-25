const app = require('express')();
const client_options = {kafkaHost: 'localhost:9092'}
const bodyParser = require('body-parser');

const port = 3001;

app.use(bodyParser.json())

app.post('/publish', (req,res)=>{
    producer.publish(req.body.message, (err,data) => {
        if (err){
            throw err;
        }
        res.json(data);
    })
})

const KafkaProducer = require('./kafka/producer');
const producer = new KafkaProducer(client_options, 'new-test', function(err, response) {
    app.listen(port, ()=>{
        console.log(`Example app listening on port ${port}!`)
    })
});
