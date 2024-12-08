const DB=require('../../db/comidaDAO')

function listarComida(){
    return DB.listarComida();
}

function addFood(name, price, des, img){
    return DB.addFood(name, price, des, img);
}

module.exports={
    listarComida,
    addFood,
}