document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const todoForm = document.getElementById('todoForm');
    const todoList = document.getElementById('todoList');
    const userEmailDisplay = document.getElementById('userEmail');

    let users = [];
    let todos = [];
    let currentUser = null;

                                 // registrationForm

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        if (users.some(user => user.email === email)) {
            alert('User already registered!');
            return;
        }

        const newUser = {
            email,
            password,
            uid: generateUniqueId(),
            status: "",
            createdAt: new Date()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registration successful!');
        registrationForm.reset();
    });
                                               // Login 
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            alert('Invalid email or password.');
            return;
        }

        currentUser = user;
        userEmailDisplay.textContent = user.email;

        document.getElementById('registration').style.display = 'none';
        document.getElementById('login').style.display = 'none';
        document.getElementById('todoApp').style.display = 'block';

        loadTodos();
    });
                                         // TO DO

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('todoTitle').value;
        const description = document.getElementById('todoDescription').value;
        const date = document.getElementById('todoDate').value;

        const newTodo = {
            title,
            description,
            date,
            id: generateUniqueId(),
            status: "",
            createdAt: new Date(),
            user_id: currentUser.uid
        };

        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));

        addTodoToDOM(newTodo);
        todoForm.reset();
    });

    function loadTodos() {
        todoList.innerHTML = '';
        todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.filter(todo => todo.user_id === currentUser.uid).forEach(addTodoToDOM);
    }

    function addTodoToDOM(todo) {
        const todoItem = document.createElement('div');
        todoItem.className = 'todoItem';
        todoItem.innerHTML = `
            <h3>${todo.title}</h3>
            <p>${todo.description}</p>
            <p>${todo.date}</p>
        `;
        todoList.appendChild(todoItem);
    }

    function generateUniqueId() {
        return 'id-' + Math.random().toString(36).substr(2, 16);
    }

    function init() {
        users = JSON.parse(localStorage.getItem('users')) || [];
        todos = JSON.parse(localStorage.getItem('todos')) || [];
    }

    init();
});
