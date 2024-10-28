//Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;


//Funções
const saveTodo = (text) =>{
    const todo = document.createElement("div");
    todo.classList.add ("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("edit-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("finish-todo");
    editBtn.innerHTML = ' <i class="fa-solid fa-check"></i>'
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button"); //CRIA O BOTÃO
    deleteBtn.classList.add("remove-todo"); // COLOCA UMA CLASSE NELE
    deleteBtn.innerHTML = ' <i class="fa-solid fa-xmark"></i>' //COLOCA UM TEXTO, OU ÍCONE NO BOTÃO
    todo.appendChild(deleteBtn); //ADICIONA O BOTÃO (FILHO DE OUTRO ELEMENTO)

    todoList.appendChild(todo); //COLOCA NA DIV PRINCIPAL

    todoInput.value = ""; //APAGA O TEXTO DEPOIS DE SER ADICIONADO À LISTA
    todoInput.focus();   //FAZ O CURSOR VOLTAR PARA O INPUT DEPOIS DA ÚLTIMA TAREFA SER ADICIONADA À LISTA
}

const toggleForms = () =>{
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo =(text) =>{
    
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo)=>{

        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    });
};

//Eventos
todoForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    
    const inputValue = todoInput.value;

    if(inputValue){
        console.log(inputValue);
        //save to do
        saveTodo(inputValue)
    }
})

document.addEventListener("click", (e) =>{  //EVENTO DE CLIQUE
    const targetEl = e.target;   //IDENTIFICAR O ELEMENTO QUE FOI CLICADO
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");
    }

    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-todo")){
        toggleForms();

    editInput.value = todoTitle
    oldInputValue = todoTitle
    }
});

cancelEditBtn.addEventListener("click", (e) =>{
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) =>{

    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue){
        updateTodo(editInputValue)
    }

    toggleForms()

});