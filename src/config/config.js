import dotenv from 'dotenv';

dotenv.config();

export default {
    persistence: process.env.PERSISTENCE || 'MONGO',
    port: process.env.PORT || 8080,
    mongoUrl: process.env.MONGO_URL,
    mongoDbName: process.env.MONGO_DB_NAME,
    environment: process.env.NODE_ENV || 'dev',
    gmailUser: process.env.GOOGLE_ACC,
    gmailPass: process.env.GOOGLE_PW,
    baseUrl: process.env.BASE_URL || 'http://localhost:8080/',
    mode: process.env.MODE || 'SINGLE',
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY,
        publicKey: process.env.STRIPE_PUBLIC_KEY
    }
}