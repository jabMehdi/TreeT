const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');


app.use(bodyParser.json());

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

app.listen(3000);