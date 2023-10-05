export const mapMarkers = (markers: any) => {
    return markers.map((marker: any, index: number) => (
        {
            latlng: { latitude: marker.latitude, longitude: marker.longitude },
            title: marker.name,
            description: marker.description,
        }
    ));
}