export const linksArr = (direct,colbek)=>{
    let home = true;
    let register = true;
    let login = true;
    if (direct === 'login'){
        login = false;
    }else if (direct === 'register'){
        register = false;
    }else if (direct === '/') {
        home = false
    }
    colbek ([{
            to: '/',
            name: 'Главная',
            show: home
        },{
            to: '/login',
            name: 'Вход',
            show: login
        },{
            to:'/register',
            name: 'Регистрация',
            show: register
        }]);
};
