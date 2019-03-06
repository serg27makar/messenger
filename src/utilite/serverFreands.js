import axios from 'axios'

export const  setActionServerFriends = (data, back) => {
    let payload ={
        id: data.toString()
    };
    axios.post(`http://localhost:3001/`+ 'friends', payload)
        .then(response => {
            if (response === 'find:0'){
                back('scm')
            }else if(response) {
                back(response.data)
            }else {
                back('scm')
            }
        })
        .catch(error => console.log(error));
};


export const setActionServerFriendsDelete = (data, friendId, back) => {
    let removeFriend = {
        _id: localStorage.token,
        friends: data,
        friendId: friendId,
    };
    axios
        .post(`http://localhost:3001/`+ 'frendsdelete', removeFriend)
        .then(req => {
            if (req === 'find:0'){
                back('scm')
            }else if(req) {
                back(req.data)
            }else {
                back('scm')
            }
        })
        .catch(error => console.log(error));
};

