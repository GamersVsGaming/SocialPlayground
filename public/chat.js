const port = 'http://localhost:5000';
const socket = io.connect(port);

const message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

btn.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
  message.value='';
});

message.addEventListener('keyup', () => {
  socket.emit('typing', {
    message: message.value,
    handle: handle.value
  });
});

socket.on('chat', (data) => {
  feedback.innerHTML = '';
  output.innerHTML += `<p><strong>${data.handle}:</strong>${data.message}</p>`;
});

socket.on('typing', (data) => {
  data.message ?
  feedback.innerHTML = `<p><em>${data.handle} is typing</em></p>` :
  feedback.innerHTML = '';
});