// 1)  input 
let input = document.querySelector('input[name=tarefa]');
// 2)  button
let btn = document.querySelector('#botao');
// 3)  lista 
let lista = document.querySelector('#lista');
 
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizarTarefas(){
    // limpar a listagem de itens antes de renderizar 
    lista.innerHTML = '';

    for(tarefa of tarefas){
        //Criar o item da lista

        let itemLista = document.createElement('li');

        //Adicionar classes no item da liste
        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        //Adicionar evento de click no item da lista
        itemLista.onclick = function(){
            deletarTarefa(this);
        }
        //Criar um texto
        let itemTexto = document.createTextNode(tarefa);

        //Adicionar o texto no item da Lista
        itemLista.appendChild(itemTexto);

        //Adicionar o item da lista na Lista
        lista.appendChild(itemLista);
    }
}

// Executando a função para renderizar as tarefas
renderizarTarefas();

// 1) "Escutar" o evendo de clique no botão
btn.onclick = function(){
    // 2) Capturar o valor digitado pelo usuário no input
    let novaTarefa = input.value;    
    if(novaTarefa !== ""){        

        // 3) Atualizar a nova tarefa na lista (array) de tarefas e renderizar a tela
        tarefas.push(novaTarefa);
        renderizarTarefas();

        // limpar input e spans
        input.value = ''
        removerSpans();

        //salvar dados no banco
        salvarDadosNoStorage();
    }else{
        let card = document.querySelector('.card');
        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Você precisa informa a tarefa');
        span.appendChild(msg);
        card.appendChild(span);
    }
}

function removerSpans(){
    let spans = document.querySelectorAll('span');
    let card = document.querySelector('.card');

    for(let i = 0; i < spans.length; i++){
        card.removeChild(spans[i]);
    }
}

function deletarTarefa(tar){
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);

    renderizarTarefas();
    console.log(tarefas.indexOf(tar.textContent));
    //salvar dados no banco
    salvarDadosNoStorage();
}

function salvarDadosNoStorage(){
    
    // Todo navegador web possui esta capacidade de salvar localmente    
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}