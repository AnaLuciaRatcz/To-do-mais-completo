//Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
//filtro  e pesquisar
const filterSelect = document.querySelector("#filter-select");
const filterForm = document.querySelector("#filter-form");
const searchInput = document.querySelector("#search-input");
const eraseButton = document.querySelector("#erase-button");


let oldInputValue; //tarefa antiga que será editada


//Funções
const saveTodo = (text) =>{//salvar as tarefas
    const todo = document.createElement("div"); //criou a div externa
    todo.classList.add ("todo"); //colocou uma classe

    const todoTitle = document.createElement("h3"); //criou um título
    todoTitle.innerText = text; //colocou texto no título
    todo.appendChild(todoTitle); //colocou o texto no to do

    const doneBtn = document.createElement("button"); //criou o botáo "done"
    doneBtn.classList.add("edit-todo"); //adicionou uma classe
    doneBtn.innerHTML = '<i class="fa-solid fa-pen"></i>' //colocou o ícone do botão
    todo.appendChild(doneBtn); // colocou o botão no to do

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

const toggleForms = () =>{ //esconde um formulário e mostra outro
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo =(text) =>{ //edição
    
    const todos = document.querySelectorAll(".todo"); //seleciona todos os to dos

    todos.forEach((todo)=>{ //percorre todos os to dos

        let todoTitle = todo.querySelector("h3"); //pega o título (tarefa)

        if(todoTitle.innerText === oldInputValue){ //verifica se o texto da tarefa é a mesma tarefa antiga
            todoTitle.innerText = text; //altera o texto
        }
    });
};

//Eventos
todoForm.addEventListener("submit", (e) =>{ // enviar formulário
    e.preventDefault(); // enviar formulário sem recarregar a página
    
    const inputValue = todoInput.value; //criar tarefa nova

    if(inputValue){ //validação para não criar tarefa sem título
        //save to do
        saveTodo(inputValue) //salvar tarefa
    }
})

document.addEventListener("click", (e) =>{  //EVENTO DE CLIQUE
    const targetEl = e.target;   //IDENTIFICAR O ELEMENTO QUE FOI CLICADO
    const parentEl = targetEl.closest("div"); //selecionou o elemento pai (div mais próxima)
    let todoTitle; //pegar o título da tarefa para poder editar ele depois

    if(parentEl && parentEl.querySelector("h3")){ //para poder editar o título, verifica se o elemento pai existe e se o elemento pai tem um h3
        todoTitle = parentEl.querySelector("h3").innerText; //título em mãos
    }

    if(targetEl.classList.contains("finish-todo")){ //mapeia o botão pela classe
        parentEl.classList.toggle("done"); //adiciona o done no elemento que foi clicado
    }

    if(targetEl.classList.contains("remove-todo")){ //mapeia o botão pela classe
        parentEl.remove(); //remove o elemento pai (a linha toda, texto e botões)
    }

    if(targetEl.classList.contains("edit-todo")){ //mapeia o botão pela classe
        toggleForms(); //esconder formulário quando for fazer a edição

    editInput.value = todoTitle //muda o valor do input, edição, mapeia ele na memória
    oldInputValue = todoTitle //salva o valor anterior no banco de dados para depois consultá-lo (variável)
    }
});

cancelEditBtn.addEventListener("click", (e) =>{ // ativar o botão de cancelar edição
    e.preventDefault(); //não recarregar a página

    toggleForms(); //volta para o formuário inteiro aparecendo
});

editForm.addEventListener("submit", (e) =>{ //ativar o botão de editar

    e.preventDefault()//náo recarregar a página

    const editInputValue = editInput.value //texto editado

    if(editInputValue){ //se o campo estiver vazio, cancela a edição
        //atualizar o texto que foi editado
        updateTodo(editInputValue) //foi feita uma função 
    }

    toggleForms() //volta a aparecer todos os campos do formulário

});

filterSelect.addEventListener("change", (e) =>{ //adicionar evento de mudança no filtro
    const selected = e.target.value; //pegar o que diz o filtro
    
    const tasks = todoList.querySelectorAll(".todo"); //seleciona todos os to dos

    tasks.forEach((task) =>{ //passa por todos os to dos
        if(task.classList.contains("hide")){ //seleciona todos com a classe hide (escondidos)
            task.classList.remove("hide"); // remove a classe hide 
        }
    });

    if(selected === "done"){ // se o elemento for igual a done
        tasks.forEach((task) =>{ // percorre todos os elementos
            if(!task.classList.contains("done")){ // se o elemento não tem a classe hide
                task.classList.add("hide"); //adiciona a classe hide (esconde)
            }
        });
    }

    if(selected === "todo"){ // se o elemento for igual a to do
        tasks.forEach((task) =>{ //percorre todos os elementos
            if(task.classList.contains("done")){ // se o elemento tiver a classe done
                task.classList.add("hide"); // adiciona a classe hide (esconde ele)
            }
        });
    }
});

filterForm.addEventListener("submit", (e) =>{  // adiciona e evento de submit no filtro
    e.preventDefault(); // nao deixa recarregar a página
});

eraseButton.addEventListener("click", (e) =>{ // botão de apagar a busca
    searchInput.value =""; // campo de pesquisa ficar em branco
    const tasks = todoList.querySelectorAll(".todo"); // pega todas as tarefas
    tasks.forEach((task) =>{ //percorre todas as tarefas
        if(task.classList.contains("hide")){ //verifica se tem a classe hide (está escondido)
            task.classList.remove("hide"); // remove a classe hide (faz aparecer)
        }
    });
});
        
searchInput.addEventListener("keyup", (e) => { //ativar o evento de pesquisa
    const busca = searchInput.value; //fazer a busca do conteúdo do input pesquisa
   const tasks = todoList.querySelectorAll(".todo"); //seleciona todas as tarefas da lista

   tasks.forEach((task) =>{ //percorre todas as tarefas
    if(task.classList.contains("hide")){ // verifica se contém a classe hide
        task.classList.remove("hide"); //remove a classe hide
    }
});

tasks.forEach((task) =>{//percorre todas as tarefas 
    const title = task.querySelector("h3").innerText; //seleciona o título da tarefa
    
    if(!title.includes(busca)){ //se o titulo da tarefa não estiver na busca
        task.classList.add("hide"); //vai esconder esse titulo
    }
});
});

