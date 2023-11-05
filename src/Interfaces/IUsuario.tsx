
 export default interface IUsuario {
    id: Number,
    nombre: String,
    nickname: String,
    telefono?: String,
    nombreimagen?: String,
    contraseña: String,
    mail: String, 
    estado?: String,
    idcomercio: [Object],
    idseguido: [Object],
    idseguidor: [Object]
}