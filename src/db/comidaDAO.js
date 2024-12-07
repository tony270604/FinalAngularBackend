//Importar la funcion conexcion
const {getConexion}=require('./conexion');

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

module.exports={
    listarComida,
}