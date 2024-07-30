let modal = document.getElementById("myModal");
let adicionar = document.getElementById("icone_adicionar");
let apagarAll = document.getElementById("icone_apagar");
let span = document.getElementsByClassName("close")[0];
let tbody = document.getElementById('corpo');

// Abrir o modal
adicionar.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

apagarAll.addEventListener('click', deleteAll);

// Função para salvar tarefa no localStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    let lineNumber = Object.keys(tasks).length + 1;
    tasks[`linha${lineNumber}`] = task;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return `linha${lineNumber}`;
}

// Função para carregar tarefas do localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    Object.keys(tasks).forEach(line => {
        addTaskToTable(line, tasks[line]);
    });
}

function deleteTask(line, row) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    delete tasks[line];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    row.remove();  // Remove a linha da tabela
}

function deleteAll() {
    localStorage.clear();
    tbody.innerHTML = "";
}

// Função para converter a Data para padrão Brasileiro
function convertDate(date) {
    const dateParts = date.split('-');
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
}

// Função para adicionar tarefa à tabela
function addTaskToTable(line, task) {
    let newRow = tbody.insertRow();
    newRow.setAttribute('data-line', line);  // Adiciona um atributo de linha à nova linha

    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);

    cell1.textContent = task.materia;
    cell2.textContent = task.descricao;
    cell3.textContent = task.dia;
    cell4.textContent = task.hora;

    let options = document.createElement('div');
    options.classList.add('icones_opcoes');
    options.innerHTML = `
        <img src="../img/apagar.png" alt="icone apagar" class="delete-icon">
    `;
    cell5.appendChild(options);

    // Adiciona evento de clique ao ícone de apagar
    options.querySelector('.delete-icon').onclick = function() {
        deleteTask(line, newRow);
    };
}

// Evento de submissão do formulário
document.getElementById("infoForm").onsubmit = function(event) {
    event.preventDefault();
    let materia = document.getElementById('materia').value;
    let descricao = document.getElementById('descricao').value;
    let dia = document.getElementById('dia').value;
    let hora = document.getElementById('hora').value;

    dia = convertDate(dia);

    switch (materia) {
        case "biologia":
            materia = "Biologia";
            break;
        case "desktop":
            materia = "Desenvolvimento de Sistemas para Desktop";
            break;
        case "movel":
            materia = "Desenvolvimento de Sistemas para Dispositivos Móveis";
            break;
        case "software":
            materia = "Desenvolvimento de Software";
            break;
        case "eletiva":
            materia = "Eletiva";
            break;
        case "fisica":
            materia = "Física";
            break;
        case "gramatica":
            materia = "Gramática";
            break;
        case "interpretacao":
            materia = "Interpretação Textual";
            break;
        case "linguagens":
            materia = "Estudos Avançados de Linguagens";
            break;
        case "matematica":
            materia = "Matemática";
            break;
        case "metodologia":
            materia = "Metodologia e Processos de Desenvolvimento de Software";
            break;
        case "planejamento":
            materia = "Planejamento de Redes";
            break;
        case "projeto_integrador":
            materia = "Projeto Integrador";
            break;
        case "projeto_vida":
            materia = "Projeto de vida";
            break;
        case "quimica":
            materia = "Química";
            break;
        case "redacao":
            materia = "Redação";
            break;
        case "redes":
            materia = "Redes de Computadores";
            break;
        case "seguranca":
            materia = "Segurança de Redes";
            break;
        case "sistemas":
            materia = "Sistemas para Internet";
            break;
        case "SOredes":
            materia = "Sistemas Operacionais de Redes";
            break;
    }

    let task = { materia, descricao, dia, hora };
    let lineNumber = saveTask(task);
    addTaskToTable(lineNumber, task);

    document.getElementById("infoForm").reset();
    modal.style.display = "none";
}

// Carregar tarefas ao abrir o site
window.onload = loadTasks;