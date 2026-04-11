export const projectsDetailData = {
  orbit: {
    problem:
      'Orbit needed a modern, high-conversion landing page that could communicate its SaaS value proposition clearly to potential customers, while also handling contact form submissions without the cost and maintenance of a traditional backend server.',
    solution:
      'Built a fully serverless React SPA with a custom Material UI design system, dark-themed animations via Framer Motion, and an AWS-powered contact form — eliminating backend infrastructure entirely while keeping the experience production-ready.',
    architecture: [
      { layer: 'Frontend', detail: 'React + Material UI v5 (custom theme)' },
      { layer: 'Animations', detail: 'Framer Motion' },
      { layer: 'Contact Form', detail: 'AWS API Gateway + Lambda (Node.js)' },
      { layer: 'Hosting', detail: 'Vercel (CI/CD from GitHub)' },
      { layer: 'Design System', detail: 'MUI custom palette, typography, components' },
    ],
    decisions: [
      'Chose serverless (AWS Lambda + API Gateway) for the contact form to avoid managing a Node/Express server — reducing costs to near-zero and scaling automatically.',
      'Used Material UI custom theming instead of Tailwind for tighter component-level control and consistency across the design system.',
      'Implemented Framer Motion scroll-reveal animations to increase engagement and convey a polished, SaaS-grade product feel.',
    ],
    challenges: [
      'Configuring CORS correctly between API Gateway and the React frontend in production.',
      'Keeping bundle size small while using MUI, Framer Motion, and i18n together.',
      'Building a fully responsive design that maintains visual quality from mobile to 4K.',
    ],
    results: [
      'Live production platform at orbit.com.mx serving real users.',
      'Serverless backend with zero maintenance and sub-100ms response times.',
      'Bilingual (EN/ES) with react-i18next, reaching wider audience.',
    ],
    tech: ['React', 'Material UI', 'AWS Lambda', 'API Gateway', 'Framer Motion', 'Vercel', 'i18next'],
    screenshots: [],
  },

  greenpaw: {
    problem:
      'A pet product brand needed a custom e-commerce storefront that reflected their unique branding — standard Shopify themes were too rigid and generic to convey the brand identity they wanted.',
    solution:
      'Built a headless Shopify storefront using React and the Shopify Storefront API, giving full design freedom while keeping the client in control of products, inventory, and orders through the familiar Shopify Admin.',
    architecture: [
      { layer: 'Frontend', detail: 'React (custom storefront)' },
      { layer: 'E-commerce Engine', detail: 'Shopify Headless (Storefront API)' },
      { layer: 'Data Layer', detail: 'GraphQL queries via Shopify API' },
      { layer: 'CMS / Admin', detail: 'Shopify Admin (client-managed)' },
      { layer: 'Hosting', detail: 'Vercel' },
    ],
    decisions: [
      'Headless Shopify over a custom theme to retain the full Shopify Admin for the client while enabling 100% custom frontend code.',
      'GraphQL Storefront API for cart, product listing, and checkout — avoiding REST limitations and enabling precise data fetching.',
      'Designed UX flows specifically for pet owners: quick browsing, clear product details, and frictionless checkout.',
    ],
    challenges: [
      'Managing cart state across pages without a backend session — solved with React Context + localStorage.',
      'Handling Shopify checkout redirect securely while maintaining brand consistency.',
      'Optimizing product image loading for mobile performance.',
    ],
    results: [
      'Live e-commerce store at greenpaw.mx serving real customers.',
      'Client manages all products/inventory independently via Shopify Admin.',
      'Fully branded storefront — no Shopify theme limitations.',
    ],
    tech: ['React', 'Shopify Storefront API', 'GraphQL', 'Vercel', 'CSS Modules', 'Context API'],
    screenshots: [],
  },

  flixy: {
    problem:
      'Needed a self-hosted video streaming platform for personal use with a Netflix-inspired UI — without paying for cloud hosting or a streaming CDN service.',
    solution:
      'Built a React frontend with a Python backend, deployed entirely on a Raspberry Pi at home with Linux, using DDNS for public access and HLS for browser-compatible video streaming.',
    architecture: [
      { layer: 'Frontend', detail: 'React (custom Netflix-style UI)' },
      { layer: 'Backend', detail: 'Python (Flask API)' },
      { layer: 'Streaming Protocol', detail: 'HLS (HTTP Live Streaming)' },
      { layer: 'Infrastructure', detail: 'Raspberry Pi 4 + Linux (Ubuntu Server)' },
      { layer: 'Networking', detail: 'DDNS (Dynamic DNS) for public IP routing' },
    ],
    decisions: [
      'Self-hosted on Raspberry Pi to eliminate all hosting costs — demonstrating real DevOps skills: Linux sysadmin, networking, and deployment pipelines.',
      'DDNS to handle the dynamic residential IP, making the service publicly accessible without a static IP contract.',
      'HLS protocol for video streaming since it works natively in modern browsers without plugins.',
    ],
    challenges: [
      'Configuring port forwarding and firewall rules on the home router for secure public access.',
      'Transcoding videos to HLS-compatible format with limited Raspberry Pi CPU resources.',
      'Building a smooth, responsive UI that feels premium despite running on low-cost hardware.',
    ],
    results: [
      'Fully functional streaming platform running live at flixy.ddns.net.',
      'Demonstrated end-to-end ownership: UI, API, Linux server, networking — all from scratch.',
      'Real-world infrastructure experience: Linux, systemd services, DDNS, HLS.',
    ],
    tech: ['React', 'Python', 'Flask', 'HLS', 'Linux', 'Raspberry Pi', 'DDNS', 'Ubuntu Server'],
    screenshots: [],
  },
};
