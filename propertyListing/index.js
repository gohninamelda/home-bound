function initMap() {
    // Create the map.
    const singapore = { lat: 1.300816, lng: 103.850562 };
    const map = new google.maps.Map(document.getElementById("map"), {
      center: singapore,
      zoom: 17,
      mapId: "8d193001f940fde3",
    });
    
    
    new google.maps.Marker({
        position: singapore,
        map,
      });
      
    
    // Create the places service.
    const service = new google.maps.places.PlacesService(map);
    let getNextPage;
    const moreButton = document.getElementById("more");
  
    moreButton.onclick = function () {
      moreButton.disabled = true;
      if (getNextPage) {
        getNextPage();
      }
    };  
    // Perform a nearby search.
    service.nearbySearch(
      { location: singapore, radius: 500, type: "subway_station"},
      (results, status, pagination) => {
        if (status !== "OK" || !results) return;
  
        addPlaces(results, map);
        moreButton.disabled = !pagination || !pagination.hasNextPage;
        if (pagination && pagination.hasNextPage) {
          getNextPage = () => {
            // Note: nextPage will call the same handler function as the initial call
            pagination.nextPage();
          };
        }
      }
    );
  }



  function addPlaces(places, map) {
    const placesList = document.getElementById("places");
  
    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
  
        new google.maps.Marker({
          map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
        });
  
        const li = document.createElement("li");
  
        li.textContent = place.name;
        placesList.appendChild(li);
        li.addEventListener("click", () => {
          map.setCenter(place.geometry.location);
        });


          


      }
    }
  }
  

  window.initMap = initMap;