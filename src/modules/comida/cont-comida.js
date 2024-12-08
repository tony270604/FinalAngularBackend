const DB=require('../../db/comidaDAO')

function listarComida(){
    return DB.listarComida();
}

function addFood(name, price, des, img){
    return DB.addFood(name, price, des, img);
}

function editFood(codcom, name, price, des, imgBuffer){
    return DB.editFood(codcom, name, price, des, imgBuffer);
}
module.exports={
    listarComida,
    addFood,
    editFood,
}