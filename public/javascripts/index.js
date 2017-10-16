/**
 * Created by liutingting on 17/10/11.
 */

// var count = document.getElementById('count');



window.onload = function () {
    var hichat = new HiChat();
    hichat.init();
   /* var that = this;
    this.socket = io.connect();
    this.socket.on('connect',function () {
        console.log("hello")
    })*/
}

var HiChat = function () {
    this.socket = null;
}

HiChat.prototype = {
    init:function () {
        var that = this;
        this.socket = io.connect();
        var count =document.getElementById("count");
        this.socket.on('users',function (data) {
            console.log('Got update from the server');
            console.log('There are ' + data.number + 'users');
            count.innerHTML = data.number
        })

        //输入称呼
        var name = document.getElementById("nickname");
        var sendName = document.getElementById("sendName");
        // console.log(name.value)
        sendName.addEventListener('click',function () {
            that.socket.emit("nickname",{nickname:name.value})
        })

        //输入信息
        var message = document.getElementById('message');
        var input = document.getElementById("send");
        input.addEventListener('click',function() {
            var chatContent = document.getElementsByClassName("chatContent")[0];
            var para=document.createElement("p");
            var node=document.createTextNode( message.value);
            para.appendChild(node);
            chatContent.appendChild(para);
            that.socket.emit('message', { text: message.value });
            return false;
        });

       /* //监听发送的信息
        this.socket.on('push message', function (data) {
           // console.log(data)
            var chatContent = document.getElementsByClassName("chatContent")[0];
            var para=document.createElement("p");
            var node=document.createTextNode(data.text);
            para.appendChild(node);
            chatContent.appendChild(para);
        });*/

        //监听发送的称呼和信息
        this.socket.on('user message',function (data) {
            console.log(data)
            var chatContent = document.getElementsByClassName("chatContent")[0];
            var para=document.createElement("p");
            var node=document.createTextNode( data.message.text);
            para.appendChild(node);
            chatContent.appendChild(para);
        });
    }
}
