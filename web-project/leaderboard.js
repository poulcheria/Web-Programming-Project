let page = 1;
let totalPages;

fetchUsers(page);

const prevButton = document.getElementById('prev-page');
const nextButton = document.getElementById('next-page');

prevButton.addEventListener('click', () => {
  if (page > 1) {
    page--;
    fetchUsers(page);
  }
});

nextButton.addEventListener('click', () => {
  if (page < totalPages || totalPages === undefined) {
    page++;
    fetchUsers(page);
  }
});



function fetchUsers(page) {

  fetch(`http://127.0.0.1:4242/leaderboard?page=${page}&limit=10`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    totalPages=data.totalPages;
    
    
    
    // Get the table element in your HTML file
    const tableElement = document.getElementById('leaderboard-table');
    while (tableElement.firstChild) {
      tableElement.removeChild(tableElement.firstChild);
    }
    // Loop through the array of users
    data.forEach(user => {
      // Create a new table row element
      const row = document.createElement('tr');

      // Create table cells for the name and score of the user
      const nameCell = document.createElement('td');
      nameCell.innerHTML = user.username;
      const scoreCell = document.createElement('td');
      scoreCell.innerHTML = user.score;

      // Append the cells to the row element
      row.appendChild(nameCell);
      row.appendChild(scoreCell);

      // Append the row to the table element
      tableElement.appendChild(row);
    });
  });
}
