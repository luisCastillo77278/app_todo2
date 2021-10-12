import './styles.css';
import { Todo, TodoList } from './classes';
import { createHtmlTodo } from './js/component';

const tarea = new Todo('comprar');
export const todoList = new TodoList();

todoList.getTodos().forEach( createHtmlTodo );