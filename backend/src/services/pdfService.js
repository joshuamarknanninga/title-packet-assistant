// backend/src/services/pdfService.js
import fs from 'fs';
import pdfParse from 'pdf-parse';

/**
 * Extracts plain text from a PDF at the given file path.
 * Works for text-based PDFs (not image-only scanned PDFs).
 */
export async function extractTextFromPdf(filePath) {
  const dataBuffer = await fs.promises.readFile(filePath);

  const result = await pdfParse(dataBuffer);

  // result.text is a big string of text from the PDF
  return result.text || '';
}
