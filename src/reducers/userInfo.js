const initialState = {
    userId: '',
    messages: [],
    userName:'',
    avatar:'',
    abonents:[],
    friends:[],
    friendslist:[],
    activFriend:{},
    whoSpeak:'',
    usCh:[],
};

export default function userInfo(state = initialState, action) {
    switch (action.type){
        case "SET_USERID":
            return {
                ...state,
                userId: action.userId
            };
        case "SET_USERBLOCK":
            return {
                ...state,
                messages: state.messages.concat(action.messages)
            };
        case "SET_USERBLOCKDEL":
            return {
                ...state,
                messages: action.messages
            };
        case "SET_USERNAME":
            return {
                ...state,
                userName: action.userName
            };
        case "SET_USERAVATAR":
            return {
                ...state,
                avatar: action.avatar
            };
        case "SET_USERABONENTS":
            return {
                ...state,
                abonents: action.abonents
            };
        case "SET_USERFRIENDS":
            return {
                ...state,
                friends: action.friends
            };
        case "SET_USER_FRIENDS":
            return {
                ...state,
                friends: action.friends
            };
        case "SET_USERFRIENDSLIST":
            return {
                ...state,
                friendslist: action.friendslist
            };
        case "SET_USERFRIENDSLISTCLEAR":
            return {
                ...state,
                friendslist: action.friendslist
            };
        case "SET_USERFRIENDACTIV":
            return {
                ...state,
                activFriend: action.activFriend
            };
        case "SET_USERWHOSPEAK":
            return {
                ...state,
                whoSpeak: action.whoSpeak
            };
        case "SET_USERCHAT":
            return {
                ...state,
                usCh: action.usCh
            };
        default:
            return state
    }
}

