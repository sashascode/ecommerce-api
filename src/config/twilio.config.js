import 'dotenv/config';
import twilio from 'twilio';

import { logger } from '../utils/logger.js';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken)

const optionsWpp = {
    body: 'Hola soy un WSP desde Node.js!',
    from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER,
    to: ''
} 

async function sendSMS(body, to) {
    try {
        if(!to) throw new Error('Recipient number is required for sending SMS.');
        
        optionsWpp.to = to;
        if(body) optionsWpp.body = body;

        const message = await client.messages.create(optionsWpp);
        logger.debug("SMS sent: ", message);
    } catch (error) {
        logger.error(error);
    }
}

export default { sendSMS };