// Define um ouvinte para o evento push, que é acionado quando uma mensagem push é recebida.
self.addEventListener('push', event => {

    const data = event.data.json(); // Extrai os dados da mensagem push.
    const options = {
        body: data.body,
        icon: 'icon.png',
        badge: 'badge.png'
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options) // Exibe a notificação com o título e as opções fornecidas.
    );
})