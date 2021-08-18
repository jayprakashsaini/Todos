const form = document.querySelector('#form');
const todosUL = document.querySelector('.todos');
const input = document.querySelector('#input');

const todos = JSON.parse(localStorage.getItem('todos'));

if(todos) {
    todos.forEach(todo => {
        addTodo(todo)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo();
})

function addTodo(todo) {
    let todoText = input.value;
    
    if(todo) {
        todoText = todo.text;
    }

    if(todoText) {
        const todoEl = document.createElement('li');
        if(todo?.completed) {
            todoEl.classList.add('completed');
        }
        todoEl.innerText = todoText;
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();
        })
        todoEl.addEventListener('contextmenu', e => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        })
        todosUL.appendChild(todoEl);
        input.value = '';
        updateLS();
    }
}

function updateLS() {
    const todosEl = document.querySelectorAll('ul.todos > li')
    let todos = [];
    todosEl.forEach(todo => {
        const todoItem = {
            text: todo.innerText,
            completed: todo.classList.contains('completed')
        }
        todos.push(todoItem);
    })

    localStorage.setItem('todos', JSON.stringify(todos));
}