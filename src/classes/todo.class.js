export class Todo {

    static fromJson ({tarea, id, completado, creado}){
        const tempTodo = new Todo (tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }
    
    constructor(tarea = ''){
        this.tarea = tarea;
        this.completado = false;
        this.id = Date.now();
        this.creado = new Date();
    }

    imprimirTarea(){
        console.log(`${this.tarea} - ${this.id}`);
    }
}