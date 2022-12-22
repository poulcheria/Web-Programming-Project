/*
function updateUI(items) {
  // get a reference to the element where you want to display the items
  const container =document.getElementById('items-table');

  // clear the current items from the UI
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  // create a new element for each item
  items.forEach(item => {
   // Create a new table row element
   const row = document.createElement('tr');

   // Create table cells for the name and score of the user
   const itemname = document.createElement('td');
   itemname.innerHTML = item.name;
   const categoryname = document.createElement('td');
   categoryname.innerHTML = item.category_name;
   const subcategoryname = document.createElement('td');
   subcategoryname.innerHTML = item.subcategory_name;



   // Append the cells to the row element
   row.appendChild(itemname);
   row.appendChild(categoryname);
   row.appendChild(subcategoryname);


   // Append the row to the table element
   container.appendChild(row);
  });
}
*/



fetch('http://127.0.0.1:4242/itemspage')
.then((response) => response.json())
.then((data) => {
  console.log(data);

  // Get the table element in your HTML file
  const tableElement = document.getElementById('items-table');

  // Loop through the array of item
  data.forEach(item => {
    // Create a new table row element
    const row = document.createElement('tr');

    // Create table cells for the name and score of the user
    const itemname = document.createElement('td');
    itemname.innerHTML = item.name;
    const categoryname = document.createElement('td');
    categoryname.innerHTML = item.category_name;
    const subcategoryname = document.createElement('td');
    subcategoryname.innerHTML = item.subcategory_name;



    // Append the cells to the row element
    row.appendChild(itemname);
    row.appendChild(categoryname);
    row.appendChild(subcategoryname);


    // Append the row to the table element
    tableElement.appendChild(row);
  });
});

/*

const form = document.getElementById('filter-form');
form.addEventListener('submit', async event => {
  event.preventDefault(); // prevent the form from submitting

  // get the selected category and subcategory
  const category = document.getElementById('category').value;
  const subcategory = document.getElementById('subcategory').value;

  // send a GET request to the server with the selected category and subcategory as query parameters
  const response = await fetch(`http://127.0.0.1:4242/itemspage?category=${category}&subcategory=${subcategory}`);
  const items = await response.json();

  // update the UI with the filtered items
  updateUI(items);
});
*/