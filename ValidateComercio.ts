import * as yup from 'yup'
import { EmailExistente } from './src/Servicies/ComercioService';

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
  telefono: yup
  .string()
  .min(9,"El teléfono es demasiado corto")
  .matches(phoneRules, "Introduce un teléfono válido")
  ,
  email: yup
  .string()
  .email("Introduce un correo válido")
  .required("El correo es necesario")
  .test("Unico", "Este correo ya existe", values => {
    return EmailExistente(values)
  }),
  contraseña: yup
  .string()
  .min(7, "Es necesario 7 caracteres")
  .matches(passwordRules, { message: "Es necesario una mayúsucla y un número" })
  .required("La contraseña es necesaria"),
  direccion: yup
  .string()
  .required("La dirección es necesaria")
})