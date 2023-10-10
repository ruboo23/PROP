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
        const latlng = Object.keys(response).length > 0 ? {latitude: parseFloat(response?.[0].lat), longitude: parseFloat(response?.[0].lon)} : {latitude: 0, longitude: 0};
        mappedMarkers.push({
            ...marker,
            id: marker.$id,
            latlng: latlng,
        });
    }
    return mappedMarkers;
}