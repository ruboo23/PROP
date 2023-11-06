export default interface IComercio {
    id: number;
    nombre: string;
    direccion: string;
    telefono?: number;
    horario: string;
    web?: string;
    descripcion: string;
    nombreimagen?: string | null;
    provincia: string;
    contraseña: string;
    mail: string;
    instagram?: string;
    facebook?: string;
    latitud?: string;
    longitud?: string;
    idusuario: [Object]
    tipo_id: [Object]
    idcomercio: [Object]
  }
  