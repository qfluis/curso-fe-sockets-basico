const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        // soket.io
        this.server = require('http').createServer(this.app);
        /*
        this.io = require('socket.io')(this.server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"],
                allowedHeaders: ["my-custom-header"],
                credentials: true
            }
        });*/
        this.io = require("socket.io")(this.server, {
            allowRequest: (req, callback) => {
              const noOriginHeader = req.headers.origin === undefined;
              callback(null, noOriginHeader);
            }
        });


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
        this.io.on('connection', socketController);

        
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;
