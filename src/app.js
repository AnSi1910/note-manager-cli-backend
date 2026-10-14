const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { swaggerUi, specs } = require('./swagger');
require('dotenv').config();


const sequelize = require('./db');
require('./models/Note');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', noteRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Сервер менеджера нотаток працює!' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Щось пішло не так на сервері!' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

sequelize.sync().then(() => {
    console.log('База даних успішно синхронізована!');
    app.listen(PORT, () => {
        console.log(`Сервер запущено на порту ${PORT}`);
    });
}).catch(err => {
    console.error('Помилка підключення до БД:', err);
});