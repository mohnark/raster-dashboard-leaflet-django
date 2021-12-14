function load17(){
  var latlng = L.latLngBounds([38.830543, -75.789989154039],[39.366856, -75.269031]);
  map.removeLayer(kent_13);
  kent_17.addTo(map);
  map.fitBounds(latlng);
}


function load13(){
  var latlng = L.latLngBounds([38.830543, -75.789989154039],[39.366856, -75.269031]);
  map.removeLayer(kent_17);
  kent_13.addTo(map);
  map.fitBounds(latlng);
}


function getFeatureInfoUrl(latlng, layer, url) {
    var point = map.latLngToContainerPoint(latlng);
        size = map.getSize(),
        params = {
        request: 'GetFeatureInfo',
        service: 'WMS',
        srs: 'EPSG:4326',
        styles: layer.wmsParams.styles,
        transparent: layer.wmsParams.transparent,
        version: layer.wmsParams.version,
        format: layer.wmsParams.format,
        bbox: [-75.789989154039,38.830543,-75.269031,39.366856],
        height: size.y,
        width: size.x,
        layers: layer.wmsParams.layers,
        query_layers: layer.wmsParams.layers,
        info_format: 'application/json'
        };
    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;
    return url + L.Util.getParamString(params, url, true);
  }


function get_pallete(content){
  try{
    return content["features"][0]["properties"]["PALETTE_INDEX"];
  }
  catch(err){
    // console.log(err);
  return 15;}
}




// const getData = (e) => {   
//     if (map.hasLayer(kent_17) == true){
//         var url = getFeatureInfoUrl(e.latlng,  kent_17, base_url);
//         getFeatureInfo(url, kent_17, function (callback){
//             kent_17_palette = get_pallete(ajax_exec);
//             console.log(kent_17_palette);
//         });
//         // kent_17_palette = get_pallete(ajax_exec);
//         // display_content = display_content + "<br>Kent-2017: "+landuse_type[kent_17_palette];
//         console.log("Waiting Ajax");
//     }
//     // if (map.hasLayer(kent_13) == true){
//     //     var url = getFeatureInfoUrl(e.latlng,  kent_13, base_url);
//     //     var ajx = getFeatureInfo(url, display_content, kent_13);
//     //     console.log("Waiting Ajax");
//         // kent_13_palette = get_pallete(ajax_exec);
//         // display_content = display_content + "<br>Kent-2013: "+landuse_type[kent_13_palette];
//     // }
//     L.popup({ maxWidth: 800})
//     .setLatLng(e.latlng)
//     .setContent(display_content)
//     .openOn(map);    

// }


function show_vals(latlng){
  bounding_box = L.latLngBounds([38.830543, -75.789989154039],[39.366856, -75.269031]);
  var pop_up = L.popup();
  var display_content = "Latitude: " + latlng.lat.toFixed(4) +
  "<br>Longitude: " + latlng.lng.toFixed(4);
  
  pop_up.setLatLng(latlng);

  if (bounding_box.contains(latlng)){  
  try{
    var url_kent_17 = getFeatureInfoUrl(latlng,  kent_17, base_url);
  }

  catch(err){
    console.log(err);
  }
  
  try{    
    var url_kent_13 = getFeatureInfoUrl(latlng,  kent_13, base_url);
  }

  catch(err){
    console.log(err);
  }
  
  $.when(
    $.ajax({
    url: url_kent_13,
    success: function (data, status, xhr) {
      var err = typeof data === 'string' ? null : data;
      var kent_13_palette=get_pallete(data);
      if (map.hasLayer(kent_13) == true && kent_13_palette<8){
        display_content = display_content +     "<br>Kent-2013: "+  landuse_type[kent_13_palette];
        pop_up; 
    }

        },
    error: function (xhr, status, error) {
      showResults(error);
    }
  })
,
$.ajax({
url: url_kent_17,
success: function (data, status, xhr) {
  var err = typeof data === 'string' ? null : data;
  var kent_17_palette=get_pallete(data);
  if (map.hasLayer(kent_17) == true && kent_17_palette<8){
    display_content = display_content + "<br>Kent-2017: "+  landuse_type[kent_17_palette];
    pop_up; 
}
},
error: function (xhr, status, error) {
  showResults(error);
}
})
).done(function (){
pop_up.setContent(display_content)
.openOn(map);
});
}
else{
  display_content = display_content+"<br>Out of Bounds";
  pop_up.setContent(display_content).openOn(map);

}


}


function latlngget(e){   
  show_vals(e.latlng);

  //     var pop_up = L.popup();
//     var display_content = "Latitude: " + e.latlng.lat.toFixed(4) +
//     "<br>Longitude: " + e.latlng.lng.toFixed(4);
//     pop_up.setLatLng(e.latlng);
//     // getData(e);
//     try{
//       var url_kent_17 = getFeatureInfoUrl(e.latlng,  kent_17, base_url);
//     }

//     catch(err){
//       console.log(err);
//     }
    
//     try{    
//       var url_kent_13 = getFeatureInfoUrl(e.latlng,  kent_13, base_url);
//     }

//     catch(err){
//       console.log(err);
//     }
    
    
//       $.when(
//         $.ajax({
//         url: url_kent_13,
//         success: function (data, status, xhr) {
//           var err = typeof data === 'string' ? null : data;
//           kent_13_palette=get_pallete(data);
//           if (map.hasLayer(kent_13) == true && kent_13_palette<8){
//             display_content = display_content +     "<br>Kent-2013: "+  landuse_type[kent_13_palette];
//             pop_up; 
//         }

//             },
//         error: function (xhr, status, error) {
//           showResults(error);
//         }
//       })
//   ,
//   $.ajax({
//     url: url_kent_17,
//     success: function (data, status, xhr) {
//       var err = typeof data === 'string' ? null : data;
//       kent_17_palette=get_pallete(data);
//       if (map.hasLayer(kent_17) == true && kent_17_palette<8){
//         display_content = display_content + "<br>Kent-2017: "+  landuse_type[kent_17_palette];
//         pop_up; 
//     }
// },
//     error: function (xhr, status, error) {
//       showResults(error);
//     }
//   })
// ).done(function (){
//     pop_up.setContent(display_content)
//     .openOn(map);
//     console.log(display_content);
// });     


}


function zoom2latlong(){
  const coordinates = document.getElementsByName("srch-term")[0].value.replace(" ", "");
  const myArr = coordinates.split(",");
  lat = myArr[0];
  lon = myArr[1];
  var latlng = L.latLng(myArr[0], myArr[1]);
  show_vals(latlng);
  map.flyTo(latlng);

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
  map.flyTo(latlng);
  show_vals(latlng);
}