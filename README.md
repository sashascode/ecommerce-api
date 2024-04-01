# Ghibli Store - Ecommerce API

## Description
This is an API for an ecommerce application. The API offers a variety of endpoints to handle key functionalities such as cart, tickets, payments, users, and products. It is built using the following design patterns: DAO, DTO, Repository, and Factory.

## Technologies used
- Node.js: JavaScript runtime platform.
- Express.js: Web framework for Node.js.
- MongoDB: NoSQL database for data storage.
- Handlebars: Template engine for dynamic HTML view generation.
- JWT (JSON Web Tokens): For user session management.
- Swagger: For API documentation.
- Stripe: Payment gateway implementation.
- Nodemailer: For sending emails.
- Socket.io: For implementing real-time chat using websockets.

## Installation
1. Clone the repository: `git clone https://github.com/your-username/ecommerce-api.git`
2. Install dependencies: `npm install`

## Usage
1. Start the server: `npm start`
2. Access the API at: `http://localhost:8080` or set your own base URL using the BASE_URL environment variable.

## Environment Variables
# To run the application properly, you need to set the following environment variables:

- PORT: The port number on which the server will listen. Default is `8080`.
- BASE_URL: The base URL of the API. Default is `http://localhost:8080/`.
- MONGO_URL: The MongoDB URL.
- MONGO_DB_NAME: The name of the MongoDB database.
- NODE_ENV: The environment mode. Default is `dev`.
- GITHUB_CLIENT_ID: The GitHub client ID for OAuth authentication.
- GITHUB_CLIENT_SECRET: The GitHub client secret for OAuth authentication.
- GITHUB_CALLBACK_URL: The callback URL for GitHub authentication.
- JWT_SECRET: The secret key for JWT token generation.
- PERSISTENCE: The persistence mechanism. Default is `MONGO`.
- GOOGLE_ACC: Google account email address.
- GOOGLE_PW: Google account password.
- TWILIO_ACCOUNT_SID: Twilio account SID.
- TWILIO_AUTH_TOKEN: Twilio authentication token.
- TWILIO_PHONE_NUMBER: Twilio phone number.
- MODE: Application mode. Could be `SINGLE` or `CLUSTER`. Default is `SINGLE`.
- STRIPE_PUBLIC_KEY: Stripe public key.
- STRIPE_SECRET_KEY: Stripe secret key.

Make sure to set these environment variables properly before running the application.

## Available Endpoints

# Cart Endpoints

- POST `/api/cart`: Create a new cart. Requires either USER_ROLE or PREMIUM_ROLE.
- GET `/api/cart/:cid`: Retrieve a cart by ID. Requires either USER_ROLE or PREMIUM_ROLE.
- PUT `/api/cart/:cid`: Update a cart by ID. Requires either USER_ROLE or PREMIUM_ROLE.
- DELETE `/api/cart/:cid`: Delete a cart by ID. Requires either USER_ROLE or PREMIUM_ROLE.
- PUT `/api/cart/:cid/products/:pid`: Add a product to a cart. Requires either USER_ROLE or PREMIUM_ROLE.
- POST `/api/cart/:cid/products/:pid`: Add a new product to a cart. Requires either USER_ROLE or PREMIUM_ROLE.
- DELETE `/api/cart/:cid/products/:pid`: Remove a product from a cart. Requires either USER_ROLE or PREMIUM_ROLE.
- POST `/api/cart/:cid/purchase`: Generates a shopping cart ticket. Requires either USER_ROLE or PREMIUM_ROLE.

# Product Endpoints

- GET `/api/product`: Retrieve all products. Accessible to the public.
- GET `/api/product/:pid`: Retrieve a product by ID. Accessible to the public.
- POST `/api/product`: Add a new product. Requires either ADMIN_ROLE or PREMIUM_ROLE.
- PUT `/api/product/:pid`: Update a product by ID. Requires either ADMIN_ROLE or PREMIUM_ROLE.
- DELETE `/api/product/:pid`: Delete a product by ID. Requires either ADMIN_ROLE or PREMIUM_ROLE.

# User Endpoints

- GET `/api/user`: Retrieve all users. Accessible to the public.
- POST `/api/user/register`: Register a new user. Accessible to the public.
- POST `/api/user/login`: Log in a user. Accessible to the public.
- POST `/api/user/logout`: Log out the current user. Requires either USER_ROLE, ADMIN_ROLE, or PREMIUM_ROLE.
- GET `/api/user/github`: Authenticate with GitHub. Accessible to the public.
- GET `/api/user/callbackgithub`: GitHub authentication callback. Accessible to the public.
- GET `/api/user/current`: Retrieve current user information. Requires either USER_ROLE, ADMIN_ROLE, or PREMIUM_ROLE.
- PUT `/api/user/premium/:uid`: Upgrade a user to premium. Requires either USER_ROLE or PREMIUM_ROLE.
- PUT `/api/user/:role/:uid`: Update user role. Requires ADMIN_ROLE.
- DELETE `/api/user`: Delete all inactive users. Requires ADMIN_ROLE.
- DELETE `/api/user/:uid`: Delete a user by ID. Requires ADMIN_ROLE.

# Token Endpoints

- POST `/api/token`: Send a password reset link. Accessible to the public.
- POST `/api/token/:userId/:token`: Reset user password using provided token. Accessible to the public.

# Payment Endpoints

- POST `/api/payment-intent`: Create a payment intent for processing payments via Stripe. Requires either USER_ROLE or PREMIUM_ROLE.

## Contributing
If you wish to contribute to this project, feel free to do so! You can submit pull requests or open issues for suggestions and corrections.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For any questions or feedback, please contact the project maintainer at [racagnisasha@gmail.com](mailto:racagnisasha@gmail.com).