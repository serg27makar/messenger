export const setActionUserId = (userId) => {
    return {
        type: 'SET_USERID',
        userId: userId
    }
};
export const setActionUserBlock = (messages) => {
    return{
        type: 'SET_USERBLOCK',
        messages: messages
    }
};
export const setActionUserBlockDel = (messages) => {
    return{
        type: 'SET_USERBLOCKDEL',
        messages: messages
    }
};
export const setActionUserName = (userName) => {
    return{
        type: 'SET_USERNAME',
        userName: userName
    }
};
export const setActionUserAvatar = (avatar) => {
    return{
        type: 'SET_USERAVATAR',
        avatar: avatar
    }
};
export const setActionUserAbonents = (abonents) => {
    return{
        type: 'SET_USERABONENTS',
        abonents: abonents
    }
};

export const setActionUserFriends = (userFriends) => {
    return{
        type: 'SET_USER_FRIENDS',
        userFriends: userFriends
    }
};
export const setActionUserFriendsList = (friendslist) => {
    return{
        type: 'SET_USERFRIENDSLIST',
        friendslist: friendslist
    }
};
export const setActionUserFriendsListClear = (friendslist) => {
    return{
        type: '_USERFRIENDSLISTCLEAR',
        friendslist: friendslist
    }
};
export const setActionUserFriendActiv = (activFriend) => {
    return{
        type: 'SET_USERFRIENDACTIV',
        activFriend: activFriend
    }
};
export const setActionUserWhoSpeak = (whoSpeak) => {
    return{
        type: 'SET_USERWHOSPEAK',
        whoSpeak: whoSpeak
    }
};
export const setActionChat = (usCh) => {
    return{
        type: 'SET_USERCHAT',
        usCh: usCh
    }
};

