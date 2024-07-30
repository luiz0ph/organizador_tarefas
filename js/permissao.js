document.addEventListener("DOMContentLoaded", () => {

    // Verifica se a API de notificação está disponível no navegador
    if ('Notification' in window) {

        // Solicita  permissão ao usuario 
        Notification.requestPermission().then(permission => {

            if (permission == 'granted') {
                console.log('Permissão de notificação concedida.');
            } else {
                console.log('Permissão de notificação negada');
            }
        })
    }

})