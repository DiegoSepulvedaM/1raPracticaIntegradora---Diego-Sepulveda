import express from 'express';
import __dirname from './utils.js';
import usersRouter from './routes/users.js'
import coursesRouter from './routes/courses.js'
import viewsRouter from './routes/views.js'
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/users', usersRouter);
app.use('/api/courses', coursesRouter);

try {
    await mongoose.connect('mongodb+srv://diegosepu:2hQM9Rr3XUvfbwMs@cluster39760ap.abysesb.mongodb.net/ecommerce?retryWrites=true&w=majority');
    console.log('DB CONNECTED')
} catch (error) {
    console.log(error);
}

const io = new Server(server); // Se pasa como parametro el server de express
const messages = [];

io.on("connection", (socket) => {
  console.log("New client connected");

  // Leer mensajes del evento:
  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messageLogs", messages);
  });
  // Leer mensajes luego de autenticarse.
  socket.on("auth", (data) => {
    socket.emit("messageLogs", messages);
    socket.broadcast.emit("newUser", data);
  });
});


app.listen(8080);