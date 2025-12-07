import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_INSTRUCTIONS = `
You are a senior land title abstractor and examiner assistant...
[PASTE YOUR FULL SYSTEM PROMPT HERE – the one we wrote earlier]
`;

export async function analyzeTitlePacket({ textContent }) {
  // textContent can be: OCR’d PDF text / concatenated doc text / placeholder for now
  const response = await client.responses.create({
    model: 'gpt-4.1-mini',
    instructions: SYSTEM_INSTRUCTIONS,
    input: [
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: `Review the following documents as a title packet and perform your full workflow:\n\n${textContent}`
          }
        ]
      }
    ],
    // You *could* use structured outputs here later; for now, we'll parse manually
    max_output_tokens: 4096
  });

  const outputItem = response.output[0]; // text block (simplified assumption)
  const fullText = outputItem.content[0].text; // model's text output

  // Simple split: assume JSON is in a line starting with "{"
  const jsonStart = fullText.indexOf('{');
  let humanSummary = fullText;
  let jsonData = null;

  if (jsonStart !== -1) {
    humanSummary = fullText.slice(0, jsonStart).trim();
    const jsonString = fullText.slice(jsonStart);
    try {
      jsonData = JSON.parse(jsonString);
    } catch (e) {
      console.error('Failed to parse JSON from model output:', e);
      jsonData = {};
    }
  }

  // Pull requirements/exceptions out for convenience
  const requirements = jsonData?.requirements ?? [];
  const exceptions = jsonData?.exceptions ?? [];

  return { humanSummary, jsonData, requirements, exceptions };
}
