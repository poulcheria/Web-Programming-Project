import json
with open('data_map.geojson',encoding="utf8") as f:
    data = json.load(f)

for feature in data['features']:
    feature['id'] = feature['id'].replace("node/", "node_")
    feature['properties']['@id'] = feature['properties']['@id'].replace("node/", "node_")

with open('new_data.geojson', 'w') as f:
    json.dump(data, f)