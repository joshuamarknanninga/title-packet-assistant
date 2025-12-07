// backend/src/controllers/uploadController.js
import { File, Analysis } from '../models/index.js';
import { analyzeTitlePacket } from '../services/openaiService.js';
import { extractTextFromPdf } from '../services/pdfService.js';

export const uploadAndAnalyze = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Save file record in DB
    const newFile = await File.create({
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      path: req.file.path,
      size: req.file.size
    });

    // Extract text from the uploaded PDF
    const textContent = await extractTextFromPdf(req.file.path);

    if (!textContent || textContent.trim().length === 0) {
      console.warn(
        `PDF text extraction returned empty for file ${newFile.originalName}. It may be a scanned image.`
      );
    }

    // Call OpenAI to analyze the packet
    const { humanSummary, jsonData, requirements, exceptions } =
      await analyzeTitlePacket({ textContent });

    // Store analysis in DB
    const analysis = await Analysis.create({
      fileId: newFile.id,
      humanSummary,
      jsonData,
      requirements,
      exceptions
    });

    // Respond to the client
    res.status(201).json({
      file: newFile,
      analysis
    });
  } catch (err) {
    next(err);
  }
};

