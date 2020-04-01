const AuthService = require('../services/auth-service');
const instanceAuthService = new AuthService();

class AuthController {
    login = async (req, res) => {
          try{
           const data = await instanceAuthService.login(req, res);
           res.status(201).send({...data, message: "successfully logged in"}); 
            } catch (err){
                res.status(500).send({ message: err.message});

            }
    
    }
    signup = async (req,res) =>{
            try{
                await instanceAuthService.signup(req, res);
                res.status(201).send({ message: "user was created"});
            }
            catch(err) {
                res.status(500).send({ message: err.message});
            }
     
    };
}

module.exports = AuthController;