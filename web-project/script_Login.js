
//Log in------

const login = document.getElementById('LogIn');
login.addEventListener('submit', (event) => {
  event.preventDefault();
  
  
  
  const username = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const data = {username,email,password};
  
  if (!username || !email || !password) {
    alert('Please fill out all required fields');
    return;
  }
  
  fetch('http://127.0.0.1:4242/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(result => {
    if (result.success) {
      console.log(result)
      if(result.admin ==false){
        localStorage.setItem("token", result.token)
        window.location.href = "http://127.0.0.1:5500/Map.html"
      }
      else{
        localStorage.setItem("token", result.token)
        window.location.href = "http://127.0.0.1:5500/adminpois.html"
      }
  }
  else {
   alert("Incorrect username or password. Please try again.");
       }
  })
  .catch(error => {
    console.error(error);
  });
});

