export type Project = {
  id: string
  slug: string
  name: string
  field: 'backend' | 'frontend' | 'systems'
  tags: string[]
  desc: string
  overview: string
  highlights: string[]
  stack: string[]
  image: string
  imageAlt: string
  iconKeys: string[]
  year: string
  status: 'live' | 'wip' | 'archived'
  role: string
  metrics: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 'TRANSPORT_TRACKER',
    slug: 'transit-tracker',
    name: 'Real-Time Transit Tracker',
    field: 'backend',
    tags: ['Next.js 14', 'FastAPI', 'WebSocket', 'PostgreSQL', 'Azure Maps'],
    desc: 'Live GPS tracking platform streaming bus positions every 2 seconds with ETA APIs and route history.',
    overview: 'Production-grade transport monitoring system built for commuters and operators, pairing a realtime WebSocket stream with REST ETA queries and durable route history.',
    highlights: [
      'Realtime GPS ingest and broadcast every 2 seconds',
      'ETA and route history APIs on PostgreSQL',
      'Terraform-provisioned Azure App Service + DB from CI',
    ],
    stack: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'Azure Maps', 'Terraform', 'GitHub Actions'],
    image: '/works/transit-tracker.svg',
    imageAlt: 'Real-Time Transit Tracker — live GPS dashboard showing bus positions on a city map',
    iconKeys: ['typescript', 'fastapi', 'docker'],
    year: '2025',
    status: 'live',
    role: 'Lead Developer',
    metrics: ['2s GPS refresh', '99.9% uptime', '50+ routes tracked'],
  },
  {
    id: 'EVENTLY',
    slug: 'evently',
    name: 'Evently Media Vault',
    field: 'frontend',
    tags: ['Next.js', 'Express', 'Azure', 'Redis', 'CI/CD'],
    desc: 'Event sharing platform where organizers issue QR access so attendees can upload photos and videos.',
    overview: 'A production-ready event media platform. Organizers sell access packages and issue QR codes so verified attendees can upload event photos and videos in one place.',
    highlights: [
      'QR-based attendee access flow for event participation',
      'Media upload and gallery organized per event',
      'Azure + CI/CD pipeline for repeatable deployments',
    ],
    stack: ['Next.js', 'Express', 'Azure', 'Redis', 'GitHub Actions', 'Terraform'],
    image: '/works/evently.svg',
    imageAlt: 'Evently Media Vault — event gallery with QR code access and media upload interface',
    iconKeys: ['react', 'typescript', 'redis'],
    year: '2024',
    status: 'live',
    role: 'Full-Stack Developer',
    metrics: ['500+ events', '10K+ photos stored', 'QR < 1s scan'],
  },
  {
    id: 'NETRECON',
    slug: 'netrecon',
    name: 'NetRecon Security Suite',
    field: 'systems',
    tags: ['Python', 'Bash', 'Nmap', 'Wireshark', 'OWASP'],
    desc: 'Automated recon and penetration workflow that produces structured reports per target.',
    overview: 'Modular recon pipeline chaining discovery, fingerprinting, and OWASP surface checks into one reproducible workflow with JSON outputs.',
    highlights: [
      'Automated scanning, DNS enumeration, and WHOIS intel',
      'OWASP Top 10 checks integrated into the pipeline',
      'Passive Wireshark capture for network correlation',
    ],
    stack: ['Python', 'Bash', 'Nmap', 'Wireshark', 'OWASP'],
    image: '/works/netrecon.svg',
    imageAlt: 'NetRecon Security Suite — terminal-based reconnaissance dashboard with network scan results',
    iconKeys: ['python', 'security', 'linux'],
    year: '2024',
    status: 'live',
    role: 'Security Engineer',
    metrics: ['100+ targets scanned', 'OWASP 10/10 coverage', '< 5min per scan'],
  },
  {
    id: 'AZURE_IAC',
    slug: 'azure-iac',
    name: 'Azure IaC Automation',
    field: 'systems',
    tags: ['Terraform', 'Azure', 'GitHub Actions', 'IaC'],
    desc: 'Reusable Terraform modules that spin up full Azure environments in minutes.',
    overview: 'Infrastructure-as-code pipeline that provisions VNets, NSGs, App Services, and PostgreSQL with PR plan and main-branch apply.',
    highlights: [
      'End-to-end Azure environment in under 10 minutes',
      'PR plan and main-branch apply in GitHub Actions',
      'Reusable Terraform modules for consistent stacks',
    ],
    stack: ['Terraform', 'Azure', 'GitHub Actions', 'Docker', 'Linux'],
    image: '/works/azure-iac.svg',
    imageAlt: 'Azure IaC Automation — infrastructure diagram showing VNet, NSG, and App Service topology',
    iconKeys: ['linux', 'docker', 'typescript'],
    year: '2024',
    status: 'live',
    role: 'DevOps Engineer',
    metrics: ['< 10min provision', '100% IaC coverage', '0 manual config'],
  },
  {
    id: 'PC_REPAIR',
    slug: 'repairops',
    name: 'RepairOps Management',
    field: 'backend',
    tags: ['Django', 'React', 'TypeScript', 'PostgreSQL'],
    desc: 'LAN-deployed repair workshop system for jobs, inventory, and technician roles.',
    overview: 'Full-stack repair shop platform with job tickets, parts inventory, and role-based dashboards for technicians and managers.',
    highlights: [
      'Job ticketing + inventory tracking workflow',
      'Role-based access control with live status boards',
      'Django REST backend with React frontend',
    ],
    stack: ['Django', 'React', 'TypeScript', 'PostgreSQL'],
    image: '/works/repairops.svg',
    imageAlt: 'RepairOps Management — job ticket dashboard with technician assignments and inventory tracking',
    iconKeys: ['python', 'react', 'typescript'],
    year: '2023',
    status: 'live',
    role: 'Full-Stack Developer',
    metrics: ['200+ jobs/month', '3 inventory locations', '5 technician roles'],
  },
  {
    id: 'MEDIA_COMPRESSION',
    slug: 'media-compression',
    name: 'Media Compression API',
    field: 'backend',
    tags: ['TypeScript', 'FFmpeg', 'Queue', 'API'],
    desc: 'High-throughput media compression pipeline for video, image, and audio workloads.',
    overview: 'Batch media compression service designed for heavy workloads, using a queue-based pipeline to process assets reliably.',
    highlights: [
      'Queue-based batch processing for large uploads',
      'FFmpeg-powered transformations and presets',
      'Designed for cloud deployment and scaling',
    ],
    stack: ['TypeScript', 'FFmpeg', 'Docker', 'REST API'],
    image: '/works/media-compression.svg',
    imageAlt: 'Media Compression API — queue dashboard showing video, image, and audio processing pipeline',
    iconKeys: ['typescript', 'fastapi', 'docker'],
    year: '2024',
    status: 'wip',
    role: 'Backend Engineer',
    metrics: ['10x throughput', '4K video support', '< 30s per asset'],
  },
]
