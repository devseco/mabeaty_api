const UserModel = require('../models/User');
const Usermodel = require('../models/User');
const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{11}$')).required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
});

class UserController {
    static async getAllUsers(req,res,next){
        const results = await Usermodel.getUser(req,res,next);
        if(results)
        res.send(results);
    }
    static async addnewuser(req,res,next){
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        } else{
            var name = req.body.name;
        var password = req.body.password;
        var phone  = req.body.phone;
        var city = req.body.city;
        var address = req.body.address;
        const results = await Usermodel.addNewUser(name,password,phone , city , address);
        res.send(results)
        }
        
    }
    static async getUserInfo(req, res, next) {
        try {
            const userId = req.params.id;
            const result = await UserModel.getUserInfo(userId);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            console.error('Error fetching User:', error);
            res.status(500).send('Failed to fetch User');
        }
    }

    static async login(req,res,next){
    const phone = req.body.phone;
    const result = await Usermodel.login(phone);
    res.send(result)
    }

}
module.exports = UserController;