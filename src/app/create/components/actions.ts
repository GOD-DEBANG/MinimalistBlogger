"use server";

import { generateBlogPost } from "@/ai/flows";
import { ai } from "@/ai/genkit";

export async function generateBlogPostAction(topic: string) {
  if (!topic) {
    throw new Error("Topic cannot be empty.");
  }
  
  try {
    const result = await generateBlogPost({ topic });
    return result;
  } catch (error) {
    console.error("Error generating blog post:", error);
    return "An error occurred while generating the blog post. Please try again.";
  }
}
