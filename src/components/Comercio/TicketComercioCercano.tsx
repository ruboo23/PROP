
function calcularDistancia(lat1: any, lon1: any, lat2: any, lon2: any) {
  const radioTierraKm = 6371; // Radio de la Tierra en kilómetros


  // Convertir las coordenadas de grados decimales a radianes
  const lat1Rad = (parseFloat(lat1) * Math.PI) / 180;
  const lon1Rad = (parseFloat(lon1) * Math.PI) / 180;
  const lat2Rad = (parseFloat(lat2) * Math.PI) / 180;
  const lon2Rad = (parseFloat(lon2) * Math.PI) / 180;

  // Diferencias entre las latitudes y longitudes
  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;

  // Fórmula de la distancia haversine
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.asin(Math.sqrt(a));

  // Calcular la distancia en kilómetros
  const distanciaKm = radioTierraKm * c;

  // Convertir la distancia a metros
  const distanciaMetros = Math.round(distanciaKm * 1000 * 100) / 100; // Redondear a dos decimales



  return distanciaMetros;
}

export default function TicketComercioCercano(comercio: any, location: any){
  var distancia: any = 0.0;
  var verificacion;

  distancia = calcularDistancia(location.latitude, location.longitude, comercio.Latitud, comercio.Longitud);

  if(distancia < 3000)
  {
    verificacion = true;
  } else{
    verificacion = false;
  }

  return verificacion;
}