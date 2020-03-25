const kafka = require('kafka-node');

class KafkaProducer {
    constructor (client_options, topic, callback){
        const client = new kafka.KafkaClient(client_options);
        this.topic = topic;
        this.producer = new kafka.Producer(client);
        this.producer.on('error', error => {
            throw error;
        });

        this.producer.on('ready', callback);

    }

    publish(message, callback) {
        this.producer.send(
            [
                {
                    topic: this.topic,
                    messages: JSON.stringify(message)
                }
            ],
            callback
        );
    }
}

module.exports = KafkaProducer