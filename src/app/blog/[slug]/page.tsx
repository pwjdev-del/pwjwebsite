import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog-posts";
import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://mypwj.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "PWJ AI - Purewave Josh LLC",
      url: "https://mypwj.com",
    },
    publisher: {
      "@type": "Organization",
      name: "PWJ AI - Purewave Josh LLC",
      url: "https://mypwj.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mypwj.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-black text-white">
        <article className="max-w-3xl mx-auto px-6 py-20">
          <Link
            href="/blog"
            className="text-blue-400 hover:text-blue-300 text-sm mb-8 inline-block"
          >
            &larr; Back to Blog
          </Link>
          <time className="text-sm text-gray-500 block mb-2">{post.date}</time>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          <p className="text-xl text-gray-400 mb-10 leading-relaxed">
            {post.excerpt}
          </p>
          <div
            className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400 prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-16 pt-8 border-t border-gray-800">
            <Link
              href="/blog"
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              &larr; More articles from PWJ AI
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
