"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type Post } from "@/lib/posts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateBlogPostAction } from "../actions";
import { useState, useTransition } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters."),
  content: z.string().min(50, "Content must be at least 50 characters."),
  category: z.string().min(2, "Category is required."),
  tags: z.string().min(2, "At least one tag is required."),
});

type PostFormValues = z.infer<typeof formSchema>;

interface PostFormProps {
  post?: Post;
}

export default function PostForm({ post }: PostFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const defaultValues = post ? {
    ...post,
    tags: post.tags.join(', '),
  } : {
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
  };

  const form = useForm<PostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (data: PostFormValues) => {
    toast({
      title: "Post Submitted!",
      description: "Your post has been saved successfully.",
    });
    console.log(data);
  };

  const handleGenerate = () => {
    if (!topic) {
      toast({
        title: "Error",
        description: "Please enter a topic to generate content.",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);
    startTransition(async () => {
      try {
        const result = await generateBlogPostAction(topic);
        const titleMatch = result.match(/#\s*(.*)/);
        const title = titleMatch ? titleMatch[1] : topic;
        const content = result.replace(/#\s*(.*)\n/, '');
        
        form.setValue("title", title);
        form.setValue("content", content);

        toast({
          title: "Content Generated",
          description: "AI-generated draft has been populated in the form.",
        });

      } catch (error) {
        toast({
          title: "Generation Failed",
          description: (error as Error).message,
          variant: "destructive",
        });
      } finally {
        setIsGenerating(false);
      }
    });
  };

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
                <CardDescription>Fill in the details for your new blog post.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="The Future of Web Development" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea placeholder="A short summary of your post..." {...field} className="min-h-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content (Markdown)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Write your masterpiece here..." {...field} className="min-h-[300px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Technology" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (comma-separated)</FormLabel>
                        <FormControl>
                          <Input placeholder="React, Next.js, AI" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <Button type="submit" disabled={isPending}>
              {post ? 'Update Post' : 'Create Post'}
            </Button>
          </form>
        </Form>
      </div>
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Content Generation</CardTitle>
            <CardDescription>Get a head start with an AI-generated draft.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="topic">Blog Post Topic</Label>
              <Input 
                id="topic" 
                placeholder="e.g., The importance of UX in AI"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <Button onClick={handleGenerate} disabled={isGenerating || isPending} className="w-full">
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Draft
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
