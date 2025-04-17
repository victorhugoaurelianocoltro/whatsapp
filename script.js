'use strict'

async function userContacts() { 
    const url = `https://whats-api-2025.onrender.com/v1/whatsapp/dados-contatos/?numero=11987876567`
    const response = await fetch(url)
    const data = await response.json()
    return data.contatos
}

async function columnContact() {
    const contacts = await userContacts()
    const listContact = document.getElementById('contact-list')

    contacts.forEach(function (item) {
        const contactCard = document.createElement('div')
        contactCard.classList.add('contact-card')

        const nameContact = document.createElement('h2')
        nameContact.textContent = item.nome

        const descContact = document.createElement('p')
        descContact.textContent = item.descricao

        contactCard.addEventListener('click', function() {
            contactChat(item)
        })

        contactCard.appendChild(nameContact)
        contactCard.appendChild(descContact)
        listContact.appendChild(contactCard)
    })
}

async function contactChat(item) {
    const url = `https://whats-api-2025.onrender.com/v1/whatsapp/conversas-usuario/?numero=11987876567`
    const response = await fetch(url)
    const data = await response.json()
    const contacts = data.conversas

    const chatContainer = document.getElementById('chat-container')
    const messages = []

    contacts.forEach(function(contact) {
        if (contact.nome === item.nome) {
            contact.mensagens.forEach(function(msg) {
                const card = createMessageCard(msg)
                messages.push(card)
            })
        }
    })

    chatContainer.replaceChildren(...messages)
}

function createMessageCard(message) {
    const messageCard = document.createElement('div')
    messageCard.classList.add('message-card')

    if (message.sender === 'me') {
        messageCard.classList.add('sent')
    } else {
        messageCard.classList.add('received')
    }

    const content = document.createElement('p')
    content.textContent = message.content

    const time = document.createElement('span')
    time.classList.add('message-time')
    time.textContent = message.time

    messageCard.appendChild(content)
    messageCard.appendChild(time)

    return messageCard
}

columnContact()
