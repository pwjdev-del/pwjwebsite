import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | PWJ AI - AI Automation Insights & Guides",
  description: "Expert insights on AI automation, meeting bots, custom web apps, and enterprise AI solutions from PWJ (Purewave Josh LLC).",
  openGraph: {
    title: "Blog | PWJ AI - AI Automation Insights",
    description: "Expert insights on AI automation, meeting bots, custom web apps, and enterprise AI solutions from PWJ.",
    url: "https://mypwj.com/blog",
  },
};

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">PWJ AI Blog</h1>
        <p className="text-gray-400 text-lg mb-12">
          Insights on AI automation, meeting bots, custom web apps, and how
          businesses are using AI to work smarter.
        </p>
        <div className="space-y-8">
          {sorted.map((post) => (
            <article
              key={post.slug}
              className="border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-colors"
            >
              <Link href={`/blog/${post.slug}`}>
                <time className="text-sm text-gray-500">{post.date}</time>
                <h2 className="text-2xl font-semibold mt-1 mb-2 hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400">{post.excerpt}</p>
                <span className="inline-block mt-3 text-blue-400 text-sm font-medium">
                  Read more &rarr;
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
