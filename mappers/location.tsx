export const mapCoordinates = async (markers: any) => {
    const mappedMarkers = [];
    for (const marker of markers) {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                marker.Direccion
            )}`
        ).then((response) => {
            return response.json();
          });
        const latlng = {latitude: parseFloat(response[0].lat), longitude: parseFloat(response[0].lon)};
        mappedMarkers.push({
            title: marker.Nombre,
            description: marker.Descripcion,
            latlng: latlng,
        });
    }
    return mappedMarkers;
}