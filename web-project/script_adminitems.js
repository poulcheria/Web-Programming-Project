fetch('http://127.0.0.1:4242/adminitems')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // Get the table element in your HTML file
    const tableElement = document.getElementById('adminitems-table');

    // Loop through the array of users
    data.forEach(item => {
      // Create a new table row element
      const row = document.createElement('tr');
  
      // Create table cells for the name, category and subcategory of the item
      const id = document.createElement('td');
      id.innerHTML = item.id;
      const itemname = document.createElement('td');
      itemname.innerHTML = item.name;
      const categoryname = document.createElement('td');
      categoryname.innerHTML = item.category_name;
      const subcategoryname = document.createElement('td');
      subcategoryname.innerHTML = item.subcategory_name;
      const category = document.createElement('td');
      category.innerHTML = item.category;
      const subcategory = document.createElement('td');
      subcategory.innerHTML = item.subcategory;
      // Create a delete button
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'Delete';
  
      // Append the cells to the row element
      row.appendChild(id);
      row.appendChild(itemname);
      row.appendChild(categoryname);
      row.appendChild(subcategoryname);
      row.appendChild(category);
      row.appendChild(subcategory);
      row.appendChild(deleteButton);

      // Append the row to the table element
      tableElement.appendChild(row);

      deleteButton.addEventListener('click', event => {
        // Delete the item from the database
        fetch('http://127.0.0.1:4242/adminitems/' + item.id, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            // handle the response data, like showing a message
        });
    
        // Remove the row from the table
        row.remove();
      });
  });




});


const createItemButton = document.getElementById('create-item-button');
const createItemForm = document.getElementById('create-item-form');

createItemButton.addEventListener('click', event => {
  event.preventDefault();
  const formData = new FormData(createItemForm);
  const id = formData.get('id');
  const name = formData.get('name');
  const category_name = formData.get('category_name');
  const subcategory_name = formData.get('subcategory_name');
  const category = formData.get('category');
  const subcategory = formData.get('subcategory');
  fetch('http://127.0.0.1:4242/adminitems', {
    method: 'POST',
    body: JSON.stringify({ name, category_name, subcategory_name ,category,subcategory}),
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => response.json())
  .then(data => {
    // handle the response data
    // like showing a message or adding the new item to the table
    // Create a new table row element
  const row = document.createElement('tr');

  // Create table cells for the name, category and subcategory of the item
  const itemname = document.createElement('td');
  itemname.innerHTML = data.name;
  const categoryname = document.createElement('td');
  categoryname.innerHTML = data.category_name;
  const subcategoryname = document.createElement('td');
  subcategoryname.innerHTML = data.subcategory_name;
  const category = document.createElement('td');
  category.innerHTML = data.category;
  const subcategory = document.createElement('td');
  subcategory.innerHTML = data.subcategory
  // Append the cells to the row element
  row.appendChild(itemname);
  row.appendChild(categoryname);
  row.appendChild(subcategoryname);

  // Append the row to the table element
  tableElement.appendChild(row);
  });
});



const updateItemButton = document.getElementById('update-item-button');
const updateItemForm = document.getElementById('update-item-form');

updateItemButton.addEventListener('click', event => {
  event.preventDefault();
  const formData = new FormData(updateItemForm);
  const id = formData.get('id');
  const name = formData.get('name');
  const category_name = formData.get('category_name');
  const subcategory_name = formData.get('subcategory_name');
  const category = formData.get('category');
  const subcategory = formData.get('subcategory');

  fetch('http://127.0.0.1:4242/adminitems/'+ id, {
    method: 'PUT',
    body: JSON.stringify({ name, category_name, subcategory_name,category,subcategory }),
    headers: { 'Content-Type': 'application/json' },
  })
 
  .then(response => response.json())
  .then(data => {
    // handle the response data
    // like showing a message or adding the new item to the table
    // Create a new table row element
    const row = document.createElement('tr');

    // Create table cells for the name, category and subcategory of the item
    const itemname = document.createElement('td');
    itemname.innerHTML = data.name;
    const categoryname = document.createElement('td');
    categoryname.innerHTML = data.category_name;
    const subcategoryname = document.createElement('td');
    subcategoryname.innerHTML = data.subcategory_name;
    const category = document.createElement('td');
    category.innerHTML = data.category;
    const subcategory = document.createElement('td');
    subcategory.innerHTML = data.subcategory
    // Append the cells to the row element
    row.appendChild(itemname);
    row.appendChild(categoryname);
    row.appendChild(subcategoryname);
    row.appendChild(category);
    row.appendChild(subcategory);

    // Append the row to the table element
    tableElement.appendChild(row);
  });
});

