const DB=require('../../db/comidaDAO')

function listarComida(){
    return DB.listarComida();
}

module.exports={
    listarComida,
}