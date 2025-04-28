const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {

    const token = '<YOUR_TOKEN>'
    const url = '<YOUR_URL>'

    
    const payload = {
        "input_value": msg.body,
        "output_type": "chat",
        "input_type": "chat",
        "session_id": "customer"
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(payload)
    };

    fetch(url, options)
        .then(response => response.json())
        .then(response => msg.reply(response.outputs[0].outputs[0].artifacts.message))
        .catch(err => console.error(err));

});

client.initialize();