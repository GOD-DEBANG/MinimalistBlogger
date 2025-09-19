import { Search, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getFeaturedPosts } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { redirect } from 'next/navigation';

export default function Home() {
  const featuredPosts = getFeaturedPosts();

  async function search(formData: FormData) {
    'use server';
    const q = formData.get('q');
    if (typeof q === 'string' && q) {
      redirect(`/blog/search?q=${q}`);
    }
  }

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <section className="py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-headline animate-fade-in-up">
            Welcome to Minimalist Blogger
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            A clean space for thoughts, stories, and ideas. Explore articles on tech, design, and personal growth.
          </p>
          <form action={search} className="max-w-md mx-auto relative animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input name="q" type="search" placeholder="Search posts..." className="pl-10 h-12 text-base" />
            <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10">
              <MoveRight className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-headline">Featured Posts</h2>
          <Button variant="link" asChild>
            <Link href="/blog">View All <MoveRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <Card key={post.id} className="flex flex-col overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out animate-fade-in" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
              <Link href={`/blog/${post.slug}`} className="block">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint={post.imageHint}
                />
              </Link>
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                <CardTitle className="text-xl leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                <p>{format(new Date(post.date), 'MMM d, yyyy')}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
