//Importar la funcion conexcion
const { getConexion } = require('./conexion');
//listado anterior sin filtros
/*const listarComida = () => {
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
};*/
//nuevo listado con filtros 
const listarComida = (search) => {
  return new Promise((resolve, reject) => {
    const conexion = getConexion();

    let query = `SELECT * FROM comida`;
    if (search) {
      query += ` WHERE nom_com LIKE ? OR nom_ing LIKE ? OR nom_cat LIKE ?`;
    }

    const params = search ? [`%${search}%`, `%${search}%`, `%${search}%`] : [];

    conexion.query(query, params, (error, result) => {
      if (error) {
        return reject(error);
      }

      const processedResult = result.map((comida) => {
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

//Funcion para editar una comida
function editFood(cod_com, name, price, des, imgBuffer) {
  return new Promise((resolve, reject) => {
    const conexion = getConexion();
    // Verificar si el cod_com existe
    conexion.query("SELECT cod_com FROM comida WHERE cod_com = ?", [cod_com], (error, result) => {
      if (error) {
        console.error("Error al verificar el cod_com:", error);
        return reject(new Error("Error al verificar el cod_com"));
      }
      if (result.length === 0) {
        return reject(new Error("El cod_com no existe"));
      }

      const query = `
        UPDATE Comida
        SET 
          nom_com = COALESCE(NULLIF(?, ''), nom_com),
          des_com = COALESCE(NULLIF(?, ''), des_com),
          precio_com = COALESCE(NULLIF(?, ''), precio_com),
          img1_com = COALESCE(NULLIF(?, ''), img1_com)
        WHERE cod_com = ?;
      `;

      conexion.query(
        query,
        [name, des, price, imgBuffer, cod_com],
        (error4, result4) => {
          if (error4) {
            console.error("Error al editar la comida:", error4);
            return reject(new Error("Error al editar la comida"));
          }
          console.log("Comida editada con éxito:", cod_com);
          resolve({ cod_com, name, des, price });
        }
      );
    });
  });
}

//Funcion para eliminar una Comida
function deleteFood(cod_com) {
  return new Promise((resolve, reject) => {
    const conexion = getConexion();
    // Verificar si el cod_com existe
    conexion.query("SELECT cod_com FROM comida WHERE cod_com = ?", [cod_com], (error, result) => {
      if (error) {
        console.error("Error al verificar el cod_com:", error);
        return reject(new Error("Error al verificar el cod_com"));
      }
      if (result.length === 0) {
        return reject(new Error("El cod_com no existe"));
      }
        conexion.query(
          "delete from Comida where cod_com=?",
          [cod_com],
          (error4, result4) => {
            if (error4) {
              console.error("Error al eliminar la comida:", error4);
              return reject(new Error("Error al eliminar la comida"));
            }
            console.log("Comida eliminada con éxito:", cod_com);
            resolve({ cod_com });
          }
        );
      }
    );
  });
}
module.exports = {
  listarComida,
  addFood,
  editFood,
  deleteFood,
}