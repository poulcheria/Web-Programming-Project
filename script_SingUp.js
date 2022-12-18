//Sing Up-------------

const form = document.getElementById('Sing-up');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Validate form input
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  if (!name || !email || !password) {
    alert('Please fill out all required fields');
    return;
  }

  // Send form data to server
  fetch('http://127.0.0.1:4242/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('Sign up successful');
      } else {
        alert(`Error: ${data.error}`);
      }
      console.log(data)
    })
    .catch((error) => {
      console.error(error);
      alert('An error occurred');
    });
});



