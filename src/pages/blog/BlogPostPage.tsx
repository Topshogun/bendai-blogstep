import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../layouts/PageLayout';
import BlogContent from '../../components/blog/BlogContent';
import RelatedPosts from '../../components/blog/RelatedPosts';
import AuthorBio from '../../components/blog/AuthorBio';
import { useBlogPost } from '../../hooks/useBlogPost';

const BlogPostPage = () => {
  const { postSlug } = useParams();
  const { post, isLoading, error } = useBlogPost(postSlug);

  if (isLoading) {
    return (
      <PageLayout
        title="Loading..."
        description=""
        currentPath={`/blog/${postSlug}`}
      >
        <div className="animate-pulse">Loading...</div>
      </PageLayout>
    );
  }

  if (error || !post) {
    return (
      <PageLayout
        title="Post Not Found"
        description="The requested blog post could not be found."
        currentPath={`/blog/${postSlug}`}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <p className="text-gray-400">The requested blog post could not be found.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={post.title}
      description={post.excerpt}
      currentPath={`/blog/${postSlug}`}
    >
      <article className="max-w-4xl mx-auto">
        <BlogContent post={post} />
        <AuthorBio author={post.author} />
        <RelatedPosts posts={post.relatedPosts} />
      </article>
    </PageLayout>
  );
};

export default BlogPostPage;