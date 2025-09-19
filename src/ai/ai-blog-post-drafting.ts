'use server';

/**
 * @fileOverview AI-powered blog post draft generator.
 *
 * - generateBlogPostDraft - A function that generates an initial blog post draft.
 * - BlogPostDraftingInput - The input type for the generateBlogPostDraft function.
 * - BlogPostDraftingOutput - The return type for the generateBlogPostDraft function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BlogPostDraftingInputSchema = z.object({
  topic: z.string().describe('The topic of the blog post.'),
  keywords: z.string().describe('Keywords related to the blog post, separated by commas.'),
  style: z.string().describe('The desired writing style for the blog post (e.g., professional, casual, humorous).'),
  tone: z.string().describe('The tone of the blog post (e.g., informative, persuasive, narrative).'),
  length: z.string().describe('The desired length of the blog post (e.g., short, medium, long).'),
});
export type BlogPostDraftingInput = z.infer<typeof BlogPostDraftingInputSchema>;

const BlogPostDraftingOutputSchema = z.object({
  title: z.string().describe('The generated title of the blog post.'),
  content: z.string().describe('The generated content of the blog post draft.'),
  reasoning: z.string().describe('The reasoning behind the generated content and choices made.'),
});
export type BlogPostDraftingOutput = z.infer<typeof BlogPostDraftingOutputSchema>;

export async function generateBlogPostDraft(input: BlogPostDraftingInput): Promise<BlogPostDraftingOutput> {
  return blogPostDraftingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'blogPostDraftingPrompt',
  input: {schema: BlogPostDraftingInputSchema},
  output: {schema: BlogPostDraftingOutputSchema},
  prompt: `You are an AI assistant designed to help content creators generate initial blog post drafts. Your goal is to provide a well-structured and engaging draft based on the user's input.

  Here's the input you'll be working with:

  Topic: {{{topic}}}
  Keywords: {{{keywords}}}
  Style: {{{style}}}
  Tone: {{{tone}}}
  Length: {{{length}}}

  Instructions:

  1. Title Generation: Create an engaging and SEO-friendly title for the blog post.
  2. Content Generation: Develop the blog post content based on the provided topic, keywords, style, tone, and length. Structure the content with clear headings and subheadings to improve readability.
  3. Reasoning: Explain your content generation choices, including why you selected specific headings, keywords, and phrases. Provide insights into how the content aligns with the specified style, tone, and length.

  Output Format:

  Title: [Generated Title]
  Content: [Generated Blog Post Content]
  Reasoning: [Explanation of Content Generation Choices]
`,
});

const blogPostDraftingFlow = ai.defineFlow(
  {
    name: 'blogPostDraftingFlow',
    inputSchema: BlogPostDraftingInputSchema,
    outputSchema: BlogPostDraftingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
