// Referencias HTML
const lblOnline = document.getElementById("online");
const lblOffline = document.getElementById("offline");
const txt = document.getElementById("txt");
const btnEnviar = document.getElementById("btnEnviar");


const socket = io();

socket.on('connect', () => {
    console.log('Conectado');

    lblOnline.style.display = '';
    lblOffline.style.display = 'none';

});

socket.on('disconnect', () => {
    console.log('Desconectado');

    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
});



btnEnviar.addEventListener( 'click', () => {
    const mensaje = txt.value;
    const payload = {
        mensaje,
        id: '1234',
        fecha: new Date()
    }
    socket.emit('enviar-mensaje', payload, ( id ) => {
        console.log('desde el server', id);
    });
});