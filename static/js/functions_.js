  function load17(){
    map.removeLayer(kent_13);
    kent_17.addTo(map);
    var latlng = kent_17.getBounds().getCenter();
    map.flyTo(latlng);
  }


  function load13(){
    map.removeLayer(kent_17);
    kent_13.addTo(map);
    var latlng = kent_13.getBounds().getCenter();
    map.flyTo(latlng);
  }


function set_popup_content(responseData){
  var display_content = "Latitude: " + lat +
    "<br>Longitude: " + lon;
  if (map.hasLayer(kent_17) == true){
     display_content = display_content + "<br>Kent-2017: "+  landuse_type[~~responseData['Value17']-1];
  }
  if (map.hasLayer(kent_13) == true){
     display_content = display_content +     "<br>Kent-2013: "+  landuse_type[~~responseData['Value13']-1];
  }
 return display_content;
}

var pop_up = L.popup();

function zoom2latlong(){
  const coordinates = document.getElementsByName("srch-term")[0].value.replace(" ", "");
  const myArr = coordinates.split(",");
  lat = myArr[0];
  lon = myArr[1];
  var latlng = L.latLng(myArr[0], myArr[1]);
  console.log(latlng);
  console.log(map);
  map.flyTo(latlng);
  var query_url = '';
  query_url = query_url.concat('/maps/rast_val/', lon.replace(".", "x"),'/',lat.replace(".", "x"),'/');
  console.log(query_url);
  sendHttpRequest('GET', query_url).then(responseData => {
    pop_up.setLatLng(latlng);
    pop_up.setContent(
    set_popup_content(responseData)
    ).openOn(map);});
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
    var latlng = L.latLng(position.coords.latitude, position.coords.longitude);
    var query_url = '';
    console.log(latlng);
    lon = latlng.lng.toFixed(4);
    lat = latlng.lat.toFixed(4);
    map.flyTo(latlng);
    pop_up.setLatLng(latlng);
    query_url = query_url.concat('https://rasterfile.azurewebsites.net/maps/rast_val/', lat.replace(".", "x"),'/',lon.replace(".", "x"),'/')
    sendHttpRequest('GET', query_url).then(responseData => {
      pop_up.setContent(set_popup_content(responseData))
          .openOn(map);
      });
}


const getData = (e) => {
        var query_url = '';
        var value = 0;
        lon = e.latlng.lng.toFixed(4);
        lat = e.latlng.lat.toFixed(4);
        query_url = query_url.concat('//', lat.replace(".", "x"),'/',lon.replace(".", "x"),'/')
        console.log(query_url);
        sendHttpRequest('GET', query_url).then(responseData => {
        pop_up.setContent(set_popup_content(responseData))
            .openOn(map);
        });}

  const landuse_type = ["Forest", "Marsh", "Salt Water Intrusion", "Built",
        "Open Water", "Crop Fields", "Bare Soil Areas", "Open Field"];
      

const sendHttpRequest = (method, url, data) => {
          return fetch(url, {method: method,body: JSON.stringify(data),
      headers: data ? { 'Content-Type': 'application/json' } : {}
      }).then(response => {
      if (response.status >= 400) {
        return response.json().then(errResData => {
          const error = new Error('Something went wrong!');
          error.data = errResData;
          throw error;
        });
      }
      return response.json();
      });
      }
      
function latLngget(e) {
  
pop_up.setLatLng(e.latlng);
getData(e);
    }