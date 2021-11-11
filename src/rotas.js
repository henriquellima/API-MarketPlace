const express = require('express');
const user = require('./controllers/users');
const product = require('./controllers/products');
const verifyToken = require('./middleware/verifyToken');

const rotas = express();

rotas.use(express.json());

rotas.post('/usuario', user.register); 
rotas.post('/login', user.login);

rotas.use(verifyToken)

rotas.get('/usuario', user.profileData);
rotas.put('/usuario', user.update);
rotas.get('/produtos', product.getAll);
rotas.get('/produtos/:id', product.getOne);
rotas.post('/produtos', product.register);
rotas.put('/produtos/:id', product.update);
rotas.delete('/produtos/:id', product.deleteProduct);


module.exports = rotas;