const jwt = require('jsonwebtoken');
const { private_key } = require('../config');

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({ message: 'no authorization'})
        }

        const decoded = jwt.verify(token, private_key)
        req.user = decoded;
        next()
    } catch(e) {
        res.status(401).json({ message: 'no authorization'})
    }
}