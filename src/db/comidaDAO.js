//Importar la funcion conexcion
const {getConexion}=require('./conexion');

function listarComida(){
    return new Promise((resolve, reject)=>{
        const conexion= getConexion();
        conexion.query(`select * from comida`,(error,result)=>{
            return error ? reject(error):resolve(result);
        });
    })
}

module.exports={
    listarComida,
}