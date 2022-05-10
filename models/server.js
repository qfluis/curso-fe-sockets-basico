const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        // soket.io
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);


        this.paths = {        }

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        //this.app.use( this.paths.auth, require('../routes/auth'));        
    }

    sockets() {
        this.io.on('connection', socket => {
            console.log('Cliente conectado',socket.id);
            //socket.disconnect();
            
            socket.on('disconnect', () => {
                console.log('Cliente desconectado', socket.id);
            });

            socket.on('enviar-mensaje',(payload)=> {
                const { mensaje, fecha } = payload;
                console.log(fecha, '-', socket.id, '>' ,mensaje);
            });


        });

        
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;
