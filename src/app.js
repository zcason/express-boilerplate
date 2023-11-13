require('dotenv').config()
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { NODE_ENV } from './config'

const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

// Standard Middleware
app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

// Routes
app.get('/', (req, res) => {
    res.send('Hello, world!')
})

// Error Handler
app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

export default app