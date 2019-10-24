import { Socket } from 'socket.io';

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Cliente desconetado');
    });
}

// Escuchar mensajes
export const message = (client: Socket, io: SocketIO.Server) => {
    client.on('message', ( payload: {
        de: string,
        cuerpo: string
    }, callback: () => void ) => {
        console.log('Mensaje recibido', payload);
        io.emit('message-new', payload);
    })
}