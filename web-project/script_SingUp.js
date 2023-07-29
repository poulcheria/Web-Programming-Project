//Sing Up-------------

const form = document.getElementById('Sing-up');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Validate form input
  const username = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  if (!username || !email || !password) {
    alert('Please fill out all required fields');
    return;
  }

  // Send form data to server
  fetch('http://127.0.0.1:4242/signup', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("token", data.token)
        window.location.href = "http://127.0.0.1:5500/Map.html"
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



