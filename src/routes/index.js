import express from 'express';

export const routes = express();

routes.get('/api', (req, res) => {
    res.send('API HIT!');
});