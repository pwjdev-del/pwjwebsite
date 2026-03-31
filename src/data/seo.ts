export const siteConfig = {
  name: "Purewave Josh LLC",
  url: "https://mypwj.com",
  phone: "(941) 555-0199",
  email: "pwjdev@gmail.com",
  region: "Florida, US",
  description: "AI Automation Agency providing enterprise-grade AI meeting bots, video summarization, and custom AI infrastructure.",
};

export const defaultMetadata = {
  title: {
    default: "AI Summarization & Productivity Agency | Purewave Josh LLC",
    template: "%s | Purewave Josh LLC",
  },
  description: siteConfig.description,
  keywords: ["AI", "Automation Agency", "Productivity", "Florida AI consultant", "Enterprise AI", "Local AI workflows"],
};

export const serviceMetadata: Record<string, { title: string; description: string; keywords: string[] }> = {
  "meeting-bots": {
    title: "AI Meeting Bots & Transcription",
    description: "Automate transcription and meeting summaries with AI Meeting bots. Integrate seamlessly with Zoom, Teams, and Google Meet to reclaim hours every week.",
    keywords: ["AI Meeting bots", "automated meeting transcription", "zoom ai integration", "meeting summaries ai", "florida ai agency"]
  },
  "video-summarization": {
    title: "YouTube Video Summarization AI",
    description: "Convert hours of YouTube and video content into digestible text summaries. Ideal for training materials, webinars, and fast content extraction.",
    keywords: ["video summarization ai", "youtube summarizer", "ai content extraction", "webinar ai summary", "ai automation agency"]
  },
  "crm-integrations": {
    title: "Custom CRM AI Integrations",
    description: "Sync your meeting insights and AI data seamlessly into Salesforce, HubSpot, and other leading CRM platforms with custom AI integrations.",
    keywords: ["crm ai integration", "salesforce ai sync", "hubspot ai automation", "custom crm workflows", "florida tech consulting"]
  },
  "industries": {
    title: "AI Workflows for Healthcare & Real Estate",
    description: "Purpose-built AI workflows and automation for Florida healthcare, real estate brokerages, and enterprise organizations.",
    keywords: ["healthcare ai workflows", "real estate ai automation", "enterprise ai solutions", "hipaa compliant ai", "florida ai consulting"]
  },
  "enterprise-security": {
    title: "Enterprise-Grade Secure AI Infrastructure",
    description: "HIPAA-compliant, SOC 2 ready private cloud AI solutions. Ensure your corporate data remains secure with offline and local AI deployments.",
    keywords: ["secure ai infrastructure", "hipaa compliant ai", "offline ai models", "private cloud ai", "enterprise ai security"]
  },
  "pricing": {
    title: "Transparent AI Automation Pricing",
    description: "Clear, transparent pricing structures for our AI automation solutions with zero hidden API costs and rapid return on investment.",
    keywords: ["ai automation cost", "transparent tech pricing", "roi ai tools", "flat rate ai consulting"]
  },
  "web-design": {
    title: "Custom Web Design & Deployment",
    description: "High-performance, beautifully designed web applications tailored to amplify your brand and handle heavy AI traffic.",
    keywords: ["custom web design", "high performance web apps", "florida web development", "ai agency web design"]
  },
  "app-development": {
    title: "Custom AI App Development",
    description: "Native iOS, Android, and cross-platform mobile apps embedded with powerful AI backend integrations.",
    keywords: ["ai app development", "custom mobile apps", "cross platform ai apps", "florida app developer"]
  },
  "seo-optimization": {
    title: "SEO Optimization & Strategy",
    description: "Data-driven SEO strategies that improve your search rankings, drive qualified organic traffic, and maximize your online visibility across all major search engines.",
    keywords: ["seo optimization", "search engine strategy", "local seo florida", "b2b seo", "technical seo audit"]
  }
};

export const industryMetadata: Record<string, { title: string; description: string; keywords: string[] }> = {
  "healthcare": {
    title: "Healthcare AI Automation & Compliance",
    description: "HIPAA-compliant AI automation for Florida healthcare providers. Automate patient intake, EHR integrations, and clinical documentation.",
    keywords: ["healthcare ai", "hipaa compliant ai", "clinical documentation ai", "ehr integration", "florida healthcare tech"]
  },
  "real-estate": {
    title: "Real Estate Brokerage AI Solutions",
    description: "AI workflows for real estate brokerages. Automate lead capture, property summaries, and CRM sync to close deals faster.",
    keywords: ["real estate ai", "brokerage automation", "property summary ai", "real estate crm tech", "florida real estate tech"]
  },
  "enterprise": {
    title: "Enterprise AI Infrastructure & Open Source",
    description: "Secure, local, and powerful AI infrastructure for large enterprises. No data leaves your network with our Open-Source AI setup.",
    keywords: ["enterprise ai", "local ai infrastructure", "open source ai setup", "secure corporate ai", "offline ai models"]
  }
};

export function getServiceMeta(slug: string) {
  return serviceMetadata[slug] || null;
}

export function getIndustryMeta(slug: string) {
  return industryMetadata[slug] || null;
}
