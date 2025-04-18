import * as jwt from 'jsonwebtoken';
export function authMiddleware (req, res, next){
    const authHeader = req.headers.autorization;
    if(!authHeader) return res.status(401).send({message: 'Token não informado'});

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded;
        next();
    }catch(error){
        res.status(401).json({error: 'Token inválido'});
    }
    }