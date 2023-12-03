import * as yup from 'yup'
import { verificarEmail } from './src/Servicies/ComercioService';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,100}$/;
const phoneRules = /^(\+\d*|\d+)$/;

export const registroComercioSchema = yup.object().shape({
  nombre: yup
  .string()
  .required("Es necesario un nombre para el comercio")
  ,
  descripcion: yup
  .string()
  .max(1000, "La descripción es demasiado larga")
  .required("La descripción es necesaria")
  ,
  horario : yup
  .string()
  .required("El horario es necesario")
  ,
  provincia: yup
  .string()
  .required("La provincia es necesaria"),
  telefono: yup
  .number()
  .min(9,"El teléfono es demasiado corto")
  ,
  email: yup
  .string()
  .email("Introduce un correo válido")
  .required("El correo es necesario"),
  contraseña: yup
  .string()
  .min(7, "Es necesario 7 caracteres")
  .matches(passwordRules, { message: "Es necesario una mayúsucla y un número" })
  .required("La contraseña es necesaria"),
  direccion: yup
  .string()
  .required("La dirección es necesaria")
})