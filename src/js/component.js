import { Todo } from '../classes';
import { todoList } from '../index';

// Referencias html
const todo_list = document.querySelector('.todo-list');
const new_todo = document.querySelector('.new-todo');
const btn_clear_completed = document.querySelector('.clear-completed');
const ulFilter = document.querySelector('.filters');
const aFiltro = document.querySelectorAll('.filtro');

export const createHtmlTodo = ( { tarea, id, completado, creado } ) =>{
   
    const templateList = `
    <li class="${ (completado)? 'completed' : '' }" data-id="${ id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${(completado)? 'checked' : ''}>
            <label>${ tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;
    const div = document.createElement('div');
    div.innerHTML = templateList;
    todo_list.append( div.firstElementChild );
    return div.firstElementChild;
}

new_todo.addEventListener('keyup', (e)=>{
    
    if(e.keyCode === 13 && new_todo.value.length > 0 ){
        const todo = new Todo(new_todo.value);
        todoList.addTodo( todo );
        createHtmlTodo( todo );
        new_todo.value = '';
    }
});

todo_list.addEventListener('click', (e)=>{
    const elemento = e.target.localName;
    const todoElement = e.target.parentNode.parentNode;
    const idTodo = todoElement.getAttribute('data-id');
    
    if(elemento.includes('input')){
        todoList.marcarCompletado( idTodo );
        todoElement.classList.toggle('completed');
    }
    else if(elemento.includes('button')){
        todoList.deleteTodo( idTodo );
        todo_list.removeChild(todoElement);
    }

});

btn_clear_completed.addEventListener('click', ()=>{
    todoList.deleteComplet();
    for(let i = todo_list.children.length - 1; i >= 0; i--){
        if(todo_list.children[i].classList.contains('completed') ){
            todo_list.removeChild(todo_list.children[i]);
        }
    }
});

ulFilter.addEventListener('click', (e)=>{
    console.log(e.target.text);
    const filter = e.target.text;
    if(!filter) return;

    aFiltro.forEach( element => element.classList.remove('selected'));
    e.target.classList.add('selected');

    for(const elemento of todo_list.children ){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch(filter){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
                break;
        }

        
    }
})