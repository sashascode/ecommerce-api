import express from 'express';
import config from './config/config.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { ViewRouter, ProductRouter, UserRouter, CartRouter, TokenRouter } from './routes/index.router.js';
import { ProductService, CartService, MessageService } from './repositories/index.js';

import { initializePassport } from './config/passport.config.js';
import ErrorHandler from './middlewares/errorhandler.js';
import { addLogger, logger } from './utils/logger.js';
import { __dirname } from './utils.js';
import { swaggerOptions } from './config/swagger.config.js';
import swaggerJSDoc from 'swagger-jsdoc';
import SwaggerUiExpress from 'swagger-ui-express';
  
export const app = express();
initializePassport();
app.use(passport.initialize());

const specs = swaggerJSDoc(swaggerOptions);
app.use('/apidocs', SwaggerUiExpress.serve, SwaggerUiExpress.setup(specs));

app.engine("handlebars", handlebars.engine(
    {
        helpers: {
            range: function (count) { 
                const result = [];
                for (let i = 0; i < count; ++i) {
                    result.push(i+1);
                }
                return result;
            },
            eq: function (a, b) { 
                return a == b; 
            },
            getCartSubtotal: function (products) {
                let subtotal = 0;

                if (!products) {
                    return subtotal;
                }

                products.forEach(product => {
                    subtotal += product?.id?.price * product?.quantity;
                });

                return subtotal;
            }
        }
    }
));

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(addLogger);

const viewRouter = new ViewRouter();
const productRouter = new ProductRouter();
const userRouter = new UserRouter();
const cartRouter = new CartRouter();
const tokenRouter = new TokenRouter();

app.use('/view/', viewRouter.getRouter());
app.use('/api/product/', productRouter.getRouter());
app.use('/api/cart/', cartRouter.getRouter());
app.use('/api/user/', userRouter.getRouter());
app.use('/api/token/', tokenRouter.getRouter());

app.get('/', (req, res) => {
    res.redirect('/view/products');
});

const httpServer = app.listen(config.port, () => logger.debug(`Server running on ${config.baseUrl}`));
const socketServer = new Server(httpServer);

// <--- Socket Connection --->

socketServer.on('connection', async socket => {
    logger.debug("New client connection");

    // <--- Real time products sockets --->
    socket.emit('products', await ProductService.getProducts(40));

    socket.on("onaddproduct", async () => {
        const data = await ProductService.getProducts(40);
        socketServer.sockets.emit('products', data);
    });

    socket.on("ondeleteproduct", async () => {
        const data = await ProductService.getProducts(40);
        socketServer.sockets.emit('products', data);  
    });

    // <--- Chat sockets --->
    socket.emit('messages', await MessageService.getAllMessages());

    socket.on('new-message', async (message) => {
        await MessageService.saveMessage(message);
        let messages = await MessageService.getAllMessages();
        socketServer.sockets.emit('messages', messages);
    });
});

app.use(ErrorHandler);