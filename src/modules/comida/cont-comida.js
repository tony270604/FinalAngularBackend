const DB=require('../../db/comidaDAO')
//listado anterior:
function listarComida(){
    return DB.listarComida();
}


function addFood(name, price, des, img){
    return DB.addFood(name, price, des, img);
}

function editFood(cod_com, name, price, des, imgBuffer){
    return DB.editFood(cod_com, name, price, des, imgBuffer);
}

function deleteFood(cod_com){
    return DB.deleteFood(cod_com);
}
module.exports={
    listarComida,
    addFood,
    editFood,
    deleteFood,
}