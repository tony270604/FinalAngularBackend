const DB=require('../../db/gestorDAO')

function validateLogin(email, password){
    return DB.validateLogin(email, password);
}

function record(name, number, email, password){
    return DB.record(name, number, email, password);
}

function changePassword(email, password){
    return DB.changePassword(email, password);
}
module.exports={
    validateLogin,
    record,
    changePassword,
}