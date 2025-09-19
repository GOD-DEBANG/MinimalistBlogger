import { getPostBySlug } from '@/lib/posts';
import PostForm from '../../components/post-form';
import { notFound } from 'next/navigation';

export default function EditPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
