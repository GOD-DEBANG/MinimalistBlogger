
import { getPosts, getCategories, getTags } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { format } from 'date-fns';

const POSTS_PER_PAGE = 6;

export default async function BlogPage(props: { searchParams?: Promise<{ category?: string; tag?: string; page?: string; q?: string; }> }) {
  const searchParams = await props.searchParams;
  const allPosts = await getPosts(searchParams?.q);
  const categories = getCategories();
  const tags = getTags();

  const currentPage = Number(searchParams?.page || 1);
  const currentCategory = searchParams?.category;
  const currentTag = searchParams?.tag;
  const currentQuery = searchParams?.q;

  const filteredPosts = allPosts.filter(post => {
    if (currentCategory && post.category !== currentCategory) {
      return false;
    }
    if (currentTag && !post.tags.includes(currentTag)) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (params.get(name) === value) {
      params.delete(name);
    } else {
      params.set(name, value);
    }
    params.set('page', '1');
    return params.toString();
  };
  
  const createPaginationString = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', page.toString());
    return params.toString();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">{currentQuery ? `Search Results for "${currentQuery}"`: 'From the Blog'}</h1>
        {currentQuery && <p className="text-muted-foreground mt-2">{filteredPosts.length} post(s) found.</p>}
      </header>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-col items-start space-y-2 mb-8">
            <Link href="/blog" className={`text-sm ${!currentCategory ? 'font-bold text-primary' : 'text-muted-foreground hover:text-primary'}`}>All</Link>
            {categories.map(category => (
              <Link key={category} href={`/blog?${createQueryString('category', category)}`} className={`text-sm ${currentCategory === category ? 'font-bold text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                {category}
              </Link>
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Button asChild key={tag} variant={currentTag === tag ? 'default' : 'outline'} size="sm">
                <Link href={`/blog?${createQueryString('tag', tag)}`}>{tag}</Link>
              </Button>
            ))}
          </div>
        </aside>

        <main className="w-full md:w-3/4 lg:w-4/5">
          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map(post => (
                <Card key={post.id} className="flex flex-col">
                  <Link href={`/blog/${post.slug}`}>
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover rounded-t-lg"
                      data-ai-hint={post.imageHint}
                    />
                  </Link>
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                    <CardTitle className="text-lg">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow text-sm">
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="text-xs text-muted-foreground">
                    <p>{format(new Date(post.date), 'MMM d, yyyy')}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p>No posts found.</p>
          )}

          {totalPages > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                {currentPage > 1 &&
                  <PaginationItem>
                    <PaginationPrevious href={`/blog?${createPaginationString(currentPage - 1)}`} />
                  </PaginationItem>
                }
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink href={`/blog?${createPaginationString(i + 1)}`} isActive={currentPage === i + 1}>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                { currentPage < totalPages &&
                  <PaginationItem>
                    <PaginationNext href={`/blog?${createPaginationString(currentPage + 1)}`} />
                  </PaginationItem>
                }
              </PaginationContent>
            </Pagination>
          )}
        </main>
      </div>
    </div>
  );
}
