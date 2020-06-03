const express = require('express');
const app = express();
const socket = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const server = app.listen(3000,'0.0.0.0')
global.io = socket.listen(server);
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


mongoose.connect('mongodb://127.0.0.1:27017/test',
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () =>
        console.log('connected to db')
);
/*
try{
    const news = io
        .of('/news')
        .on('connection', (socket) => {
            console.log('news connected', socket.id);
            socket.emit('item', { news: 'item' });
        });

}catch (e) {
    console.log('error',e.toString());
}

 */

app.listen(3000);
