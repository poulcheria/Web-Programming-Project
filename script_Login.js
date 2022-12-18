
//Log in------

const login = document.getElementById('LogIn');
login.addEventListener('submit', (event) => {
  event.preventDefault();
  
  
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const data = {name,email,password};
  
  if (!name || !email || !password) {
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
    // handle login result
    window.location.href='http://127.0.0.1:5500/Map.html';
  })
  .catch(error => {
    console.error(error);
  });
});

