import { ai } from '../genkit';
import { z } from 'zod';

export const generateBlogPost = ai.defineFlow(
  {
    name: 'generateBlogPost',
    inputSchema: z.object({ topic: z.string() }),
    outputSchema: z.string(),
  },
  async ({ topic }) => {
    const llmResponse = await ai.generate({
      prompt: `Generate a short, engaging blog post about "${topic}". The post should have a clear structure including a title, a brief introduction, several body paragraphs, and a concluding paragraph. Format the output in markdown. The title should be a level 1 heading (e.g., # Title).`,
      model: 'googleai/gemini-2.5-flash',
    });

    return llmResponse.text;
  }
);
