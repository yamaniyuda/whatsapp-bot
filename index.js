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
    // Note: Replace **<YOUR_APPLICATION_TOKEN>** with your actual Application token
    const payload = {
        "input_value": msg.body,
        "output_type": "chat",
        "input_type": "chat",
        // Optional: Use session tracking if needed
        "session_id": "customer_1"
    };
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    };
    
    fetch('http://127.0.0.1:7860/api/v1/run/c0c65d49-ed51-40b9-8d32-d1b7fbe5da51', options)
        .then(response => response.json())
        .then(response => msg.reply(response.outputs[0].outputs[0].artifacts.message))
        .catch(err => console.error(err));
        
});

client.initialize();