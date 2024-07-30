document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) { // Verifica se os Service Workers são suportados pelo navegador.

        // Registra o service Worker
        navigator.serviceWorker.register('js/service-worker.js').then(regintration => {
            console.log('Service Worker registrado com sucesso: ', regintration);
        })

        // Exibe uma mensagem de erro no console se houver falha ao registrar o Service Worker.
        .catch(error => {
            console.error('Falha ao registrar o Service Worker:', error);
        })
    }


    function notification(task) {

        const now = new Date().getTime(); // Pega a hora atual em millissegundos.
        const taskTime = new Date(task.dueDate).getTime; //  Converte a data de vencimento da tarefa para milissegundos.
        const notifications = [
            {delay: taskTime - now - (24 * 60 * 60 * 1000), message: `A tarefa ${task.name} irá vencer em 24horas`},
            {delay: taskTime - now - (5 * 60 * 60 * 1000), message: `A tarefa ${task.name} irá vencer em 5horas`},
            {delay: taskTime - now - (60 * 60 * 1000), message: `A tarefa ${task.name} irá vencer em 1hora`}
        ];

    }


})