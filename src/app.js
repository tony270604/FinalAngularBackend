const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const comida = require('./modules/comida/comida');
const gestor = require('./modules/gestor/gestor');


const app = express();

// Configura CORS gonzalitoefffdffdvd
app.use(cors({
    origin: 'http://localhost:4200', 
    credentials: true 
}));
//Para que maneje objetos JSONgonzalo
app.use(morgan('dev'));
app.use(express.json());

app.set('port',config.app.port);

app.use('/api/comida', comida);
app.use('/api/gestor', gestor);

module.exports=app;
