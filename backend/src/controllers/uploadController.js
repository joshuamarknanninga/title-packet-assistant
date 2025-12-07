import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { uploadAndAnalyze } from '../controllers/uploadController.js';

const router = Router();

const uploadDir = path.join(process.cwd(), 'src', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('file'), uploadAndAnalyze);

export default router;
