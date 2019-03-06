const http =require('http');
const cors = require('cors');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
const ObjectId = require("mongodb").ObjectId;
const server = http.createServer(app);
const io = require('socket.io').listen(server);

let dbClient;
let ClientChat;
let ChatDb;

app.use(cors());

app.use('/resurse', express.static(__dirname + '/../public/resurs'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((request,response,next)=>{
    if(request.url === '/register' || request.url === '/login'
        || request.url === '/chat' || request.url === '/abonents'
        || request.url === '/friends' || request.url === '/frendsupdate'
        || request.url === '/frendsdelete' || request.url === '/chate'){
        next();
        return
    }
    const collection = request.app.locals.collection;
    let cookies = request.headers;
    if(!cookies.token){
        response.sendStatus(401);
        response.end();
        return
    }
    collection.findOne(ObjectId(cookies.token),function (err,res) {
        if (res) {
            response.send(res);
            next()
        }else {
            response.sendStatus(401);
            response.end();
        }
    });
});

mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db("chatUsers").collection("usersdb");
    ClientChat = client.db("chatUsers").collection('usersdb');
    ChatDb = client.db("chatUsers").collection('chatdb');
    server.listen(3001, function(){
        console.log("Сервер ожидает подключения...");
    });
});

app.get("/", function (request, response) {
    response.end();
});

app.post("/login", function (request, response) {
    if (!request.body) return response.sendStatus(400);
    const userEmail = request.body.userEmail;
    const userPassword = request.body.userPassword;
    const user = {Email: userEmail, Password: userPassword};
    const collection = request.app.locals.collection;
    collection.findOne(user, function (err, result) {
        if(err) return console.log(err);
        if(!result){
            response.send('find:0');
            response.end()
        }else{
            response.send(result);
            response.end()
        }
    });
});

app.post("/register", function (request, response) {
    if (!request.body) return response.sendStatus(400);
    const userEmail = request.body.userEmail;
    const userName = request.body.userName;
    const userPassword = request.body.userPassword;
    const avatar = request.body.avatar;
    const user = {Us: 'us', Email: userEmail, Password: userPassword, userName: userName, avatar: avatar};
    const collection = request.app.locals.collection;
    collection.findOne({Email: userEmail}, function (err, result) {
        if(err) return console.log(err);
        if(!result){
            collection.insertOne(user, function (err, res) {
                if (err) return console.log(err);
                response.send(res.ops[0]);
                response.end()

            });
        }else{
            response.send('find:1');
            response.end()

        }
    });
});


io.on('connection', (client)=>{
    client.on('subscribeToTimer', (interval) => {
        setInterval(() => {
            client.emit('timer', new Date());
        }, interval);
    });

    client.on('abonents', ()=> {
        ClientChat.find({Us: 'us'}).toArray(function (error, list) {
            client.emit('allAbonents', list)
        });
    });

    client.on('friendslist', (userId)=> {
        ClientChat.find({_id:ObjectId(userId)}).toArray(function (error, list) {
            let arr = list[0].userFriends;
            client.emit('allfriendslist', arr)
        });
    });

    client.on('chateSms', function (chatId) {
        ChatDb.find({Us:'c', chatId: { $regex:  chatId}}).toArray(function(err, list){
            client.emit('allChateSms', list)
        });
    });

    client.on('chateSmsIns', function (sms) {
        const userName =sms.userName;
        const messages = sms.messages;
        const userData = sms.userData;
        const chatId = sms.chatId;
        const Chat = {Us:'c', userName: userName, Text: messages, Data: userData, chatId: chatId };
        ChatDb.insertOne( Chat, function(err, list){
            client.emit('allChateSmsIns', list)
        });
    });

    client.on('friendsDell', function (file) {
        const userId=file.userId;
        const avatar= file.avatar;
        const userName= file.userName;
        const friendId= file.friendId;
        const friendavatar= file.friendavatar;
        const friendName= file.friendName;
        const usUpdate = { friendId: userId, friendavatar: avatar, friendName: userName };
        const frUpdate = { friendId: friendId, friendavatar: friendavatar, friendName: friendName };
        ClientChat.findOneAndUpdate( {_id:ObjectId(userId)},{$pullAll:{userFriends: [frUpdate]}} , function(err, result){
            if (err) return console.log(err);
        });
        ClientChat.findOneAndUpdate( {_id:ObjectId(friendId)},{$pullAll:{userFriends: [usUpdate]}} , function(err, result){
            if (err) return console.log(err);
        });
        client.emit('allFriendsDell')
    });

    client.on('friends', function (file) {
        const userId=file.userId;
        const avatar= file.avatar;
        const userName= file.userName;
        const friendId= file.friendId;
        const friendavatar= file.friendavatar;
        const friendName= file.friendName;
        const usUpdate = { friendId: userId, friendavatar: avatar, friendName: userName };
        const frUpdate = { friendId: friendId, friendavatar: friendavatar, friendName: friendName };
        ClientChat.findOneAndUpdate( {_id:ObjectId(userId)},{$push:{userFriends: frUpdate}} , function(err, result){
            if (err) return console.log(err);
        });
        ClientChat.findOneAndUpdate( {_id:ObjectId(friendId)},{$push:{userFriends: usUpdate}} , function(err, result){
            if (err) return console.log(err);
        });
        client.emit('allFriends')
    });

    console.log('new connect');
});

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});
