// Aquí vamos a poner todo lo relacionado con la conexión a la base de datos
/* Kevin Javier Esquivel Villafuerte
Santiago Córdova Molina
María Rivera
 */

"use strict"

import express from 'express'
import mysql from 'mysql2/promise'
import fs from 'fs'

const app = express()
const port = 5000

app.use(express.json())
app.use(express.static('./public'))

// Función para conectarse a la base de datos MySQL
async function connectToDB()
{
    return await mysql.createConnection
    ({
        host:'localhost',
        user:'infinityJump',
        password:'WeakPassword12.',
        database:'infinity_jump_db'
    })
}

app.get('/', (request,response)=>
{
    fs.readFile('./videogame/html/login.html', 'utf8', (err, html)=>
    {
        if(err) response.status(500).send('Ha habido un error: ' + err)
        console.log('Cargando Infinity Jump...')
        response.send(html)
    })
})