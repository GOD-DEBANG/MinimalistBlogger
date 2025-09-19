import PostForm from './components/post-form';

export default function NewPostPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <PostForm />
    </div>
  );
}
