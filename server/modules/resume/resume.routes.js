import express from 'express';
import multer from 'multer';
import { uploadResume } from './resume.controller.js';
import { authMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', authMiddleware, upload.single('file'), uploadResume);

export default router;
