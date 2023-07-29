function displayOffers(offers) {
    // loop through the array of offers
    for (const offer of offers) {
      // create HTML elements to display the offers data
      var div = document.createElement("div");
      var username = document.createElement("div");
      var itemName = document.createElement("div");
      var offerPrice = document.createElement("div");
      var id=document.createElement("div");
      var likeButton = document.createElement("button");
      var dislikeButton = document.createElement("button");
      var outOfStockButton=document.createElement("button");

      
  
      // set the innerHTML of the HTML elements with the offers data
      username.innerHTML = "Username: " + offer.user_name;
      itemName.innerHTML = "Item Name: " + offer.item_name;
      offerPrice.innerHTML = "Offer Price: " + offer.offer_price;
      id.innerHTML="Offers ID:" + offer.offer_id;
      likeButton.innerHTML = "Like (" + offer.like_count + ")";
      dislikeButton.innerHTML = "Dislike (" + offer.dislike_count + ")";
      outOfStockButton.innerHTML=  offer.stock_status ; 
      div.appendChild(username);
      div.appendChild(itemName);
      div.appendChild(offerPrice);
      div.appendChild(id);
      div.appendChild(likeButton);
      div.appendChild(dislikeButton);
      div.appendChild(outOfStockButton);
  
      // append the div element to the element with the class "offers"
      document.getElementsByClassName("offers")[0].appendChild(div);


      likeButton.addEventListener('click', event => {
        
        // Send a request to the server to update the like count
        fetch('http://127.0.0.1:4242/offers/like/' + offer.offer_id, {
          method: 'POST',
        })
        .then(response => response.json())
        
      });
      
      dislikeButton.addEventListener('click', event => {
        // Send a request to the server to update the dislike count
        fetch('http://127.0.0.1:4242/offers/dislike/' + offer.offer_id, {
          method: 'POST',
        })
        .then(response => response.json())
        console.log(response);
        
      });

      outOfStockButton.addEventListener('click', event => {
        fetch('http://127.0.0.1:4242/offers/outofstock/' + offer.offer_id, {
          method: 'POST',
        })
        .then(response => response.json())

        console.log(response);
      });
    }
  }
  

async function getOffers() {
  const urlParams = new URLSearchParams(window.location.search);
  const shopID = urlParams.get('shopID');
    const response = await fetch(`http://127.0.0.1:4242/offers/${shopID}`,{
      headers:{
        'x-access-token': localStorage.getItem('token')
      }
    });
    const offers = await response.json();
    return offers;
  }
  
  getOffers().then(offers => {
    displayOffers(offers);
  });
  