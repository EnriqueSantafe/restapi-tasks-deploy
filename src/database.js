import mongoose from 'mongoose'
import config from './config'
(async () => {
    try {
        const db = await mongoose.connect(config.mongodbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }) //donde tasksapi es el nombre de la base de datos, mongodb va a ver si existe esa base de datos y si existe se conecta a ella y si no existe la crea. Esta conexión es asíncrona por eso creo una función y le pongo async y a la conexión le pongo await
        console.log('Database is connected to:', db.connection.name)
    } catch(error) {
        console.log(error)
    }
})()
