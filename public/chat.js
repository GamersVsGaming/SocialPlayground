// Change port for local or live testing
//const port = window.location.hostname;
const port = 'localhost:5000';
const socket = io.connect(port);

firebase.auth().onAuthStateChanged(user => {
 if(user){
   document.addEventListener('user-updated', e => {
     const message = document.getElementById('message'),
           btn = document.getElementById('send'),
           output = document.getElementById('output'),
           feedback = document.getElementById('feedback'),
           chat = document.getElementById('chat-window');
           handle = firebase.auth().currentUser['displayName'];

           console.log(firebase.auth().currentUser['displayName']);
           console.log(handle);

      global_messages.orderByChild('Time').on("child_added", data => {
        let username = data.child("Name").val();
        let message = data.child("Message").val();
        output.innerHTML += `<p><strong>${username}:</strong>${message}</p>`;
      });

     function sendMessage(){
       if(message.value.replace(/^\s+|\s+$/gm,'').length != 0){
         socket.emit('chat', {
           message: message.value,
           handle: handle
         });

         global_messages.push({Name: handle, Message: message.value, Time: servertime}).key;
      }
      message.value='';
     }

     function gotoBottom(el){
       el.scrollTop = el.scrollHeight - el.clientHeight;
     }

     btn.addEventListener('click', () => {
       sendMessage();
     });

     message.addEventListener('keyup', e => {
       socket.emit('typing', {
         message: message.value,
         handle: handle
       });
       if(e.keyCode === 13){
         sendMessage();
       }
     });

     socket.on('chat', (data) => {
       feedback.innerHTML = '';
       gotoBottom(chat);
     });

     socket.on('typing', (data) => {
       data.message ?
       feedback.innerHTML = `<p><em>${data.handle} is typing</em></p>` :
       feedback.innerHTML = '';
       gotoBottom(chat);
   });
});
 }else{
   document.getElementById('output').innerHTML = '';
   socket.disconnect();
 }
});
