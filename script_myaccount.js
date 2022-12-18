const userId = 1;
const myaccount = document.getElementById('Myaccount');

/*
fetch('http://127.0.0.1:4242/myaccount')
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
        console.log(data.users); // log the retrieved users
        // update the user interface with the retrieved data
        const usersList = document.getElementById('niki');
        usersList.innerHTML = ''; // clear the current content
        data.users.forEach((user) => {
          const userItem = document.createElement('li');
          userItem.innerHTML = `(${users.name}) (${users.email})(${users.password})`;
          usersList.appendChild(userItem);
        });
      } else {
        console.error(data.error);
      }
  });
*/
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





myaccount.addEventListener('submit', (event) => {
  event.preventDefault();
  
  
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const updatedData = {
    name: name.value,
    email: email.value,
    age: password.value,
  };

  
  if (!name || !email || !password) {
    alert('Please fill out all required fields');
    return;

    
  }

  fetch('http://127.0.0.1:4242/myaccount', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
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



