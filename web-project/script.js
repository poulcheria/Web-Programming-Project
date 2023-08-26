const radius = 600;
// let center;
 
async function getGeolocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        center = [lat, lng];
        mymap.panTo(center);
        L.marker(center).addTo(mymap);
 
        
        
        resolve(center);
      },
      (error) => {
        console.log(error.code + ': ' + error.message);
        reject(error);
      }
    );
  });
}
 
(async () => {
  try {
    await getGeolocation();
    L.circle(center, radius).addTo(mymap);
  } catch (error) {
    console.log(error);
  }
})();
 
function markerStyle(feature) {
  return {
      fillColor: '#ff0000',
      color: '#ff0000',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
  };
}
 
const mymap = L.map("map").setView([38.24624349342193, 21.735097191743026], 16);

L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);
 
fetch("http://127.0.0.1:4242/Map")
  .then((response) => {
    // console.log(response.json())
    return response.json()})
  .then((alllocjs) => {

 
    const button = document.getElementById("search-button");
    const button1= document.getElementById("category-button");
 
    //dhxnei mono afta entos kyklou
 
    // var filtered = L.geoJSON(alllocjs, {
    //   filter: function(feature) {
    //     var point = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
    //     var distance = L.latLng(center).distanceTo(point);
    //     return distance <= radius;
    //   }
    // });
 
    // filtered.addTo(mymap);
 
    //var totalgeojsonLayer = L.geoJSON(alllocjs);

    var totalgeojsonLayer = L.geoJSON(alllocjs, {
      pointToLayer: function(feature, latlng) {
        var marker = L.marker(latlng);
        
        // if features are in radius add popup
        var point = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
        var distance = L.latLng(center).distanceTo(point);
        if (distance <= radius) {
        marker.bindPopup(`<b>${feature.properties.name}</b><br>
                  Opening Hours: ${feature.properties.opening_hours}<br> 
                  Shop: ${feature.properties.shop}<br>
                  <button onclick="window.location.href='http://127.0.0.1:5500/itemspage.html?shopID=${feature.id}'">Create Offers</button>
                  <button onclick="window.location.href='http://127.0.0.1:5500/offers.html?shopID=${feature.id}'">Show Offers</button>`
                  );
        }
        else {
          marker.bindPopup(`<b>${feature.properties.name}</b><br>
          Opening Hours: ${feature.properties.opening_hours}<br> 
          Shop: ${feature.properties.shop}<br>
          <button onclick="window.location.href='http://127.0.0.1:5500/offers.html?shopID=${feature.id}'">Show Offers</button>`
          );
        }
        return marker;
      }
    });
 
    marker=totalgeojsonLayer.addTo(mymap);
 
 
    let filteredLayer;
 
    button.addEventListener("click", () => {
      const input = document.getElementById("search-input");
      const value = input.value;
 
      try {
        mymap.removeLayer(filteredLayer);
      } catch (error) { 
        console.log(error);
      }
      
 
      filteredLayer = L.geoJSON(alllocjs, {
        filter: (feature) => feature.properties.name === value,
      });
        
   
      
        
      console.log(filteredLayer);
      try {   
        mymap.removeLayer(totalgeojsonLayer);
        
        filteredLayer.addTo(mymap);
        
        filteredLayer.bindPopup(`<b>${feature.properties.name}</b><br>
                    Opening Hours: ${feature.properties.opening_hours}<br> 
                    Shop: ${feature.properties.shop}<br>
                    <button onclick="window.location.href='http://127.0.0.1:5500/itemspage.html?shopID=${feature.id}'">Show Offers</button>`
                    );

      
      } catch (error) {
        console.log(error);
      }

      

      
      
    });
 
        
    fetch("http://127.0.0.1:4242/Map/:id")
      .then((response) => response.json())
      .then((liveofferids) => {
 
        console.log(liveofferids);

      var newliveofferids=liveofferids[0];
        
      //return shops from geojson with live offers
      // const filteredGeoJSON = alllocjs.filter(feature => {
      //   return newliveofferids.some(id => id.pois_id === feature.id);
      // });
      const filteredGeoJSON = alllocjs.filter(feature => {
        for (let id in newliveofferids) {
          if (newliveofferids[id].shop_id === feature.id) {
            return true;
          }
        }
        return false;
      });
 
      let filteredgeojsonLayer;
      filteredgeojsonLayer = L.geoJSON(filteredGeoJSON, {
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, markerStyle(feature));
          }
      });
      filteredgeojsonLayer.addTo(mymap);
      
      button.addEventListener("click", () => {
          try {
              mymap.removeLayer(filteredgeojsonLayer);
          } catch (error) {
              console.log(error);
          }
      });
 
    });



    /*
  const category = document.getElementById('category').value;
    fetch(http://127.0.0.1:4242/Map/:category?category=${category})
      .then((response) => response.json())
      .then((liveofferids) => {
 
      var newliveofferids=liveofferids[0];
        
      //return shops from geojson with specific category
      const filteredGeoJSON = alllocjs.filter(feature => {
        return newliveofferids.some(id => id.pois_id === feature.id);
      });
 
      let filteredgeojsonLayer;
      filteredgeojsonLayer = L.geoJSON(filteredGeoJSON, {
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, markerStyle(feature));
          }
      });
      filteredgeojsonLayer.addTo(mymap);
      
      
 
    });
  

    

 
    var popup = L.geoJSON(alllocjs, {
      pointToLayer: function(feature, latlng) {
        var marker = L.marker(latlng);
        
        marker.bindPopup(`<b>${feature.properties.name}</b><br>
                  Opening Hours: ${feature.properties.opening_hours}<br> 
                  Shop: ${feature.properties.shop}<br>
                  <button onclick="window.location.href='http://127.0.0.1:5500/itemspage.html?shopID=${feature.id}'">Show Offers</button>`
                  );
      
        return marker;
      }
    });
    
    marker=popup.addTo(mymap);
    */
    
 
  });