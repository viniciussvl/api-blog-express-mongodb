const jwt = require('jsonwebtoken');

const Authentication = async function(req, res, next) {
    const id = req.params.id;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json( {message: 'Acesso Negado'} )
    }

    try {
        const secret = process.env.SECRET;        
        const decoded = await jwt.verify(token, secret);
        if(decoded.id !== id) {
            throw new Error("Token inválido");
        }

        next();
    } catch(error) {
        console.log(error);
        res.status(400).json( {message: 'Token inválido'} )
    }
}

module.exports = Authentication;