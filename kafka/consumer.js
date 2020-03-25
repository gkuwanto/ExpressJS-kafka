const kafka = require('kafka-node');

class KafkaConsumer {
    constructor (client_options, topic, options = {autoCommit: true}, partition) {
        this.client = new kafka.KafkaClient(client_options);
        this.client_options = client_options;
        this.topic = topic;
        this.partition = partition? partition : 0;
        this.consumer = new kafka.Consumer(this.client, [{topic}], options);
    }
    listen(callback) {
        this.consumer.on('message', callback);
    }

    getLogs(res) {
        const client = new kafka.KafkaClient(this.client_options);
        const consmr = new kafka.Consumer(
            client, 
            [
                { topic: this.topic, fromOffset: 0}
            ],
            {
                fromOffset: true
            }
        )
        const msgs = []
        consmr.on('message', msg => {
            msgs.push(msg)
            if (msg.offset == msg.highWaterOffset - 1) {
                consmr.close();
                res.json(msgs)
            }
        });
    }

}
module.exports = KafkaConsumer;