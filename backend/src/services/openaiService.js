// backend/src/services/openaiService.js
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Paste your full system prompt here later
const SYSTEM_INSTRUCTIONS = `
You are a senior land title abstractor and examiner assistant...
[PASTE THE FULL SYSTEM PROMPT WE WROTE]
`;

export async function analyzeTitlePacket({ textContent }) {
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
    max_output_tokens: 4096
  });

  const first = response.output[0];
  const fullText = first.content[0].text;

  // Try to split summary vs JSON
  const jsonStart = fullText.indexOf('{');
  let humanSummary = fullText;
  let jsonData = {};

  if (jsonStart !== -1) {
    humanSummary = fullText.slice(0, jsonStart).trim();
    const jsonString = fullText.slice(jsonStart);
    try {
      jsonData = JSON.parse(jsonString);
    } catch (err) {
      console.error('Failed to parse JSON from model output:', err);
      jsonData = {};
    }
  }

  const requirements = jsonData.requirements ?? [];
  const exceptions = jsonData.exceptions ?? [];

  return { humanSummary, jsonData, requirements, exceptions };
}

