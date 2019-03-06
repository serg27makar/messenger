import axios from 'axios'

export const setActionServerGet = (back) => {
    axios
        .get(`http://localhost:3001/`,  {
            headers: {'token': localStorage.token}
        })
        .then(response => {
            if (response){
                back(response.data)
            }else (
                back('scm')
            )
        })
        .catch(error => back(error.request.status));
};
