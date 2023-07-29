import express, { Express } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';
import routes from './app/routes';

/*
* =================================================
*                  DECLARATIONS
* ================================================ */
const app: Express = express();
const server = createServer(app);
const io: Server = new Server(server, {
    cors: {
        origin: '**'
    }
});

/*
* =================================================
*                  CONFIGURATIONS
* ================================================ */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ methods: ['GET', 'POST'] }));
app.use(express.static('src/app/uploads'));
app.use(cors());
app.use(morgan('dev'));

//* ============== ROUTES ===================*/
routes.forEach(({ name, router }) => {
    app.use(`/${name}`, router);
});

/*
* =================================================
*                  SERVER SOCKET
* ================================================ */
io.on('connection', (socket) => {
    console.log(socket.id);
});

/*
* =================================================
*                  RUNNING
* ================================================ */
app.listen(3300, () => {
    console.log(`server is running in port => http://localhost:${3300}`);
});