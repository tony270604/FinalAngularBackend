const DB=require('../../db/gestorDAO')

function validateLogin(email, password){
    return DB.validateLogin(email, password);
}

function record(name, number, email, password){
    return DB.record(name, number, email, password);
}
module.exports={
    validateLogin,
    record,
}