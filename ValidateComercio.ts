import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,100}$/;
const phoneRules = /^(\+\d*|\d+)$/;

export const registroComercioSchema = yup.object().shape({
  nombre: yup
  .string()
  .required("Es necesario un nombre para el comercio")
  ,
  descripcion: yup
  .string()
  .max(1000, "La descripcion es demasiado larga")
  .required("La descripcion es necesaria")
  ,
  horario : yup
  .string()
  .required("El horario es necesario")
  ,
  telefono: yup
  .string()
  .min(9,"El telefono es demasiado corto")
  .matches(phoneRules, "Introduce un telefono valido")
  ,
  email: yup
  .string()
  .email("Introduce un correo valido")
  .required("El correo es necesario"),
  contraseña: yup
  .string()
  .min(7, "Es necesario 7 caracteres")
  .matches(passwordRules, { message: "Es necesario una mayusucla y un numero" })
  .required("La contraseña es necesaria")
})