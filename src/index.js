const express = require('express');
const mongoose = require('mongoose');
const path =  require('path');
const cors = require('cors');

const app = express();

//desacopla o protocolo HTTP, para permite que a aplicação ouça o protocolo HTTP como  WEBSOCKET. Dessa forma podemos tabalhar com Real Time
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb://localhost:27017/samasgram', {
    useNewUrlParser: true,
});

// cria uma var que fica disponivel para toda a aplicação, desaa forma eh possível enviar em tempo ral para todos os usuário um novo post
app.use((req, resp, next) =>{ 
    req.io = io;

    next();
}); 



app.use(cors()); // permite que a nossa api seja acessada por outras aplicaçoes

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));  // quando ouver /file em nissa url o sistema vai saber que tem que bucar um arquivi fisico dentro da pasta resized

app.use(require('./routes'));

server.listen(3333);