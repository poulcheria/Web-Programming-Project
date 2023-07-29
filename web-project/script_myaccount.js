const myaccount = document.getElementById('Myaccount');
const token = localStorage.getItem('token');
/*
fetch('http://127.0.0.1:4242/myaccount')
  .then((response) => response.json())
  .then((data) => {
    
    const nameElement = document.getElementById('myname');
    nameElement.innerHTML = data.users.name;
    const emailElement = document.getElementById('myemail');
    emailElement.innerHTML = data.users.email;
    const passwordElement = document.getElementById('mypassword');
    passwordElement.innerHTML = data.users.password;

   
  });
  */
/*
  fetch('http://127.0.0.1:4242/my-account', {
    method: 'GET',
    headers: {
      'Authorization': Bearer ${token}
    }
  })
  .then(response => response.json())
  .then(data => {
    // handle the data of the user
    const nameElement = document.getElementById('myname');
    nameElement.innerHTML = data.user.username;
    const emailElement = document.getElementById('myemail');
    emailElement.innerHTML = data.user.email;
    const passwordElement = document.getElementById('mypassword');
    passwordElement.innerHTML = data.user.password;
  });
*/


fetch('http://127.0.0.1:4242/myaccount',{
  headers:{
    'x-access-token': localStorage.getItem('token')
  }
})
  
  .then(response => response.json())
  .then(data => {
    
    // Use the data to update the HTML page
    
    const userDataDiv = document.getElementById("user-data");
    userDataDiv.innerHTML = `<p>Username: ${data.username}</p>
                            <p>Email: ${data.email}</p>
                            <p>Password : ${data.password}</p>
                            <p>Score : ${data.score}</p>`;
  });






//
myaccount.addEventListener('submit', (event) => {
  event.preventDefault();
  
  
  console.log('submit clicked');

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const updatedData = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  
  if (!username || !email || !password) {
    alert('Please fill out all required fields');
    return;

    
  }

  fetch('http://127.0.0.1:4242/myaccount', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // update the user interface with the updated data
        console.log(data.user); // log the updated user data
      } else {
        // handle the error
        console.log('error');
      }
    })
});