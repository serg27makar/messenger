import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3001');


function abonents (call){
    socket.on('allAbonents', (res, err)=>{
        call(res)
    });
    socket.emit('abonents');
}
export {abonents};


function friendslist (userId, call){
    socket.on('allfriendslist', (res, err)=>{
        call(res)
    });
    socket.emit('friendslist', userId);
}
export {friendslist};


function chateSms (chatId, call){
    socket.on('allChateSms', (res, err)=>{
        call(res)
    });
    socket.emit('chateSms', chatId);
}
export {chateSms};


function friends (data){
    let file = {
        userId:data.userId,
        avatar: data.avatar,
        userName: data.userName,
        friendId: data.friendId,
        friendavatar: data.friendavatar,
        friendName: data.friendName,
    };
    socket.on('allFriends', (res, err)=>{
        console.log(err)
    });
    socket.emit('friends', file);
}
export {friends};

function friendsDell (data){
    let file = {
        userId:data.userId,
        avatar: data.avatar,
        userName: data.userName,
        friendId: data.friendId,
        friendavatar: data.friendavatar,
        friendName: data.friendName,
    };
    socket.on('allFriendsDell', (res, err)=>{
        console.log(err)
    });
    socket.emit('friendsDell', file);
}
export {friendsDell};


function chateSmsIns (data){
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

    socket.on('allChateSmsIns', (res, err)=>{
        console.log(err);
    });
    socket.emit('chateSmsIns', userText);
}
export {chateSmsIns};


function socketEnd() {
    socket.emit('end');
}
export {socketEnd};
