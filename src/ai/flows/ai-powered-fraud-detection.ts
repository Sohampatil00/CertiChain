// src/ai/flows/ai-powered-fraud-detection.ts
'use server';
/**
 * @fileOverview AI-powered fraud detection flow for document validation.
 *
 * - aiPoweredFraudDetection - A function that analyzes a document and flags it as potentially fraudulent.
 * - AiPoweredFraudDetectionInput - The input type for the aiPoweredFraudDetection function.
 * - AiPoweredFraudDetectionOutput - The return type for the aiPoweredFraudDetection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPoweredFraudDetectionInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A document to validate, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  documentDescription: z.string().describe('A description of the document being validated.'),
});
export type AiPoweredFraudDetectionInput = z.infer<typeof AiPoweredFraudDetectionInputSchema>;

const AiPoweredFraudDetectionOutputSchema = z.object({
  isFraudulent: z.boolean().describe('Whether or not the document is potentially fraudulent.'),
  reason: z.string().describe('The reason why the document is flagged as potentially fraudulent.'),
});
export type AiPoweredFraudDetectionOutput = z.infer<typeof AiPoweredFraudDetectionOutputSchema>;

export async function aiPoweredFraudDetection(input: AiPoweredFraudDetectionInput): Promise<AiPoweredFraudDetectionOutput> {
  return aiPoweredFraudDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredFraudDetectionPrompt',
  input: {schema: AiPoweredFraudDetectionInputSchema},
  output: {schema: AiPoweredFraudDetectionOutputSchema},
  prompt: `You are an AI-powered fraud detection tool that analyzes documents and flags potentially fraudulent ones. You will review the document, considering its description, and determine if it should be flagged for manual review.

Document Description: {{{documentDescription}}}
Document: {{media url=documentDataUri}}

Based on your analysis, determine if the document is potentially fraudulent. If so, explain the reason.

Return a JSON object with the following format:
{
  "isFraudulent": true or false,
  "reason": "reason for flagging as fraudulent or 'No reason' if not fraudulent"
}`, // Explicitly state JSON format
});

const aiPoweredFraudDetectionFlow = ai.defineFlow(
  {
    name: 'aiPoweredFraudDetectionFlow',
    inputSchema: AiPoweredFraudDetectionInputSchema,
    outputSchema: AiPoweredFraudDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
