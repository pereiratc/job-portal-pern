 import express from 'express';
 import dotenv from 'dotenv';
 import cors from 'cors';
 
 import authRoutes from './modules/auth/auth.routes.js';
 import userRoutes from './modules/user/user.routes.js';
 import resumeRoutes from './modules/resume/resume.routes.js';

 dotenv.config();
 const app = express();
 
 app.use(cors());
 app.use(express.json());

 app.use('/api/auth', authRoutes);
 app.use('/api/users', userRoutes);
 app.use('/api/resumes', resumeRoutes);

 //Rota de teste
 app.get('/', (req, res) => res.send('API esta funcionando...'));

 const PORT = process.env.PORT || 4000;
 app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));