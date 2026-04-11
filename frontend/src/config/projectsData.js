export const projectsDetailData = {
  orbit: {
    i18nKey: 'projects.modal.orbit',
    architecture: [
      { layer: 'Frontend', detail: 'React + Material UI (custom theme)' },
      { layer: 'Animations', detail: 'Framer Motion' },
      { layer: 'Hosting', detail: 'AWS S3 + CloudFront' },
      { layer: 'Backend (Contact Form)', detail: 'AWS Lambda (Python)' },
      { layer: 'API Layer', detail: 'AWS API Gateway' },
      { layer: 'Email Service', detail: 'Zoho Mail integration' },
      { layer: 'Infrastructure as Code', detail: 'Terraform' },
      { layer: 'Version Control', detail: 'GitHub' },
    ],
    tech: ['React', 'Material UI', 'Framer Motion', 'AWS Lambda (Python)', 'API Gateway', 'S3', 'CloudFront', 'Zoho Mail', 'Terraform', 'GitHub'],
    screenshots: [
      '/screenshots/orbit/1.webp',
      '/screenshots/orbit/2.webp',
      '/screenshots/orbit/3.webp',
      '/screenshots/orbit/4.webp',
      '/screenshots/orbit/5.webp',
    ],
  },

  greenpaw: {
    i18nKey: 'projects.modal.greenpaw',
    architecture: [
      { layer: 'Frontend', detail: 'React + Material UI' },
      { layer: 'E-commerce Engine', detail: 'Shopify Headless (Storefront API)' },
      { layer: 'Data Layer', detail: 'GraphQL via Shopify Storefront API' },
      { layer: 'CMS / Admin', detail: 'Shopify Admin' },
      { layer: 'Hosting', detail: 'AWS S3 + CloudFront' },
      { layer: 'DNS', detail: 'AWS Route 53' },
      { layer: 'Infrastructure as Code', detail: 'Terraform' },
    ],
    tech: ['React', 'Material UI', 'Shopify Storefront API', 'GraphQL', 'S3', 'CloudFront', 'Route 53', 'Terraform'],
    screenshots: [
      '/screenshots/greenpaw/1.webp',
      '/screenshots/greenpaw/2.webp',
      '/screenshots/greenpaw/3.webp',
      '/screenshots/greenpaw/4.webp',
      '/screenshots/greenpaw/5.webp',
    ],
  },

  flixy: {
    i18nKey: 'projects.modal.flixy',
    architecture: [
      { layer: 'Frontend', detail: 'HTML + CSS + JavaScript' },
      { layer: 'Backend', detail: 'Django' },
      { layer: 'Application Server', detail: 'Gunicorn' },
      { layer: 'Queue System', detail: 'Redis' },
      { layer: 'Video Processing', detail: 'HLS generation' },
      { layer: 'Database', detail: 'Relational DB (users, videos, moderation)' },
      { layer: 'Storage', detail: 'AWS S3' },
      { layer: 'CDN', detail: 'AWS CloudFront' },
      { layer: 'Infrastructure', detail: 'Raspberry Pi + Linux' },
      { layer: 'Networking / Security', detail: 'DDNS + SSL with Certbot' },
      { layer: 'Analytics', detail: 'Power BI dashboard' },
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Django', 'Gunicorn', 'Redis', 'HLS', 'S3', 'CloudFront', 'Linux', 'Raspberry Pi', 'Certbot', 'Power BI'],
    screenshots: [
      '/screenshots/flixy/1.webp',
      '/screenshots/flixy/2.webp',
      '/screenshots/flixy/3.webp',
      '/screenshots/flixy/4.webp',
      '/screenshots/flixy/5.webp',
    ],
  },
};
