const express = require('express');
const { userRoutes, authRoutes, avatarRoutes } = require('./routes/index');
const app = express();

import { hostname, port } from './config';
import './db';

app.use(express.json());
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/avatar', avatarRoutes);
app.use(express.static('./client'));

app.get('*', (req, res) => {
    res.redirect(`http://${hostname}:${port}`);
});

app.listen(port, hostname, () =>
    console.log(`Server running at http://${hostname}:${port}/`)
);
