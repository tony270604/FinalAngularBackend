//Importar la funcion conexcion
const { getConexion } = require('./conexion');


function validateLogin(email, password) {
    return new Promise((resolve, reject) => {
        const conexion = getConexion();
        conexion.query(
            "SELECT * FROM gestor WHERE correo_ges = ?",
            [email],
            (error, result) => {
                if (result.length === 0) {
                    console.log("Correo no encontrado en la base de datos:", email);
                    return reject(new Error("Correo no encontrado."));
                }
                const gestor = result[0];
                if (password === gestor.contra_ges) {
                    console.log("Contraseña válida para el gestor:", gestor);
                    resolve(gestor);
                } else {
                    console.log("Contraseña incorrecta para el email:", email);
                    return reject(new Error("Contraseña incorrecta."));
                }
            }
        );
    });
}


// Función para registrar un nuevo gestor 
function record(name, number, email, password) {
    return new Promise((resolve, reject) => { 
        const conexion = getConexion();
        // Verificar si el correo existe 
        conexion.query("SELECT correo_ges FROM gestor WHERE correo_ges = ?", [email], (error, result) => {
            if (error) {
                console.error("Error al verificar el CORREO:", error);
                return reject(new Error("Error al verificar el CORREO"));
            } if (result.length > 0) {
                return reject(new Error("El CORREO ya existe"));
            }
            // Verificar si el número existe 
            conexion.query("SELECT num_ges FROM gestor WHERE num_ges = ?", [number], (error2, result2) => {
                if (error2) {
                    console.error("Error al verificar el número:", error2);
                    return reject(new Error("Error al verificar el número"));
                } if (result2.length > 0) {
                    return reject(new Error("El número ya existe"));
                }
                // Obtener el nuevo código de gestor 
                conexion.query("SELECT CONCAT('G', LPAD(SUBSTRING(MAX(cod_ges), 2) + 1, 2, '0')) AS new_cod_ges FROM gestor", (error3, result3) => {
                    if (error3) {
                        console.error("Error al obtener el nuevo cod_ges:", error3);
                        return reject(new Error("Error al obtener el nuevo cod_ges"));
                    } 
                    const newCodGes = result3[0].new_cod_ges;
                    // Realizar la inserción del nuevo vendedor 
                    conexion.query("INSERT INTO gestor (cod_ges, nom_ges, num_ges, correo_ges, contra_ges) VALUES (?, ?, ?, ?, ?)",
                        [newCodGes, name, number, email, password], (error4, result4) => {
                            if (error4) {
                                console.error("Error al insertar el gestor:", error4);
                                return reject(new Error("Error al insertar el gestor"));
                            } 
                            console.log("Gestor registrado con éxito:", newCodGes);
                            resolve({ newCodGes, name, email });
                        });
                });
            });
        });
    });
}


module.exports = {
    validateLogin,
    record,
}
