
function updateUI(items) {
  // get a reference to the element where you want to display the items
  const container = document.getElementById('items-table');

  // clear the current items from the UI
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }



  // create a new element for each item
  items.forEach(item => {

    // Your code for creating the elements,

    const row = document.createElement('tr');

    // Create table cells for the name, category and subcategory of the item
    const itemname = document.createElement('td');
    itemname.innerHTML = item.name;
    const categoryname = document.createElement('td');
    categoryname.innerHTML = item.category_name;
    const subcategoryname = document.createElement('td');
    subcategoryname.innerHTML = item.subcategory_name;

    // Create a offer button
    const offerButton = document.createElement('button');
    offerButton.innerHTML = 'Create Offer';

    // Append the cells to the row element
    row.appendChild(itemname);
    row.appendChild(categoryname);
    row.appendChild(subcategoryname);
    row.appendChild(offerButton);

    offerButton.addEventListener('click', function () {
      const priceInput = document.createElement('input');
      priceInput.placeholder = 'Enter new price';
      row.appendChild(priceInput);

      // create a new button element for saving the offer
      const saveButton = document.createElement('button');
      saveButton.innerHTML = 'Save Offer';
      row.appendChild(saveButton);
      // add an event listener to the save button
      saveButton.addEventListener('click', async function () {
        // get the value of the price input
        const price = priceInput.value;
        try {
          const urlParams = new URLSearchParams(window.location.search);
          const shopID = urlParams.get('shopID');
          // create a new offer in the offers table
          const response = await fetch('http://127.0.0.1:4242/newoffer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': localStorage.getItem("token")
            },
            body: JSON.stringify({
              item_id: item.id,
              price: price,
              shop_id: shopID
            })
          });
          if (response.ok) {
            alert('Offer saved successfully');
          } else {
            throw new Error('Failed to save offer');
          }
        } catch (error) {
          // handle the error
          console.error(error);
        }
      });
    });


// Append the row to the table element
      container.appendChild(row);
  });

}





async function searchProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  const shopID = urlParams.get('shopID');

      // get the selected category and subcategory
  const name = document.getElementById('search-input').value;
  const response = await fetch(`http://127.0.0.1:4242/search?name=${name}&shop_id=${shopID}`);
  const items = await response.json();
  updateUI(items);
    
  
};




async function searchCategory() {
  const category = document.getElementById('category').value;
  const subcategory = document.getElementById('subcategory').value;
  // Get shopID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const shopID = urlParams.get('shopID');


  const response = await fetch(`http://127.0.0.1:4242/itemspage?category=${category}&subcategory=${subcategory}&shop_id=${shopID}`)
  const items = await response.json();
  console.log(items)
  updateUI(items);
}
