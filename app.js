const express = require('express');
const app = express();
require('dotenv/config');
var server = app.listen(3000);
var io = require('socket.io').listen(server);

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//var socket = io('http://localhost', {transports: ['websocket', 'polling', 'flashsocket']});
const cors = require('cors');
app.use(cors());

app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.options('*', cors());
global.io = io ;
module.exports = io;
const userRoutes = require('./routes/UserRoute');
const sensorRoutes = require('./routes/SensorRoute');
const factoryRoutes = require('./routes/FactoryRoute');
const reclamationRoutes = require('./routes/ReclamationRoute');
const alertRoutes = require('./routes/AlertRoute');
const profileRoutes = require('./routes/ProfileRoute');

app.use('/api/users', userRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/factories', factoryRoutes);
app.use('/api/Reclamations', reclamationRoutes);
app.use('/api/users', profileRoutes);

app.post('/', (req, res) => {
    res.send('we are home');
});


mongoose.connect('mongodb://127.0.0.1:27017/usina',
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () =>
        console.log('connected to db')
);



