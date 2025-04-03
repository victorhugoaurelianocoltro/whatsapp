 // comentei tudo, pois deixo ficso na minha cabeça
 
 let selectedContact = null;  // Declara uma variável chamada selectedContact
 // O valor inicial é null, então, nenhum contato foi selecionado ainda 

 
 //Seleciona todos os contatos da list
 // e tambem Adiciona um botão de clique pra chamar a função selectContact()

document.querySelectorAll("#contact-list li").forEach(li => {
    li.addEventListener("click", function() {                          
        selectContact(this.textContent, this);
    });
});

// Selecionar um contato e ativar o chat
function selectContact(contactName, element) {
    selectedContact = contactName;

    // Atualiza o título do chat
    document.getElementById("chat-title").textContent = contactName;

    // Carrega mensagens salvas para o contato
    loadMessages(contactName);

    // Ativa o input e o botão de envio
    document.getElementById("message-input").disabled = false;
    document.getElementById("send-btn").disabled = false;

    document.querySelectorAll("#contact-list li").forEach(li => li.classList.remove("active")); // Seleciona todos os itens (<li>) da lista de contatos (#contact-list)
    element.classList.add("active"); // Adiciona a classe "active" que é só um nome de classe usado apenas ao contato (element) que foi clicado
}

// Enviar mensagem e salvar
function sendMessage() {         // Verifica se há um contato selecionado
    if (!selectedContact) return;


    //Obtém o campo de texto e a área do chat, e tambem remove os espaços extras da mensagem
    const messageInput = document.getElementById("message-input");
    const chatBox = document.getElementById("chat-box");
    const message = messageInput.value.trim();

    if (message === "") return;   // Impede o envio de mensagens vazias

    // Criar elemento de mensagem, Cria um <p> com a mensagem enviada, e tambem adiciona a mensagem ao chat
    const p = document.createElement("p");
    p.textContent = `Você: ${message}`;
    p.className = "sent";
    chatBox.appendChild(p);

    // Salva a mensagem no localStorage, (nas conversas)
    saveMessage(selectedContact, `Você: ${message}`);

    //Limpa o campo de texto após enviar, limpa o input no caso
    messageInput.value = "";
}

// Salva mensagens no localStorage 
function saveMessage(contact, message) {
    let messages = JSON.parse(localStorage.getItem(contact)) || [];
    messages.push(message);
    localStorage.setItem(contact, JSON.stringify(messages));
}

// Carrega mensagens salvas, aqui a função tem a área do chat e limpa as mensagens anteriores
function loadMessages(contact) {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = ""; // Limpa a tela antes de carregar


    // aqui a função tem as mensagens do localStorage
    let messages = JSON.parse(localStorage.getItem(contact)) || [];
    

    //Se não houver mensagens, exibe um aviso

    if (messages.length === 0) {
        chatBox.innerHTML = `<p class="info">Conversando com ${contact}...</p>`;


        //Define a classe "sent" (mensagem enviada) ou "received" (recebida), e Adiciona as mensagens ao chat.

    } else {
        messages.forEach(msg => {
            const p = document.createElement("p");
            p.textContent = msg;
            p.className = msg.includes("Você:") ? "sent" : "received";
            chatBox.appendChild(p);
        });
    }
}

// aqui é a função para enviar a mensagem ao clicar no botão  (Enviar)
document.getElementById("send-btn").addEventListener("click", sendMessage);

// permite enviar a mensagem ao pressionar Enter
document.getElementById("message-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});


//O evento "DOMContentLoaded" dispara quando todo o HTML foi carregado, mas antes de imagens e outros recursos externos,
// fetchContacts(); só é chamado depois disso, garantindo que a lista de contatos possa ser preenchida corretamente.

document.addEventListener("DOMContentLoaded", function() {
    fetchContacts();

});

