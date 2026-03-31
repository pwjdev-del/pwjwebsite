import { MetadataRoute } from 'next';
import { features } from '@/data/features';
import { industries } from '@/data/industries';
import { blogPosts } from '@/data/blog-posts';
import { siteConfig } from '@/data/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Root and static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/open-claw',
    '/hipaa',
    '/privacy',
    '/terms',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Service routes
  const serviceRoutes = features.map((feature) => ({
    url: `${baseUrl}/services/${feature.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic Industry routes
  const industryRoutes = industries.map((industry) => ({
    url: `${baseUrl}/industries/${industry.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Blog post routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...blogRoutes];
}
