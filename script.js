var mymap = L.map('map').setView([38.24624349342193, 21.735097191743026], 16);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

var geojsonLayer = new L.GeoJSON.AJAX("geojson.json");
var geojsonLayer = L.geoJson.ajax("http:webhost.fake/geojson.jsonp",{dataType:"jsonp"});

var geojsonLayer = L.geoJson.ajax("route/to/esri.json",{
    middleware:function(data){
        return esri2geoOrSomething(json);
    }
});

var geojsonLayer = L.geoJson.ajax("data.json");
geojsonLayer.addUrl("data2.json");//we now have 2 layers
geojsonLayer.refresh();//redownload the most recent layer
geojsonLayer.refresh("new1.json");//add a new layer replacing whatever is there

var geojsonLayer = L.geoJson.ajax("data.json");
geojsonLayer.refilter(function(feature){
    return feature.properties.key === values;
});

L.Util.ajax("url/same/origin.xml").then(function(data){
	doStuff(data);
});
//or
L.Util.jsonp("http://www.dif.ori/gin").then(function(data){
	doStuff(data);
});

var district_boundary = new L.geoJson();
district_boundary.addTo(map);

$.ajax({
dataType: "json",
url: "data/district.geojson",
success: function(data) {
    $(data.features).each(function(key, data) {
        district_boundary.addData(data);
    });
}
}).error(function() {});


