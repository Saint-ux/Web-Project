const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Application Request Logger
app.use((req, res, next) => {
    console.log(`[LOG] ${new Date().toISOString()} - ${req.method} request to ${req.url}`);
    next();
});

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false })
    .then(() => {
        console.log('Relational database synchronized successfully.');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('Database connection error:', err));