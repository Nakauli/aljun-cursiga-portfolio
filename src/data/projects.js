export const projectFilters = ["All", "Web", "System", "Design", "Full Stack"];

export const projects = [
  {
    title: "Database Monster Cert Prep",
    type: "Database Certification Training System",
    description:
      "An original study platform combining a public Next.js exam simulator with local Python tools, SQL labs, a Flask dashboard, and a 360-question practice bank.",
    tech: ["TypeScript", "Next.js", "Python", "Supabase", "PostgreSQL"],
    filters: ["Web", "System", "Full Stack"],
    status: "Active",
    image: "/project-placeholders/database-monster.png",
    goal: "Give classmates a secure, measurable way to prepare for database certification topics without using exam dumps.",
    highlights: [
      "Built individual progress dashboards with Supabase Auth",
      "Protected learner data with Row Level Security policies",
      "Added automated TypeScript and Python test coverage",
    ],
    sourceUrl: "https://github.com/Nakauli/database-monster-cert-prep",
  },
  {
    title: "UM HealthLink",
    type: "Health Service Application Proposal",
    description:
      "A proposed health service application for University of Mindanao - Tagum College clinic services, covering clinic workflows, medicine dispensing, student health records, referrals, and appointments.",
    tech: ["Database Design", "ERD", "SQL", "System Analysis"],
    filters: ["System", "Design"],
    status: "Concept",
    image: "/project-placeholders/um-healthlink.png",
    goal: "Design a clear digital workflow for campus clinic services and student health records.",
    highlights: ["Mapped clinic service workflows", "Designed a normalized health records database", "Planned referrals and appointment management"],
  },
  {
    title: "SpamGuard",
    type: "SMS and Forum Spam Filter",
    description:
      "A Python Flask spam detection system that classifies messages as spam or not spam using machine learning concepts.",
    tech: ["Python", "Flask", "Scikit-learn", "HTML", "CSS"],
    filters: ["System", "Full Stack"],
    status: "Prototype",
    image: "/project-placeholders/spamguard.png",
    goal: "Explore machine learning classification through an approachable Flask web interface.",
    highlights: ["Built a message classification workflow", "Connected a Python model to Flask", "Designed separate SMS and forum filtering experiences"],
  },
  {
    title: "Local Printing Press Website",
    type: "Business Website",
    description:
      "A business website concept for a local printing press in Sto. Tomas, designed to showcase services, products, contact details, and brand identity.",
    tech: ["HTML", "CSS", "JavaScript"],
    filters: ["Web", "Design"],
    status: "Concept",
    image: "/project-placeholders/printing-press.png",
    goal: "Give a local printing business a clear, professional way to present its services online.",
    highlights: ["Organized services for fast scanning", "Created a visual identity-led layout", "Designed responsive contact and inquiry paths"],
  },
  {
    title: "Church Website",
    type: "Organization Website",
    description:
      "A modern church organization website with sections for introduction, ministries, media, announcements, and community updates.",
    tech: ["HTML", "CSS", "JavaScript"],
    filters: ["Web"],
    status: "Concept",
    image: "/project-placeholders/church-website.png",
    goal: "Create a welcoming digital home for ministries, announcements, and community media.",
    highlights: ["Structured ministry information", "Prioritized announcements and media", "Built an accessible responsive layout"],
  },
  {
    title: "Cops International Police Website",
    type: "Informational Website",
    description:
      "A blue-themed informational website concept for an international police-related organization or public information platform.",
    tech: ["HTML", "CSS", "JavaScript"],
    filters: ["Web", "Design"],
    status: "Concept",
    image: "/project-placeholders/cops-international.png",
    goal: "Develop a confident informational concept for an international police-related platform.",
    highlights: ["Established a trustworthy visual direction", "Organized public information sections", "Created a responsive blue-themed interface"],
  },
  {
    title: "Portfolio Website",
    type: "Personal Brand Website",
    description:
      "A creative, responsive portfolio website showcasing my skills, tools, projects, services, and developer identity.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    filters: ["Web", "Full Stack", "Design"],
    status: "Live",
    image: "/project-placeholders/portfolio.png",
    goal: "Present my developer and layout-design experience through a memorable, fast portfolio.",
    highlights: ["Built reusable React sections", "Added responsive themes and motion", "Deployed a production build on Vercel"],
    liveUrl: "https://aljun-cursiga-portfolio.vercel.app",
    sourceUrl: "https://github.com/Nakauli/aljun-cursiga-portfolio",
  },
];
