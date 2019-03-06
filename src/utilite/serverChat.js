import axios from 'axios'

export const setActionServerChat = (data) => {
    let date = new Date();
    let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    let userText = {
        messages: data.messages,
        userName: data.userName,
        userData:  date.toLocaleString("ru", options),
        chatId: data.chatId,
    };
    axios.post(`http://localhost:3001/`+ 'chat', userText)
};
