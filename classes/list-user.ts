import { User } from "./user";


export class ListUser {

    private list: User[] = [];

    constructor() {}

    /**
     * Agregar un usuario
     * @param user Recibo nueov usuario
     */
    public add(user: User) {

        this.list.push(user);
        console.log(this.list);
        return user;

    }
    
    // Actualizar usuario
    public updateName(id: string, name: string) {

        for (let user of this.list) {
            if (user.id === id) {
                user.name = name;
                break;
            }
        }

        console.log('===== Actualizando usuario =====');

        console.log(this.list);
        

    }

    // Obtener todos los usuarios
    public getList() {
        return this.list.filter(user => user.name !== 'sin-nombre');
    }
    
    // Obtener usuario
    public getUser(id: string) {
        return this.list.find(user => user.id === id);
    }

    // Obtener usurio por salas
    public getUsersRoom(room: string) {
        return this.list.filter(user => user.room === room);
    }

    // Borrar usurio
    public deleteUser(id: string) {
        const tmpUser = this.getUser(id);

        this.list = this.list.filter(user => user.id !== id);

        return tmpUser;
    }

}