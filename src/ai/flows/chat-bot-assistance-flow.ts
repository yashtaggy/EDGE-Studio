'use server';
/**
 * @fileOverview An AI assistant flow for answering questions about the EDGE Central Command Portal.
 *
 * - chatBotAssistance - A function that handles user questions about the portal.
 * - ChatBotAssistanceInput - The input type for the chatBotAssistance function.
 * - ChatBotAssistanceOutput - The return type for the chatBotAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatBotAssistanceInputSchema = z.object({
  question: z
    .string()
    .describe('The user\'s question about the EDGE Central Command Portal and its functionalities.'),
});
export type ChatBotAssistanceInput = z.infer<typeof ChatBotAssistanceInputSchema>;

const ChatBotAssistanceOutputSchema = z.object({
  answer: z.string().describe('The AI chatbot\'s answer to the user\'s question.'),
});
export type ChatBotAssistanceOutput = z.infer<typeof ChatBotAssistanceOutputSchema>;

export async function chatBotAssistance(
  input: ChatBotAssistanceInput
): Promise<ChatBotAssistanceOutput> {
  return chatBotAssistanceFlow(input);
}

const chatBotAssistancePrompt = ai.definePrompt({
  name: 'chatBotAssistancePrompt',
  input: {schema: ChatBotAssistanceInputSchema},
  output: {schema: ChatBotAssistanceOutputSchema},
  prompt: `You are an AI assistant for the 'EDGE Central Command Portal'. Your purpose is to answer user questions about the portal's functionalities and navigation links.

The portal has the following core features:
-   **Centralized Navigation Dashboard**: Displays four large, responsive navigation buttons in a 2x2 grid, each linked to a specific internal resource or external URL.
-   **External Link Integration**: Each navigation button securely opens a specified external URL in a new browser tab with appropriate security attributes ('target='_blank'', 'rel='noopener noreferrer'').
-   **Responsive User Interface**: The application's layout and components adapt gracefully across various screen sizes, from desktop to mobile devices.
-   **AI Chatbot Widget Placeholder**: A dedicated visual space for AI chatbot integration (this is you!).
-   **AI Data Ingestion API Placeholder**: An API endpoint ('/api/agent/ingestData') for future AI tool data ingestion, currently returning 'AI integration pending; logic not implemented.'.
-   **AI Query API Placeholder**: An API endpoint ('/api/agent/query') for future AI tool query processing, currently returning 'AI integration pending; logic not implemented.'.
-   **Secure URL Handling**: All URL values are sanitized prior to rendering to prevent injection vulnerabilities.

Answer the user's question clearly and concisely, referring to these features and explaining how the portal works. Do not invent features or functionalities not mentioned above.

User Question: {{{question}}}`,
});

const chatBotAssistanceFlow = ai.defineFlow(
  {
    name: 'chatBotAssistanceFlow',
    inputSchema: ChatBotAssistanceInputSchema,
    outputSchema: ChatBotAssistanceOutputSchema,
  },
  async input => {
    const {output} = await chatBotAssistancePrompt(input);
    return output!;
  }
);
