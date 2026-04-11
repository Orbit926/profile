export const projectsDetailData = {
  "orbit": {
      "problem": "Orbit needed a modern landing page that could clearly communicate its value proposition and handle contact form submissions without relying on a traditional backend server.",
      "solution": "Built a React-based landing page with a custom Material UI design system and Framer Motion animations, using a serverless contact form powered by AWS and automated email handling through Zoho.",
      "architecture": [
        { "layer": "Frontend", "detail": "React + Material UI (custom theme)" },
        { "layer": "Animations", "detail": "Framer Motion" },
        { "layer": "Hosting", "detail": "AWS S3 + CloudFront" },
        { "layer": "Backend (Contact Form)", "detail": "AWS Lambda (Python)" },
        { "layer": "API Layer", "detail": "AWS API Gateway" },
        { "layer": "Email Service", "detail": "Zoho Mail integration" },
        { "layer": "Infrastructure as Code", "detail": "Terraform" },
        { "layer": "Version Control", "detail": "GitHub" }
      ],
      "decisions": [
        "Chose a serverless architecture with AWS Lambda and API Gateway for the contact form to avoid maintaining a dedicated backend server and reduce infrastructure costs.",
        "Used AWS S3 and CloudFront for hosting to provide scalable delivery and efficient static content distribution.",
        "Integrated Zoho Mail for automated email delivery after AWS SES production access was not available.",
        "Used Terraform to provision and manage cloud infrastructure in a repeatable way."
      ],
      "challenges": [
        "Integrating Zoho Mail for automated emails after AWS SES production access was not granted due to domain/account reputation constraints.",
        "Configuring API Gateway and Lambda to correctly process and validate contact form requests.",
        "Ensuring proper CORS configuration between the frontend and API Gateway in production."
      ],
      "results": [
        "Live production platform at orbit.com.mx.",
        "Serverless backend with minimal infrastructure maintenance.",
        "Reliable contact form with automated email notifications.",
        "Bilingual experience with English and Spanish support."
      ],
      "tech": [
        "React",
        "Material UI",
        "Framer Motion",
        "AWS Lambda (Python)",
        "API Gateway",
        "S3",
        "CloudFront",
        "Zoho Mail",
        "Terraform",
        "GitHub"
      ],
      "screenshots": [
        "/screenshots/orbit/1.webp",
        "/screenshots/orbit/2.webp",
        "/screenshots/orbit/3.webp",
        "/screenshots/orbit/4.webp",
        "/screenshots/orbit/5.webp"
      ]
    },
    "greenpaw": {
      "problem": "Greenpaw needed a custom e-commerce storefront that reflected its brand identity more effectively than a standard Shopify theme.",
      "solution": "Built a headless Shopify storefront with React and Material UI, keeping Shopify as the commerce engine while enabling a fully customized frontend experience.",
      "architecture": [
        { "layer": "Frontend", "detail": "React + Material UI" },
        { "layer": "E-commerce Engine", "detail": "Shopify Headless (Storefront API)" },
        { "layer": "Data Layer", "detail": "GraphQL via Shopify Storefront API" },
        { "layer": "CMS / Admin", "detail": "Shopify Admin" },
        { "layer": "Hosting", "detail": "AWS S3 + CloudFront" },
        { "layer": "DNS", "detail": "AWS Route 53" },
        { "layer": "Infrastructure as Code", "detail": "Terraform" }
      ],
      "decisions": [
        "Chose Shopify headless instead of a standard theme to keep Shopify Admin while allowing a fully customized frontend.",
        "Used GraphQL through the Shopify Storefront API for flexible product, cart, and checkout data fetching.",
        "Hosted the storefront on AWS S3 and CloudFront for scalable static delivery.",
        "Used Terraform to provision and manage cloud resources consistently."
      ],
      "challenges": [
        "Managing cart state across the storefront without a traditional custom backend session.",
        "Handling the Shopify checkout redirect while preserving a consistent user experience.",
        "Transferring the domain from Shopify and configuring it in AWS Route 53 with the correct DNS setup."
      ],
      "results": [
        "Live e-commerce storefront at greenpaw.mx.",
        "Custom branded shopping experience beyond the limitations of a standard Shopify theme.",
        "Client-friendly commerce management through Shopify Admin.",
        "Cloud-based hosting and infrastructure managed on AWS."
      ],
      "tech": [
        "React",
        "Material UI",
        "Shopify Storefront API",
        "GraphQL",
        "S3",
        "CloudFront",
        "Route 53",
        "Terraform"
      ],
      "screenshots": [
        "screenshots/greenpaw/1.webp",
        "screenshots/greenpaw/2.webp",
        "screenshots/greenpaw/3.webp",
        "screenshots/greenpaw/4.webp",
        "screenshots/greenpaw/5.webp"
      ]
    },
    "flixy": {
      "problem": "Needed to build a complete video platform capable of handling uploads, streaming, moderation, and analytics while operating under limited hardware constraints.",
      "solution": "Built a YouTube-style video platform with a frontend in HTML, CSS, and JavaScript, a Django backend, Redis-based upload queues, HLS video processing, cloud storage and delivery through AWS, and administrative tools for moderation and analytics.",
      "architecture": [
        { "layer": "Frontend", "detail": "HTML + CSS + JavaScript" },
        { "layer": "Backend", "detail": "Django" },
        { "layer": "Application Server", "detail": "Gunicorn" },
        { "layer": "Queue System", "detail": "Redis" },
        { "layer": "Video Processing", "detail": "HLS generation" },
        { "layer": "Database", "detail": "Relational database for users, videos, interactions, and moderation data" },
        { "layer": "Storage", "detail": "AWS S3" },
        { "layer": "CDN", "detail": "AWS CloudFront" },
        { "layer": "Infrastructure", "detail": "Raspberry Pi + Linux" },
        { "layer": "Networking / Security", "detail": "DDNS + SSL with Certbot" },
        { "layer": "Analytics", "detail": "Power BI dashboard" }
      ],
      "decisions": [
        "Used Django to support a more complete backend with authentication, moderation flows, and database-driven features.",
        "Implemented Redis queues to control video upload concurrency and avoid overloading the Raspberry Pi during HLS processing.",
        "Limited the backend to handle only two uploads at a time to protect system stability under heavy processing workloads.",
        "Returned video parts and presigned S3 URLs to the frontend so clients could upload directly to S3, reducing backend load and improving user experience.",
        "Used CloudFront in front of S3 to improve video delivery performance and optimize costs."
      ],
      "challenges": [
        "Processing HLS video uploads on limited Raspberry Pi hardware without crashing the system.",
        "Designing a queue-based upload workflow with Redis to safely manage concurrent upload requests.",
        "Implementing direct-to-S3 uploads with presigned URLs while maintaining a smooth client experience.",
        "Configuring SSL with Certbot and exposing the platform securely through a home-hosted environment."
      ],
      "results": [
        "Built a full video platform with streaming, moderation, and analytics capabilities.",
        "Included a moderation panel where admins can approve or reject videos, moderate comments, and ban users.",
        "Implemented user-facing features such as channel subscriptions, likes/dislikes, and comment forums per video.",
        "Added a Power BI dashboard to visualize platform statistics and usage insights.",
        "Reduced backend stress through Redis queues and direct client uploads to S3."
      ],
      "tech": [
        "HTML",
        "CSS",
        "JavaScript",
        "Django",
        "Gunicorn",
        "Redis",
        "HLS",
        "S3",
        "CloudFront",
        "Linux",
        "Raspberry Pi",
        "Certbot",
        "Power BI"
      ],
      "screenshots": [
        "/screenshots/flixy/1.webp",
        "/screenshots/flixy/2.webp",
        "/screenshots/flixy/3.webp",
        "/screenshots/flixy/4.webp",
        "/screenshots/flixy/5.webp"
      ]
    }
}
