const UserModel = require('../models/User');
const Usermodel = require('../models/User');

class UserController {
    static async getAllUsers(req,res,next){
        const results = await Usermodel.getUser(req,res,next);
        if(results)
        res.send(results);
    }
    static async addnewuser(req,res,next){
        var name = req.body.name;
        var password = req.body.password;
        var email = req.body.email;
        const results = await Usermodel.addNewUser(name,password,email);
        if(results)
        res.send('Add Users Success')
        else
        res.send('Add user Failed')
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