// Aquí vamos a poner todo lo relacionado con la conexión a la base de datos
/* Kevin Javier Esquivel Villafuerte
Santiago Córdova Molina
María Rivera
 */

"use strict"

import express from 'express'
import mysql from 'mysql2/promise'
import fs from 'fs'
import { request } from 'http'

const app = express()
const port = 5000

app.use(express.json())
app.use(express.static('./videogame'))

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

// Endpoint con la que abrimos el servidor, desde la main page del juego.
app.get('/', (request,response)=>
    fs.readFile('./videogame/html/mainPage.html', 'utf8', (err, html)=>
    {
        if(err) response.status(500).send('Ha habido un error: ' + err)
        console.log('Cargando Infinity Jump...')
        response.send(html)
    })
)

// Endpoint para cargar la página principal del juego, en caso de ser necesario llamarla
app.get('/mainPage.html', (request,response)=>
    fs.readFile('./videogame/html/mainPage.html', 'utf8', (err, html)=>
    {
        if(err) response.status(500).send('Ha habido un error: ' + err)
        console.log('Cargando Infinity Jump...')
        response.send(html)
    }))


// Endpoint para cargar la página de login.
app.get('/loginPagina.html', (request,response)=>
{
    fs.readFile('./videogame/html/loginPagina.html', 'utf8', (err, html)=>
    {
        if(err) response.status(500).send('Ha habido un error: ' + err)
        console.log('Cargando log in página...')
        response.send(html)
    })
})


// Endpoint para cargar la página con el manual.

app.get('/manual.html', (request,response)=>
    fs.readFile('./videogame/html/manual.html', 'utf8', (err, html)=>
    {
        if(err) response.status(500).send('Ha habido un error: ' + err)
        console.log('Cargando manual...')
        response.send(html)
    }))

// Endpoint para cargar la página de crear cuenta.

app.get('/crearCuenta.html', (request,response)=>
{
    fs.readFile('./videogame/html/crearCuenta.html', 'utf8', (err, html)=>
    {
        if(err) response.status(500).send('Ha habido un error: ' + err)
        console.log('Cargando Infinity Jump...')
        response.send(html)
    })
})

// Endpoint para cargar la página que contiene al juego en sí.

app.get('/game_screen.html', (request,response)=>
{
    fs.readFile('./videogame/html/game_screen.html', 'utf8', (err, html)=>
    {
        if(err) response.status(500).send('Ha habido un error: ' + err)
        console.log('Cargando Infinity Jump...')
        response.send(html)
    })
})


// Endpoint para cargar la página de estadísticas.
app.get('/estadisticas.html', (request,response)=>
{
    fs.readFile('./videogame/html/estadisticas.html', 'utf8', (err, html)=>
    {
        if(err) response.status(500).send('Ha habido un error: ' + err)
        console.log('Cargando estadísticas...')
        response.send(html)
    })
})

// Endpoint para cargar la página de historia.

app.get('/historia.html', (request,response)=>
{
    fs.readFile('./videogame/html/historia.html', 'utf8', (err, html)=>
    {
        if(err) response.status(500).send('Ha habido un error: ' + err)
        console.log('Cargando historia...')
        response.send(html)
    })
})

// Endpoint para cargar la página de créditos.

app.get('/creditos.html', (request,response)=>
{
    fs.readFile('./videogame/html/creditos.html', 'utf8', (err, html)=>
    {
        if(err) response.status(500).send('Ha habido un error: ' + err)
        console.log('Cargando créditos...')
        response.send(html)
    })
})

app.post('/api/buscarUser', async (request, response) => {

    const { username, password } = request.body;

    if (!username || !password) {
        return response.status(400).send('Faltan datos de inicio de sesión.');
    }

    try {
        const connection = await connectToDB();

        const [rows] = await connection.query(
            'SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?',
            [username, password]
        );

        if (rows.length > 0) {
            response.status(200).json({ message: "Inicio de sesión exitoso.", userID: rows[0].id_usuario });
            console.log("Inicio de sesión exitoso, id del usuario: ", rows[0].id_usuario);
        } else {
            response.status(401).send('Credenciales incorrectas.');
        }

        await connection.end();
    } catch (error) {
        console.error('Error al verificar el inicio de sesión:', error);
        response.status(500).send('Error interno del servidor.');
    }
});

// End point para crear un nuevo usuario


app.post('/api/crearUsuario', async (request, response) => {

    const { usuario, contrasena, confContrasena } = request.body;

    if (!usuario || !contrasena) {
        console.log("Faltan datos para crear la cuenta.");
        return response.status(400).json({ message: "Faltan datos para crear la cuenta." });
    }

    if (contrasena !== confContrasena) {
        console.log("Las contraseñas no coinciden.");
        return response.status(400).json({ message: "Las contraseñas no coinciden." });
    }

    if (contrasena.length < 8 || contrasena.length > 20) {
        console.log("La contraseña debe tener entre 8 y 20 caracteres.");
        return response.status(400).json({ message: "La contraseña debe tener entre 8 y 20 caracteres." });
    }

    if (usuario.length < 4 || usuario.length > 20) {
        console.log("El nombre de usuario debe tener entre 4 y 20 caracteres.");
        return response.status(400).json({ message: "El nombre de usuario debe tener entre 4 y 20 caracteres." });
    }

    try {
        const connection = await connectToDB();

        // Verificar si el nombre de usuario ya existe
        const [UsuarioExistente] = await connection.query(
            'SELECT * FROM usuariosregistrados WHERE usuario = ?',
            [usuario]
        );

        if (UsuarioExistente.length > 0) 
        {
            console.log("El nombre de usuario ya está en uso.");
            return response.status(400).json({ message: "El nombre de usuario ya está en uso. Prueba con uno diferente." });
        } 
        else 
        {
            await connection.query
            (
                'INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)',
                [usuario, contrasena]
            );
            console.log('Cuenta creada exitosamente.');
            response.status(201).json({ message: "Cuenta creada exitosamente." });
        }

    } catch (error) {
        console.error('Error al crear la cuenta:', error);
        response.status(500).json({ message: "Error interno del servidor." });
    }
});

// End point para insertar estadísticas de una nueva partida, pero con el intento correspondiente

app.post('/api/Partidas/insertar-con-intento', async (request, response) => {
    let connection = null;
    const { id_usuario, nivel, plataformas_alcanzadas } = request.body;

    try {
        connection = await connectToDB();

        // Obten el max intento + 1 en una sola transacción
        const [rows] = await connection.query(
            'SELECT MAX(intento) AS ultimo_intento FROM Partidas WHERE id_usuario = ?',
            [id_usuario]
        );
        const nuevo_intento = (rows[0].ultimo_intento || 0) + 1;

        const [results] = await connection.query(
            'INSERT INTO Partidas (id_usuario, intento, nivel, plataformas_alcanzadas) VALUES (?, ?, ?, ?)',
            [id_usuario, nuevo_intento, nivel, plataformas_alcanzadas]
        );

        response.status(201).json({ message: "Insertado correctamente", intento: nuevo_intento });
    } catch (error) {
        console.error(error);
        response.status(500).json(error);
    } finally {
        if (connection) connection.end();
    }
});


// GET que sirve para verificar cual fue el último intento por ID de usuario y así evitar que se duplique

app.get('/api/Partidas/ultimo-intento', async (request, response) => {

    const { id_usuario } = request.query;
    let connection = null;

    try {
        connection = await connectToDB();
        const [rows] = await connection.query(
            'SELECT MAX(intento) AS ultimo_intento FROM Partidas WHERE id_usuario = ?',
            [id_usuario]
        );
        const ultimo_intento = rows[0].ultimo_intento || 0;
        response.json({ ultimo_intento });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Error obteniendo el último intento" });
        console.log("No se pudo obtener el último intento");
    } finally {
        if (connection !== null) connection.end();
    }
});

// Get para obtener todas las estadísticas de un usuario en específico
app.get('/api/stats/:usuario', async (request, response)=>
{
    let connection = null

    try
    {
        console.log(request.params.id)
        connection = await connectToDB()

        const [results_user, _] = await connection.query('select * from historialintentos where Jugador= ? ORDER BY Intento DESC LIMIT 25', [request.params.usuario])
        
        console.log(`${results_user.length} rows returned`)
        response.json(results_user)
    }
    catch(error)
    {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally
    {
        if(connection!==null) 
        {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
});

// Get para obtener el ranking de los mejores 10 jugadores
app.get('/api/ranking', async (request, response)=>
{
    let connection = null
    try
    {
        connection = await connectToDB()

        const [results_global, _] = await connection.query('select * from globalranking')
        console.log(`${results_global.length} rows returned`)
        response.json(results_global)
    }
    catch(error)
    {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally
    {
        if(connection!==null) 
        {
            connection.end()
            console.log("Connection closed succesfully!")
        }
 }
})

// GET para obtener el uso de las mejoras del juego globalmente
app.get('/api/usomejoras', async (request, response)=>
{
    let connection = null
    try
    {
        connection = await connectToDB()

        const [results_mejoras, _] = await connection.query('select * from usomejoras')
        console.log(`${results_mejoras.length} rows returned`)
        response.json(results_mejoras)
    }
    catch(error)
    {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally
    {
        if(connection!==null) 
        {
            connection.end()
            console.log("Connection closed succesfully!")
        }
 }
})

// Get para obtener cuales son los niveles máximos alcanzados por cada jugador
app.get('/api/nivelesComunes', async (request, response)=>
{
    let connection = null
    try
    {
        connection = await connectToDB()

        const [results_niveles, _] = await connection.query('select * from nivelesmascomunes')
        console.log(`${results_niveles.length} rows returned`)
        response.json(results_niveles)
    }
    catch(error)
    {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally
    {
        if(connection!==null) 
        {
            connection.end()
            console.log("Connection closed succesfully!")
        }
 }
})


// GET que sirve para verificar cual fue el último intento por ID de usuario y así evitar que se duplique

app.get('/api/Partidas/ultimo-intento', async (request, response) => {

    const { id_usuario } = request.query;
    let connection = null;

    try {
        connection = await connectToDB();
        const [rows] = await connection.query(
            'SELECT MAX(intento) AS ultimo_intento FROM Partidas WHERE id_usuario = ?',
            [id_usuario]
        );
        const ultimo_intento = rows[0].ultimo_intento || 0;
        response.json({ ultimo_intento });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Error obteniendo el último intento" });
        console.log("No se pudo obtener el último intento");
    } finally {
        if (connection !== null) connection.end();
    }
});

app.listen(port, ()=>
    {
        console.log(`App listening at http://localhost:${port}`)
})




