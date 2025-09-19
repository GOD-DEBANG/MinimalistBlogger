import { getPostBySlug, getPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

// A simple markdown to HTML converter
const Markdown = ({ content }: { content: string }) => {
  if (!content) return null;
  const htmlContent = content
    .split('\n')
    .map(line => {
      if (line.startsWith('# ')) return `<h1 class="text-3xl font-bold my-4">${line.substring(2)}</h1>`;
      if (line.startsWith('## ')) return `<h2 class="text-2xl font-bold my-3">${line.substring(3)}</h2>`;
      if (line.startsWith('### ')) return `<h3 class="text-xl font-bold my-2">${line.substring(4)}</h3>`;
      if (line.trim() === '') return '<br />';
      return `<p class="my-4 text-lg leading-relaxed">${line}</p>`;
    })
    .join('');

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default async function PostPage({ params }: { params: { slug:string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }
  
  const allPosts = await getPosts();
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-8">
        <Badge variant="secondary" className="mb-4">{post.category}</Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 font-headline">{post.title}</h1>
        <div className="flex items-center space-x-4 text-muted-foreground text-sm">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{post.author.name}</span>
          </div>
          <span>&bull;</span>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
          </div>
        </div>
      </header>
      
      <Image
        src={post.imageUrl}
        alt={post.title}
        width={1200}
        height={600}
        className="w-full h-auto rounded-lg mb-8 object-cover aspect-video"
        priority
        data-ai-hint={post.imageHint}
      />
      
      <div className="prose prose-lg max-w-none">
        <Markdown content={post.content} />
      </div>

      <div className="mt-12 pt-8 border-t">
        <div className="flex gap-2">
          {post.tags.map(tag => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
      </div>
      
      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 font-headline">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map(relatedPost => (
              <Card key={relatedPost.id}>
                <Link href={`/blog/${relatedPost.slug}`}>
                   <Image src={relatedPost.imageUrl} alt={relatedPost.title} width={300} height={200} className="w-full h-32 object-cover rounded-t-lg" data-ai-hint={relatedPost.imageHint} />
                </Link>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
