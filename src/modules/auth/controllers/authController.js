const authService = require('../services/authService');
const { presentRegister } = require('../presenters/authPresenter');
const { presentError } = require('../../common/responsePresenter');


const registerUser = async(req,res)=>{

    console.log('entra Controller');
    try{

        const result = await authService.registerAdmin(
            req.body
        );


        res.status(201).json(
            presentRegister(result)
        );


    }catch(error){

        res.status(400).json(
            presentError(error.message)
        );

    }

};



module.exports = {
    registerUser
};