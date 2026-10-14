const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Менеджер нотаток API',
            version: '1.0.0',
            description: 'Документація до серверної частини навчальної практики (Частина 2)',
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
                description: 'Локальний сервер',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };