const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const stuffRoutes = require('./routes/stuffs')
const userRoutes = require('./routes/users');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

mongoose.connect('mongodb+srv://joblack:Jolove141@cluster0-rmm0h.mongodb.net/store?retryWrites=true&w=majority',
{ useNewUrlParser: true,
useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
  
app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff', stuffRoutes)
app.use('/api/auth', userRoutes);

app.listen(3000, console.log("starting on port 3000"))