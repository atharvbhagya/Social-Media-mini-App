const User= require('../../../models/user');
const jwt= require('jsonwebtoken');


module.exports.createSession = async function(req, res){
    try{

        let user= await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or may be password."

            });
        }

        return res.json(200, {
            message: "Sign in success, token given !",
            data: {
                token: jwt.sign(user.toJSON(), 'Atharv', {expiresIn: '100000'})
            }
        });
      
    }catch(err){
        console.log('********', err);
        return res.json(500,{
            message: "Internal Server Error"
        });
    }
}