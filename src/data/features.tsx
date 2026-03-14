import { Bot, Youtube, Database, Zap, Shield, Clock, Layout, Smartphone, Search } from "lucide-react";

export const features = [
  {
    id: "meeting-bots",
    title: "AI Meeting Bots",
    description: "Automated meeting transcription, summaries, and action items. Integrates with Zoom, Teams, and Google Meet.",
    icon: <Bot className="w-8 h-8 text-white" />,
    color: "bg-[#0EA5E9]", // Cyan blue
    delay: 0.1,
    image: "/images/meeting-bots.png",
    bullets: [
      "Save 1.5+ hours per meeting cycle",
      "Searchable AI meeting transcripts",
      "Auto-assigned action items"
    ],
    detailBullets: [
      "Real-time AI transcription across Zoom, Teams & Meet",
      "Smart speaker identification & attribution",
      "Automated action-item extraction & task assignment",
      "Searchable meeting archives & knowledge base",
      "AI-generated executive summaries after every call",
      "Multi-language transcription & translation",
      "CRM & calendar auto-sync of meeting outcomes",
      "Engagement analytics & talk-time insights",
      "Automated follow-up email drafts",
      "Integrates with 50+ enterprise tools"
    ],
    category: "AI & Automation"
  },
  {
    id: "video-summarization",
    title: "YouTube Video Summarization",
    description: "Convert hours of video content into digestible summaries. Perfect for training materials and webinars.",
    icon: <Youtube className="w-8 h-8 text-white" />,
    color: "bg-[#FF4500]", // Orange/Red
    delay: 0.2,
    image: "/images/video-summarization.png",
    bullets: [
      "Distill hours to 2-minute reads",
      "Timestamped key moments",
      "Turn webinars into training guides"
    ],
    detailBullets: [
      "Instant video-to-text summaries with key takeaways",
      "Timestamped highlight navigation for quick reference",
      "Multi-language subtitle generation & translation",
      "Automated training material creation from webinars",
      "SEO-ready content extraction for blog repurposing",
      "Searchable video library across your organization",
      "Speaker-attributed notes for panel discussions",
      "Sentiment analysis of presentation tone",
      "Chapter-based breakdown for long-form content",
      "Batch processing for entire YouTube channels"
    ],
    category: "AI & Automation"
  },
  {
    id: "crm-integrations",
    title: "CRM Integrations",
    description: "Seamlessly sync meeting insights with Salesforce, HubSpot, and other leading CRM platforms.",
    icon: <Database className="w-8 h-8 text-white" />,
    color: "bg-[#C026D3]", // Fuchsia
    delay: 0.3,
    image: "/images/crm-integrations.png",
    bullets: [
      "Auto-sync insights straight to CRM",
      "AI-powered lead scoring",
      "Predictive sales forecasting"
    ],
    detailBullets: [
      "One-click bi-directional sync with Salesforce & HubSpot",
      "AI-powered lead scoring based on conversation signals",
      "Predictive revenue forecasting from real deal data",
      "Automated contact & deal record creation post-meeting",
      "Custom field mapping to match your existing schema",
      "Sentiment analysis tags on every customer interaction",
      "Churn risk alerts based on engagement patterns",
      "Team performance dashboards & coaching insights",
      "Workflow triggers from meeting outcomes",
      "Historical trend analysis across all touchpoints"
    ],
    category: "AI & Automation"
  },
  {
    id: "enterprise-security",
    title: "Enterprise-Grade Security",
    description: "HIPAA-compliant infrastructure with SOC 2 Type II certification. Your data never leaves secure servers.",
    icon: <Shield className="w-8 h-8 text-white" />,
    color: "bg-[#10B981]", // Emerald
    delay: 0.5,
    image: "/images/enterprise-security.png",
    bullets: [
      "HIPAA & SOC 2 compliant",
      "Zero-trust, end-to-end encryption",
      "Private cloud AI deployments"
    ],
    detailBullets: [
      "HIPAA-compliant infrastructure with full audit trails",
      "SOC 2 Type II certified operations",
      "End-to-end encryption for data at rest & in transit",
      "Zero-trust access control with role-based permissions",
      "On-premise & private cloud AI deployment options",
      "Automated vulnerability scanning & patching",
      "DDoS protection & rate limiting",
      "Multi-factor authentication across all endpoints",
      "Encrypted backup & disaster recovery plans",
      "Penetration testing & compliance reporting"
    ],
    category: "Security & Infrastructure"
  },
  {
    id: "web-design",
    title: "Custom Web Design & Deployment",
    description: "Premium, high-performance web applications built with modern frameworks and cutting-edge design.",
    icon: <Layout className="w-8 h-8 text-white" />,
    color: "bg-[#3B82F6]", // Blue
    delay: 0.6,
    image: "/images/features/web-design.png",
    bullets: [
      "Unique brand identity & UI/UX",
      "Blazing-fast Core Web Vitals",
      "SEO-ready architecture"
    ],
    detailBullets: [
      "Fully custom UI/UX design tailored to your brand identity",
      "Performance-optimized code scoring 90+ on Web Vitals",
      "SEO-ready architecture with structured data & meta tags",
      "Responsive design that looks perfect on every device",
      "Scalable infrastructure that grows with your traffic",
      "API-first architecture for seamless third-party syncs",
      "Built-in analytics & conversion tracking dashboards",
      "ADA/WCAG accessibility compliance out of the box",
      "Global CDN deployment for sub-second load times",
      "Full code ownership with no vendor lock-in"
    ],
    category: "Engineering & Growth"
  },
  {
    id: "app-development",
    title: "Custom App Building & Deployment",
    description: "Native and cross-platform mobile applications crafted for engagement and rapid scaling.",
    icon: <Smartphone className="w-8 h-8 text-white" />,
    color: "bg-[#6366F1]", // Indigo
    delay: 0.7,
    image: "/images/features/app-dev.png",
    bullets: [
      "Native iOS & Android apps",
      "Offline-first robust architecture",
      "Auto-scaling enterprise backend"
    ],
    detailBullets: [
      "Cross-platform iOS & Android apps from one codebase",
      "Offline-first architecture with intelligent data sync",
      "Push notifications & real-time user engagement",
      "Biometric authentication & encrypted local storage",
      "Custom business logic tailored to your workflows",
      "Seamless integration with existing enterprise systems",
      "Real-time analytics & crash reporting dashboards",
      "App Store & Play Store submission management",
      "Microservices backend with auto-scaling infrastructure",
      "Role-based access control & permission management"
    ],
    category: "Engineering & Growth"
  },
  {
    id: "seo-optimization",
    title: "SEO Optimization & Strategy",
    description: "Data-driven SEO strategies that improve your search rankings, drive qualified organic traffic, and maximize your online visibility across all major search engines.",
    icon: <Search className="w-8 h-8 text-white" />,
    color: "bg-[#14B8A6]", // Teal
    delay: 0.8,
    image: "/images/features/seo-optimization.png",
    bullets: [
      "High-converting keyword strategy",
      "Local SEO & Maps dominance",
      "Technical audits & error fixes"
    ],
    detailBullets: [
      "AI-powered keyword research & search intent mapping",
      "Comprehensive technical SEO audits with fix pathways",
      "On-page optimization for titles, meta, headers & content",
      "Local SEO & Google Business Profile dominance",
      "Content cluster strategy for massive topical authority",
      "Competitor backlink analysis & link-building roadmap",
      "Core Web Vitals & critical page speed optimization",
      "Voice search & Google featured snippet targeting",
      "Schema markup & structured data implementation",
      "Monthly ranking reports with clear ROI attribution"
    ],
    category: "Engineering & Growth"
  }
];
