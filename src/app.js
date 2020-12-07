//const express = require('express') //antes se hacía así
import express from 'express' //gracias a babel importo express de esta manera que es código más nuevo
import morgan from 'morgan'
import cors from 'cors'
import TasksRoutes from './routes/tasks.routes'
const app = express() //este objeto app es el servidor
//settings
app.set('port', process.env.PORT || 3000)
//middlewares
const corsOptions = {}
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//routes
app.get('/', (req, res) => {
    res.json({message: 'Welcome to my application'})
})
app.use('/api/tasks', TasksRoutes)
export default app