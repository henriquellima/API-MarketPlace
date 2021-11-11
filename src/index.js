const express = require('express');
const swaggerUi = require('swagger-ui-express')

const rotas = require('./rotas')

const app = express();

app.use(express.json());

app.use(rotas);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(require("./swagger/swagger.json")));

app.listen(3333); 