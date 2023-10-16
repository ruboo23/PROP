export const mapCoordinates = async (markers: any) => markers.map((marker: any) => ({ ...marker, latlng: { latitude: parseFloat(marker.Latitud), longitude: parseFloat(marker.Longitud) } }));
