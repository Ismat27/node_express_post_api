require('dotenv').config();
require('express-async-errors');
const cors = require('cors')
const express = require('express')
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')
const connectDB = require('./db/connect');
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFounMiddleware = require('./middleware/not-found')


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hawa yu')
})

app.use('/api', authRoutes)
app.use('/api/posts', postRoutes)

app.use(errorHandlerMiddleware)
app.use(notFounMiddleware)

const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(5000, () => {
            console.log('server started successfully');
        })
    } catch (error) {
        console.log('unable to start server');
        console.log(error);
    }
}

startServer()