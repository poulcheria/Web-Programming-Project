fetch('http://127.0.0.1:4242/adminpois')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // Get the table element in your HTML file
    const tableElement = document.getElementById('adminpois-table');

    // Loop through the array of users
    data.forEach(pois => {
      // Create a new table row element
      const row = document.createElement('tr');
  
      // Create table cells for the name, category and subcategory of the item
      const id = document.createElement('td');
      id.innerHTML = pois.id;
      const name = document.createElement('td');
      //const jsonObject = JSON.parse(pois.properties);
      const jsonObject = JSON.parse(JSON.stringify(pois.properties));
      name.innerHTML = jsonObject.name;
      const type = document.createElement('td');
      //const jsonObject = JSON.parse(pois.properties);
      const jsonObject2 = JSON.parse(JSON.stringify(pois.properties));
      type.innerHTML = jsonObject2.shop;
      const location = document.createElement('td');
      const jsonObject3 = JSON.parse(JSON.stringify(pois.geometry));
      location.innerHTML = jsonObject3.coordinates;

      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'Delete';
  
      // Append the cells to the row element
      row.appendChild(id);
      row.appendChild(name);
      row.appendChild(type);
      row.appendChild(location);
    
      row.appendChild(deleteButton);

      // Append the row to the table element
      tableElement.appendChild(row);

      deleteButton.addEventListener('click', event => {
        // Delete the POIS from the database
        fetch('http://127.0.0.1:4242/adminpois/' +pois.id, {
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





const createPoisButton = document.getElementById('create-pois-button');
const createPoisForm = document.getElementById('create-pois-form');

createPoisButton.addEventListener('click', event => {
  event.preventDefault();
  const formData = new FormData(createPoisForm);
  const id = formData.get('id');
  const location = formData.get('location');
  const name = formData.get('name');
  const type = formData.get('type');
  
  

  fetch('http://127.0.0.1:4242/adminpois' , {
    method: 'POST',
    body: JSON.stringify({ id,location,name,type }),
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => response.json())
  .then(data => {
    // handle the response data
    // like showing a message or adding the new item to the table
    // Create a new table row element
    const row = document.createElement('tr');

    // Create table cells for the name, category and subcategory of the item
    const id = document.createElement('td');
    id.innerHTML = data.id;
  
    const name = document.createElement('td');
    //const jsonObject = JSON.parse(JSON.stringify(data.properties));
    name.innerHTML = data.properties;
    const type = document.createElement('td');
    //const jsonObject = JSON.parse(pois.properties);
    //const jsonObject2 = JSON.parse(JSON.stringify(data.properties));
    type.innerHTML = data.properties;
    const location = document.createElement('td');
    //const jsonObject3 = JSON.parse(JSON.stringify(data.geometry));
    location.innerHTML = data.coordinates;


    // Append the cells to the row element
    row.appendChild(id);
    row.appendChild(name);
    row.appendChild(type);
    row.appendChild(location);
    

    // Append the row to the table element
    tableElement.appendChild(row);
  });
});




const updatePoisButton = document.getElementById('update-pois-button');
const updatePoisForm = document.getElementById('update-pois-form');

updatePoisButton.addEventListener('click', event => {
  event.preventDefault();
  const formData = new FormData(updatePoisForm);
  const id = formData.get('id');
  const name = formData.get('name');
  const type = formData.get('type');
  const location = formData.get('location');
  

  fetch('http://127.0.0.1:4242/adminpois/'+ id, {
    method: 'PUT',
    body: JSON.stringify({ id,location,name,type}),
    //body: JSON.stringify({ id,location ,properties: JSON.stringify({ name: req.body.name, shop: req.body.type })}),

    headers: { 'Content-Type': 'application/json' },
  })
 
  .then(response => response.json())
  .then(data => {
    // handle the response data
    // Create a new table row element
    const row = document.createElement('tr');

    // Create table cells for the name, category and subcategory of the item
    const id = document.createElement('td');
    id.innerHTML = data.id;
  
    const name = document.createElement('td');
    const jsonObject = JSON.parse(JSON.stringify(data.properties));
    name.innerHTML = jsonObject.name;
    const type = document.createElement('td');
    //const jsonObject = JSON.parse(pois.properties);
    const jsonObject2 = JSON.parse(JSON.stringify(data.properties));
    type.innerHTML = jsonObject2.shop;
    const location = document.createElement('td');
    const jsonObject3 = JSON.parse(JSON.stringify(data.geometry));
    location.innerHTML = jsonObject3.coordinates;


    // Append the cells to the row element
    row.appendChild(id);
    row.appendChild(name);
    row.appendChild(type);
    row.appendChild(location);
    

    // Append the row to the table element
    tableElement.appendChild(row);
  });
});

