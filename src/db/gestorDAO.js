/** @format */

const { getConexion } = require("./conexion");
const bcrypt = require("bcrypt");

async function validateLogin(email, password) {
  return new Promise((resolve, reject) => {
    const conexion = getConexion();
    conexion.query(
      "SELECT * FROM gestor WHERE correo_ges = ?",
      [email],
      async (error, result) => {
        if (error) return reject(new Error("Error al verificar el correo."));
        if (result.length === 0)
          return reject(new Error("Correo no encontrado."));

        const gestor = result[0];
        const match = await bcrypt.compare(password, gestor.contra_ges);
        if (!match) return reject(new Error("Contraseña incorrecta."));

        resolve(gestor);
      },
    );
  });
}

async function record(name, number, email, password) {
  return new Promise(async (resolve, reject) => {
    const conexion = getConexion();
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const [result] = await conexion
        .promise()
        .query("SELECT correo_ges FROM gestor WHERE correo_ges = ?", [email]);
      if (result.length > 0) return reject(new Error("El correo ya existe."));

      const [result2] = await conexion
        .promise()
        .query("SELECT num_ges FROM gestor WHERE num_ges = ?", [number]);
      if (result2.length > 0) return reject(new Error("El número ya existe."));

      const [result3] = await conexion
        .promise()
        .query(
          "SELECT CONCAT('G', LPAD(SUBSTRING(MAX(cod_ges), 2) + 1, 2, '0')) AS new_cod_ges FROM gestor",
        );
      const newCodGes = result3[0].new_cod_ges;

      await conexion
        .promise()
        .query(
          "INSERT INTO gestor (cod_ges, nom_ges, num_ges, correo_ges, contra_ges) VALUES (?, ?, ?, ?, ?)",
          [newCodGes, name, number, email, hashedPassword],
        );

      resolve({ newCodGes, name, email });
    } catch (error) {
      reject(new Error("Error al registrar el gestor: " + error.message));
    }
  });
}

module.exports = {
  validateLogin,
  record,
};
