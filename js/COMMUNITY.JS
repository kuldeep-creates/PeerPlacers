function openChat(element) {
    const file = element.getAttribute('data-file');
    const chatFrame = document.getElementById('chatFrame');
    const placeholderText = document.querySelector('.placeholder-text');

    chatFrame.src = file;
    chatFrame.style.display = 'block';
    placeholderText.style.display = 'none';
}

function filterMessages() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const messages = document.querySelectorAll('.message');

    messages.forEach(message => {
        const name = message.querySelector('h2').innerText.toLowerCase();
        if (name.includes(searchInput)) {
            message.style.display = 'flex';
        } else {
            message.style.display = 'none';
        }
    });
}
