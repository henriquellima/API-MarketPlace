const swaggerAutoGen = require('swagger-autogen');

swaggerAutoGen()('./swagger.json', ['../rotas.js']);