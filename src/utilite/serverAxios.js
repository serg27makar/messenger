import axios from 'axios'

export const setActionServerPost = (variant, colbeck) => {
    let userInfo={
        txt: '',
        change:'',
        nickName:'',
        avatar:'',
        friendslist:[],
    };
    if (variant.email !== '') {
        if (variant.password.length >= 3) {
            const user = {
                userEmail: variant.email,
                userPassword: variant.password,
                userName: variant.nickname,
                avatar: variant.avatar
            };
            axios.post(`http://localhost:3001/`+ variant.direct, user)
                .then(req => {
                    if(req.data === 'find:1' && variant.direct==="register") {
                        userInfo = {
                            txt: 'этот эмаил уже занят'
                        };
                        colbeck(userInfo)
                    }else if (req.data === 'find:0' && variant.direct==="login"){
                        userInfo= {
                            txt: 'такой пользователь не найден'
                        };
                        colbeck(userInfo)
                    }else if (req.data._id.length === 24 ){
                        localStorage.token = req.data._id;
                        userInfo= {
                            txt:'welcom',
                            change:req.data._id,
                            nickName:req.data.userName,
                            avatar:req.data.avatar,
                            friendslist: req.data.userFriends,
                        };
                        colbeck(userInfo)
                    }
                })
        }else {
            userInfo= {
                txt:'пароль должен быть не меньше 3 символов'
            };
            colbeck(userInfo)
        }
    }else {
        userInfo = {
            txt: 'введите эмаил'
        };
        colbeck(userInfo)
    }
};
