//Importar la funcion conexcion
const { getConexion } = require('./conexion');

const listarComida = () => {
    return new Promise((resolve, reject) => {
        const conexion = getConexion();
        conexion.query(`SELECT * FROM comida`, (error, result) => {
            if (error) {
                return reject(error);
            }
            // Convertir los campos binarios (BLOB) a Base64
            const processedResult = result.map(comida => {
                if (comida.img1_com) {
                    comida.img1_com = `data:image/png;base64,${comida.img1_com.toString('base64')}`;
                }
                return comida;
            });

            resolve(processedResult);
        });
    });
};

// Función para registrar una nueva comida
function addFood(name, price, des, imgBuffer) {
  return new Promise((resolve, reject) => {
    const conexion = getConexion();
    conexion.query(
      "SELECT CONCAT('C', LPAD(SUBSTRING(MAX(cod_com), 2) + 1, 3, '0')) AS new_cod_com FROM comida",
      (error3, result3) => {
        if (error3) {
          console.error("Error al obtener el nuevo cod_com:", error3);
          return reject(new Error("Error al obtener el nuevo cod_com"));
        }
        const newCodCom = result3[0].new_cod_com;

        conexion.query(
          "INSERT INTO comida (cod_com, nom_com, des_com, precio_com, img1_com) VALUES (?, ?, ?, ?, ?)",
          [newCodCom, name, des, price, imgBuffer],
          (error4, result4) => {
            if (error4) {
              console.error("Error al insertar la comida:", error4);
              return reject(new Error("Error al insertar la comida"));
            }
            console.log("Comida registrada con éxito:", newCodCom);
            resolve({ newCodCom, name, des, price });
          }
        );
      }
    );
  });
}

  

module.exports = {
    listarComida,
    addFood,
}