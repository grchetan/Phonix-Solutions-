// ============================================================
// PHONIX IT SOLUTIONS — OFFICIAL DATA & CONTENT CONFIGURATION
// "Building Solutions. Driving Growth."
// ============================================================

const siteConfig = {
  name: 'Phonix IT Solutions',
  shortName: 'Phonix',
  tagline: 'Building Solutions. Driving Growth.',
  domain: 'www.phonixitsolutions.com',
  website: 'https://www.phonixitsolutions.com/',
  phone: '+919876543210',
  phoneDisplay: '+91 98765 43210',
  whatsapp: '+919876543210',
  email: 'info@phonixitsolutions.com',
  address: 'Suite 400, Innovation Tower, Cyber City, Tech Hub, India',
  description:
    'Phonix IT Solutions delivers high-performance custom software, web applications, cloud infrastructure, AI automation, and mobile solutions for startups, SMEs, and modern enterprises.',
  googleSheetAppUrl:
    'https://script.google.com/macros/s/AKfycbwxUULnogr0ngby7FvtzXJl7uTrTFtQR1hfuHPkchDzNoDEulC53eSIfoMhWl0jz6E/exec',
  social: {
    linkedin: 'https://www.linkedin.com/company/phonixitsolutions/',
    instagram: 'https://www.instagram.com/phonixitsolutions/',
  },
};

// 6 Core Technology Services (Showcase Layout)
const services = [
  {
    number: '01',
    slug: 'web-development',
    title: 'Web Development',
    eyebrow: '01 / WEB DEVELOPMENT',
    category: 'High-Performance Web',
    tag: 'Web Platforms',
    shortDesc: 'Sub-second web applications, SaaS frontends, and scalable enterprise portals built on Next.js & React.',
    description:
      'We engineer ultra-fast, responsive web platforms built with modern React, Next.js, and TypeScript architectures. Our websites and enterprise portals achieve near-instantaneous load times, top Core Web Vitals, and superior user conversion rates.',
    benefits: [
      'Sub-second page speeds & top Core Web Vitals',
      'Server-side rendering (SSR) & static edge generation',
      'API-first modular architectures with clean state management',
      'Engineered for maximum search engine indexability and ROI',
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'GraphQL', 'REST APIs'],
    icon: 'globe',
    image: 'assets/service-web-development.jpg',
    layout: 'image-right',
    metric: '< 0.8s Edge LCP',
  },
  {
    number: '02',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    eyebrow: '02 / MOBILE APP DEVELOPMENT',
    category: 'iOS & Android Engineering',
    tag: 'Cross-Platform',
    shortDesc: 'Native-feel iOS and Android applications with 60fps gesture fluidness and seamless offline sync.',
    description:
      'From customer apps to enterprise mobile workforce tools, we craft fluid mobile experiences using Flutter and React Native. Enjoy single-codebase efficiency with zero compromises on native platform performance, security, and hardware sensor access.',
    benefits: [
      'Single codebase for both Apple iOS and Google Android',
      'Smooth 60fps micro-animations and intuitive gestures',
      'Offline-first SQLite caching and real-time cloud synchronization',
      'Instant push notifications and biometric authentication',
    ],
    tech: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'App Store / Play Store'],
    icon: 'smartphone',
    image: 'assets/service-mobile-app.jpg',
    layout: 'image-left',
    metric: '60fps Native Fluidity',
  },
  {
    number: '03',
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    eyebrow: '03 / CLOUD & DEVOPS',
    category: 'Infrastructure & SRE',
    tag: 'Cloud Architecture',
    shortDesc: 'Resilient multi-cloud architectures, Kubernetes orchestration, and automated zero-downtime CI/CD pipelines.',
    description:
      'We architect, deploy, and monitor scalable cloud infrastructure across AWS, Google Cloud, and Azure. With Docker containerization, Terraform Infrastructure-as-Code, and automated CI/CD pipelines, your platform easily handles massive traffic spikes.',
    benefits: [
      'Automated auto-scaling from zero to millions of requests',
      'Multi-region failover and 99.98% high-availability SLA',
      'Infrastructure as Code (Terraform) for reproducible environments',
      'Automated vulnerability scanning and compliance guardrails',
    ],
    tech: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Prometheus'],
    icon: 'cloud',
    image: 'assets/service-cloud-devops.jpg',
    layout: 'image-right',
    metric: '99.98% System Uptime',
  },
  {
    number: '04',
    slug: 'ai-automation',
    title: 'AI & Automation',
    eyebrow: '04 / AI & AUTOMATION',
    category: 'Intelligent Systems',
    tag: 'Intelligent Workflows',
    shortDesc: 'Custom LLM integrations, predictive data pipelines, and workflow automation that eliminates operational friction.',
    description:
      'Harness artificial intelligence to automate repetitive operational bottlenecks, extract deep actionable insights, and empower your customers with intelligent conversational agents. We build secure, private AI pipelines tailored to your enterprise data.',
    benefits: [
      'Intelligent process automation that reduces human error by 95%',
      'Custom LLM agent fine-tuning and retrieval-augmented generation (RAG)',
      'Automated data extraction and real-time anomaly detection',
      'Strict enterprise data privacy with zero third-party training leakage',
    ],
    tech: ['Python', 'FastAPI', 'PyTorch', 'LangChain', 'OpenAI API', 'Vector DBs'],
    icon: 'sparkles',
    image: 'assets/service-ai-automation.jpg',
    layout: 'image-left',
    metric: '95% Bottleneck Reduction',
  },
  {
    number: '05',
    slug: 'ui-ux-engineering',
    title: 'UI/UX Engineering',
    eyebrow: '05 / UI/UX ENGINEERING',
    category: 'Design Systems & UX',
    tag: 'Design Systems',
    shortDesc: 'High-fidelity design systems, interaction architectures, and conversion-focused digital interfaces.',
    description:
      'We bridge the gap between aesthetic design and engineering rigor. Our UI/UX engineers develop production-ready component libraries, interactive prototypes, and design tokens that accelerate feature development while delighting your users.',
    benefits: [
      'Accessible, WCAG 2.1 AA compliant design components',
      'Design tokens synced directly from Figma to code',
      'Data-driven user journeys optimized for conversions',
      'Interactive micro-interactions that elevate brand trust',
    ],
    tech: ['Figma', 'Storybook', 'TailwindCSS', 'Framer Motion', 'Radix UI', 'CSS Modules'],
    icon: 'layout',
    image: 'assets/service-ui-ux.jpg',
    layout: 'image-right',
    metric: '100% WCAG 2.1 AA',
  },
  {
    number: '06',
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    eyebrow: '06 / CUSTOM SOFTWARE DEVELOPMENT',
    category: 'Enterprise Engineering',
    tag: 'Bespoke Software',
    shortDesc: 'Proprietary enterprise software architectures built from scratch to solve your unique operational bottlenecks.',
    description:
      'When off-the-shelf software falls short, we build custom enterprise platforms tailored precisely to your company’s proprietary workflows. Scalable microservices, robust API gateways, and complete intellectual property ownership from day one.',
    benefits: [
      '100% proprietary code ownership with zero vendor lock-in',
      'Stateless microservices architecture built for heavy concurrency',
      'Role-based access controls (RBAC) and audit-trail logging',
      'Dedicated SLA maintenance and proactive architecture evolution',
    ],
    tech: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis', 'Docker'],
    icon: 'code',
    image: 'assets/service-custom-software.jpg',
    layout: 'image-left',
    metric: 'Zero Vendor Lock-In',
  },
];

// Horizontal Tech Ecosystem (11 Technologies requested)
const techEcosystem = [
  { name: 'React', category: 'Frontend', icon: 'react' },
  { name: 'Next.js', category: 'Framework', icon: 'nextjs' },
  { name: 'Node.js', category: 'Backend', icon: 'nodejs' },
  { name: 'TypeScript', category: 'Language', icon: 'typescript' },
  { name: 'Python', category: 'Backend & AI', icon: 'python' },
  { name: 'FastAPI', category: 'API Engine', icon: 'fastapi' },
  { name: 'Flutter', category: 'Mobile UI', icon: 'flutter' },
  { name: 'React Native', category: 'Cross-Platform', icon: 'reactnative' },
  { name: 'AWS Cloud', category: 'Infrastructure', icon: 'aws' },
  { name: 'Docker', category: 'Containers', icon: 'docker' },
  { name: 'Kubernetes', category: 'Orchestration', icon: 'kubernetes' },
];

// Why Us Core Metrics
const whyUsMetrics = [
  {
    value: '99.9%',
    label: 'System Uptime',
    desc: 'Fault-tolerant multi-zone cloud architecture with zero single points of failure.',
  },
  {
    value: '50+',
    label: 'Projects Delivered',
    desc: 'Successfully deployed enterprise software and digital applications worldwide.',
  },
  {
    value: '24/7',
    label: 'Dedicated Support',
    desc: 'Proactive server health telemetry, rapid incident triage, and SLA guarantees.',
  },
  {
    value: 'Grade A+',
    label: 'Enterprise Security',
    desc: 'End-to-end data encryption at rest, secure JWT authentication, and zero-trust standards.',
  },
];

// 6 Foundational Engineering Pillars (Why Choose Us)
const whyChooseUsPillars = [
  {
    title: 'Reliable Solutions',
    desc: 'Fault-tolerant system design with automated failovers, automated database backups, and guaranteed 99.9% uptime SLAs.',
    icon: 'shieldCheck',
  },
  {
    title: 'Scalable Architecture',
    desc: 'Cloud-native microservices, containerized deployments, and modular codebases designed to handle traffic spikes effortlessly.',
    icon: 'cloud',
  },
  {
    title: 'Enterprise-Grade Security',
    desc: 'Zero-trust architecture, end-to-end data encryption at rest and in transit, strict RBAC, and standard mutual NDA protection.',
    icon: 'shieldCheck',
  },
  {
    title: 'Business-Focused Development',
    desc: 'Every technical sprint is aligned directly with measurable business metrics: higher conversion, operational efficiency, and ROI.',
    icon: 'layout',
  },
  {
    title: 'Transparent Communication',
    desc: 'Direct access to senior software architects, weekly sprint demos on live staging environments, and zero vendor lock-in.',
    icon: 'sparkles',
  },
  {
    title: 'Long-Term Partnership',
    desc: 'We operate as your dedicated engineering arm, providing ongoing SLA maintenance, telemetry monitoring, and feature iteration.',
    icon: 'code',
  },
];

// 6-Stage Process Timeline
const processTimeline = [
  {
    step: '01',
    title: 'Discover',
    desc: 'Deep discovery sessions to map business goals, technical constraints, user stories, and architecture requirements.',
  },
  {
    step: '02',
    title: 'Strategy',
    desc: 'We engineer system blueprints, technical specifications, database schemas, and milestone roadmaps.',
  },
  {
    step: '03',
    title: 'Design',
    desc: 'Interactive Figma wireframes, UI design systems, and user journey prototypes approved before development.',
  },
  {
    step: '04',
    title: 'Development',
    desc: 'Agile 2-week sprints with clean, tested code, weekly demos, and transparent staging environment access.',
  },
  {
    step: '05',
    title: 'Launch',
    desc: 'Automated CI/CD deployment to secure cloud servers, load testing, DNS verification, and zero-downtime go-live.',
  },
  {
    step: '06',
    title: 'Scale',
    desc: 'Continuous telemetry monitoring, performance tuning, security patching, and ongoing feature evolution.',
  },
];

const processSteps = processTimeline;

// FAQ Data
const faqs = [
  {
    q: 'What types of software services does Phonix IT Solutions specialize in?',
    a: 'Phonix IT Solutions specializes in Web Development, Mobile App Development (iOS & Android), Cloud Infrastructure & DevOps, AI & Workflow Automation, UI/UX Engineering, and Bespoke Custom Software Development for startups, SMEs, and enterprises.',
  },
  {
    q: 'Who owns the intellectual property and source code of the project?',
    a: 'You retain 100% proprietary ownership of all source code, architectural documentation, database schemas, and design assets from day one. We enforce a strict zero vendor lock-in guarantee.',
  },
  {
    q: 'Do you sign Non-Disclosure Agreements (NDAs)?',
    a: 'Yes, absolutely. We treat client confidentiality with the highest priority and routinely execute mutual NDAs before reviewing proprietary specifications or holding initial discovery sessions.',
  },
  {
    q: 'What is your typical project timeline and delivery structure?',
    a: 'Delivery timelines depend on scope. Focused MVPs and custom web applications typically range from 4 to 8 weeks, while full enterprise SaaS platforms or complex microservice systems require 2 to 4 months. We provide granular sprint milestones with live staging demos throughout.',
  },
  {
    q: 'How do you ensure architecture reliability and scalability?',
    a: 'Every solution is architected using cloud-native microservices, containerization (Docker/Kubernetes), stateless APIs, Redis caching layers, and database query optimization to easily support 10x to 100x user spikes without latency degradation.',
  },
  {
    q: 'Do you provide continuous maintenance and SLA support post-launch?',
    a: 'Yes. We offer continuous DevOps, security patching, 24/7 uptime monitoring, database maintenance, and agile sprint capacity for iterative feature rollouts as your business expands.',
  },
];
