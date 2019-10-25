import { Socket } from 'socket.io';
import { ListUser } from '../classes/list-user';
import { User } from '../classes/user';

export const usersConnect = new ListUser();

export const connectClient = (client: Socket, io: SocketIO.Server) => {

    const user = new User(client.id);
    usersConnect.add(user);

    

}

export const disconnect = (client: Socket, io: SocketIO.Server) => {
    client.on('disconnect', () => {
        console.log('Cliente desconetado');
        usersConnect.deleteUser(client.id);
        io.emit('users-activated', usersConnect.getList());
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

// Configurar usuario
export const configUser = (client: Socket, io: SocketIO.Server) => {
    client.on('config-user', (payload: {
        name: string
    }, callback: (args: {
        ok: boolean;
        message: any;
    }) => void) => {
        console.log(`User Name: ${payload.name}`);
        usersConnect.updateName(client.id, payload.name);

        io.emit('users-activated', usersConnect.getList());
        callback({
            ok: true,
            message: `Usuario ${payload.name}, Configurado`
        });
    });
}

// Obtener usuarios
export const getUsers = (client: Socket, io: SocketIO.Server) => {
    client.on('get-users', () => {
        
        io.to(client.id).emit('users-activated', usersConnect.getList());

    });
}