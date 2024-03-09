import { __dirname } from "../utils.js"

export const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: 'Ecommerce API Documentation',
            description: ''
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}