document.addEventListener('DOMContentLoaded', function() {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatbot = document.getElementById('close-chatbot');
    const userInput = document.getElementById('user-input');

    chatbotButton.addEventListener('click', function() {
        chatbotContainer.style.display = 'flex';
    });

    closeChatbot.addEventListener('click', function() {
        chatbotContainer.style.display = 'none';
    });

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value;
    if (message.trim() === '') return;

    addMessageToChat('Você: ' + message, 'user-message');
    userInput.value = '';

    // Simular resposta do chatbot (substitua isso pela chamada real à API quando estiver pronta)
    setTimeout(() => {
        const botResponse = "Esta é uma resposta simulada do chatbot.";
        addMessageToChat('Chatbot: ' + botResponse, 'bot-message');
    }, 1000);

    // Descomente o código abaixo quando a API estiver pronta
    /*
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: message}),
    })
    .then(response => response.json())
    .then(data => {
        addMessageToChat('Chatbot: ' + data.response, 'bot-message');
    })
    .catch((error) => {
        console.error('Erro:', error);
        addMessageToChat('Chatbot: Desculpe, ocorreu um erro.', 'bot-message');
    });
    */
}

function addMessageToChat(message, className) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = className;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
