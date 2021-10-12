import {Todo} from './todo.class';

export class TodoList {

    constructor(){
        this.obtenerDbTodo();
    }

    addTodo(todo){
        this.todoList.push(todo);
        this.guardarDbTodo();
    }

    getTodos(){
        return this.todoList;
    }

    deleteTodo( id ){
        this.todoList = this.todoList.filter(todo => todo.id !== Number(id) );
        this.guardarDbTodo();
    }

    marcarCompletado( id ){
        const todo = this.todoList.find( todo => todo.id === Number(id) );
        todo.completado = !todo.completado;
        this.guardarDbTodo();
    }

    deleteComplet(){
        this.todoList = this.todoList.filter( todo => !todo.completado );
        this.guardarDbTodo();
    }

    guardarDbTodo(){
        localStorage.setItem('todos', JSON.stringify(this.todoList));
    }

    obtenerDbTodo(){
        this.todoList =  JSON.parse(localStorage.getItem('todos')) || [];
        this.todoList = this.todoList.map( Todo.fromJson );
    }

}