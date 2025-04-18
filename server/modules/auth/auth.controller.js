import * as authService from './auth.service.js';

export async function register(req, res){
    try{
        const user = await authService.registerUser(req.body);
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

export async function login(req, res){
    try{
        const user = await authService.loginUser(req.body);
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

export async function logout(req, res){
    try{
        const user = await authService.logoutUser(req.body);
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}