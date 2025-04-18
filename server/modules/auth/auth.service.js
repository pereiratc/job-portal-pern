import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../config/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET; 

export async function registerUser({ email, password, name}){
    const hashed = await bcrypt.hash(password, 10); //funcao para criptografar a senha
    const user = await prisma.user.create({
        data: {
            email,
            password: hashed,
            name,
        },
    });
    return { id:user.id, email: user.email, name: user.name };
    //Ira retomar os dados do usuario criado
}

export async function loginUser({ email, password}){
    const user = await prisma.user.findUnique({ where: { email }});
    if(!user || !(await bcrypt.compare(password, user.password))){
        throw new Error('Credencias inválidas');
    }
    const token = jwt.sign({ 
        userId: user.id,
        role:user.role
    }, JWT_SECRET, { expiresIn: '8h' });

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        }
    };
}