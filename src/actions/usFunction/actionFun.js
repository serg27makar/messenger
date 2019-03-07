import {friendslist, friendsDell} from "../../socketutilite/socketabonents"
import {setActionUserFriendActiv, setActionUserFriendsList,
    setActionUserBlock, setActionChat, setActionUserBlockDel} from "../../actions/index"
import {chateSms} from "../../socketutilite/socketabonents"

export function del(data, dispatch){
    dispatch(setActionUserFriendActiv({}));
    friendsDell(data);
    friendslist(data.userId, (res)=>{
        dispatch(setActionUserFriendsList(res))
    });
}

export function open(activ, dispatch) {
    dispatch(setActionUserBlock([]));
    dispatch(setActionChat([]));
    dispatch(setActionUserFriendActiv({}));
    dispatch(setActionUserFriendActiv(activ));
}
/*
export function goon(activ, dispatch){
    chateSms(activ.userId, (data) => {
        if(activ.userId) {
            if(activ.actUs) {
                if (data.length !== activ.usCh.length) {
                    dispatch(setActionChat(data));
                    dispatch(setActionUserBlockDel([]));
                    data.map((sms) => {
                        if (sms.chatId === activ.userId + ' ' + activ.actUs
                            || sms.chatId === activ.actUs + ' ' + activ.userId) {
                            dispatch(setActionUserBlock(sms));
                        }
                    });
                }
            }
        }
    })
}
*/