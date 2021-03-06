const email = document.querySelector("#txtEmail"),
      username = document.querySelector("#txtUsername"),
      password = document.querySelector("#txtPassword"),
      login = document.querySelector("#btnLogin"),
      signup = document.querySelector("#btnSignUp"),
      logout = document.querySelector("#btnLogout"),
      authForm = document.querySelector("#auth"),
      chat = document.querySelector("#socket-chat"),
      evt = new Event('user-updated');

login.addEventListener("click", e => {
  const auth = firebase.auth();

  auth.signInWithEmailAndPassword(email.value, password.value)
  .catch(e => console.log(e.message));
});

signup.addEventListener("click", e =>{
  const auth = firebase.auth();

  auth.createUserWithEmailAndPassword(email.value, password.value)
  .then(u => {
    user = auth.currentUser;
    user.updateProfile({displayName: username.value})
    .then( () => {
      document.dispatchEvent(evt);
    });
  })
  .catch(e => console.log(e.message));
});

logout.addEventListener("click", e => {
  firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(user => {
  user ? loggedIn() : loggedOut();
});

function loggedIn(){
  chat.style.display = 'block';
  authForm.style.display = 'none';
}

function loggedOut(){
  chat.style.display = 'none';
  authForm.style.display = 'block';
}
