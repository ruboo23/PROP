import sendPushNotification from "../Servicies/NotificationsServicie/NotificationService"
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { GetComercioById } from '../Servicies/ComercioService';
import { GetUsuarioById } from "../Servicies/UsuarioService/UsuarioServices";
import userSingleton from "../Servicies/GlobalStates/UserSingleton";
import comercioSingleton from "../Servicies/GlobalStates/ComercioSingleton";

const supabaseUrl = "https://cgqvfaotdatwfllyfmhr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNncXZmYW90ZGF0d2ZsbHlmbWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2MTAzNTYsImV4cCI6MjAxMzE4NjM1Nn0.R40ojFKkaT_AAHUADR5FknVkd3dPr238sJoRpz_sNk8";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

  export function subscribeAnuncios() {
    if (userSingleton.getUser()) { // Se suscribe a todos pero solo recibirá notificaciones de aquellos cuyo id esté en sus idcomercio
      supabase
      .channel('anuncio')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'anuncio' }, (payload) => {
        var comercioNombre = "";
        if (payload?.new?.comercio) {
          GetComercioById(payload.new.comercio).then((res) => {comercioNombre = res?.nombre; console.log(comercioNombre);})
        }
        if (payload?.new?.usuario) {
          GetUsuarioById(payload.new.usuario).then((res) => {usuarioNombre = res?.nickname; console.log(usuarioNombre);
            // mostrarlo solo si lo sigue
            if (res?.idcomercio.$values.filter(c => c.id == payload?.new?.comercio)) {
              sendPushNotification(`¡${comercioNombre} ha subido un anuncio!`, 'Ve a verlo, corre.', 14897, '1hw8IfFQUjr3vDsWNC4lNU');
              sendPushNotification(`¡${comercioNombre} ha subido un anuncio!`, 'Ve a verlo, corre.', 14728, 'Dq9t3wG5tveDAAoXbbJh8b');
              sendPushNotification(`¡${comercioNombre} ha subido un anuncio!`, 'Ve a verlo, corre.', 14812, '48w82obO11yLbRGleoGsQO');
            }
          })
        }
      })
      .subscribe()
    }
  }

  export function subscribeResenyasUsuario() {
    if (userSingleton.getUser()) { // Se suscribe a todos pero solo recibirá notificaciones de aquellos cuyo id esté en sus idcomercio
      supabase
      .channel('reseña')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reseña' }, async (payload) => {
        var comercioNombre = "";
        if (payload?.new?.comercio) {
          GetComercioById(payload.new.comercio).then((res) => {comercioNombre = res?.nombre; console.log(comercioNombre);})
        }
        // obtener el nombre de usuario del que ha subido la reseña
        var usuarioNombre = "";
        if (payload?.new?.usuario) {
          GetUsuarioById(payload.new.usuario).then((res) => {usuarioNombre = res?.nickname; console.log(usuarioNombre);
            // mostrarlo solo si lo sigue
            if (res?.idcomercio.$values.filter(c => c.id == payload?.new?.comercio)) {
              sendPushNotification(`Le han puesto una reseña a ${comercioNombre}!`, 'Ve a verla tan pronto como puedas.', 14897, '1hw8IfFQUjr3vDsWNC4lNU');
              sendPushNotification(`Le han puesto una reseña a ${comercioNombre}!`, 'Ve a verla tan pronto como puedas.', 14728, 'Dq9t3wG5tveDAAoXbbJh8b');
              sendPushNotification(`Le han puesto una reseña a ${comercioNombre}!`, 'Ve a verla tan pronto como puedas.', 14812, '48w82obO11yLbRGleoGsQO');

              console.log(usuarioNombre + ' sigue a ' + comercioNombre);
            }
          })
        }
      })
      .subscribe()
    }
  }

  export function subscribeResenyasComercio() {
    if (comercioSingleton.getComercio()) { // Se suscribe a todos pero solo recibirá notificaciones de aquellos cuyo id esté en sus idcomercio
      supabase
      .channel('reseña')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reseña' }, async (payload) => {
        // Comprobar si payload?.new.comercio == comercioSingleton.getComercio().id
        if (payload?.new?.comercio == comercioSingleton.getComercio().id) {
          // Obtener el nickname del que te ha puesto la reseña
          GetUsuarioById(payload.new.usuario).then((res) => {usuarioNombre = res?.nickname; console.log(usuarioNombre);
            // mostrarlo solo si lo sigue
            if (res?.idcomercio.$values.filter(c => c.id == payload?.new?.comercio)) {
              sendPushNotification(`${usuarioNombre} te ha puesto una reseña!`, 'Ve a verla tan pronto como puedas.', 14897, '1hw8IfFQUjr3vDsWNC4lNU');
              sendPushNotification(`${usuarioNombre} te ha puesto una reseña!`, 'Ve a verla tan pronto como puedas.', 14728, 'Dq9t3wG5tveDAAoXbbJh8b');
              sendPushNotification(`${usuarioNombre} te ha puesto una reseña!`, 'Ve a verla tan pronto como puedas.', 14812, '48w82obO11yLbRGleoGsQO');
            }
          })
        }
      })
      .subscribe()
    }
  }