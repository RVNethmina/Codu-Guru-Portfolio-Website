/**
 * All site content lives here. Edit this file to update text, links,
 * milestones, documents and team details — no component changes needed.
 */

export const project = {
  id: "R26-SE-036",
  name: "Code Guru",
  title: "An Integrated Real-Time Learning Support Platform for Novice Java Programmers",
  institution: "Sri Lanka Institute of Information Technology",
  institutionShort: "SLIIT",
  faculty: "Faculty of Computing",
  department: "Department of Information Technology",
  location: "Malabe, Sri Lanka",
  module: "IT4010 Research Project — 2026",
  cluster: "Software Systems & Technologies (SST)",
  specialization: "Software Engineering",
  summary:
    "Code Guru keeps novice Java programmers inside their normal coding environment while surrounding them with pedagogically constrained help: scaffolded hints instead of fixes, micro-lessons built around their own mistakes, behaviour-aware pair programming and adaptive practice games.",
};

export const links = {
  webApp: "https://13-202-201-115.sslip.io/",
  extension: "https://marketplace.visualstudio.com/items?itemName=codeguru-sliit.code-coach-vscode",
  extensionId: "codeguru-sliit.code-coach-vscode",
  extensionName: "Code Guru: Code Coach",
  extensionVersion: "0.2.1",
  extensionReleases: "https://github.com/R26-SE-036/code-coach/releases",
  github: "https://github.com/R26-SE-036",
};

export const heroWords = ["hint.", "lesson.", "challenge.", "pair session."];

export const heroStats = [
  { value: 4, suffix: "", label: "Components" },
  { value: 15, suffix: "", label: "Error types" },
  { value: 3.9, suffix: "ms", label: "Median analysis", decimals: 1 },
  { value: 0.973, suffix: "+", label: "Test F1", decimals: 3 },
];

export const techStack = [
  { name: "VS Code API", note: "Editor integration", color: "#0ea5e9" },
  { name: "TypeScript", note: "Extension runtime", color: "#3b82f6" },
  { name: "FastAPI", note: "Python 3.12 services", color: "#10b981" },
  { name: "Tree-sitter", note: "Incremental parsing", color: "#f59e0b" },
  { name: "scikit-learn", note: "Calibrated gates", color: "#f97316" },
  { name: "XGBoost", note: "Collaboration states", color: "#ef4444" },
  { name: "Random Forest", note: "Struggle classifier", color: "#22c55e" },
  { name: "Neo4j", note: "Skill knowledge graph", color: "#14b8a6" },
  { name: "LangChain", note: "Graph RAG lessons", color: "#a78bfa" },
  { name: "Socket.IO", note: "Shared editor", color: "#e2e8f0" },
  { name: "PostgreSQL", note: "Session events", color: "#60a5fa" },
  { name: "Firestore", note: "Learner data", color: "#fbbf24" },
  { name: "Next.js", note: "Web portal", color: "#f8fafc" },
  { name: "Node.js", note: "Game engine API", color: "#4ade80" },
  { name: "Docker", note: "Containerised services", color: "#38bdf8" },
  { name: "Cloud Run", note: "Scale-to-zero hosting", color: "#818cf8" },
];

export type DomainTab = {
  id: string;
  label: string;
  title: string;
  lead: string;
  points: string[];
};

export const domainTabs: DomainTab[] = [
  {
    id: "literature",
    label: "Literature Survey",
    title: "Literature Survey",
    lead: "We surveyed automated support for novice programmers along three directions — error detection and repair, adaptive instruction, and collaborative learning — alongside AI assistants already inside the IDE.",
    points: [
      "Error repair and feedback: TRACER (Ahmed et al.), reference-based feedback (Singh et al.), novice static analysis (Blok & Fehnker)",
      "IDE assistants such as AIRA and CodeBlizz target developer productivity, not learning",
      "Adaptive instruction: intelligent tutoring, knowledge tracing and graph-grounded RAG",
      "Pair programming helps novices — but novice pairs drift into driver dominance and disengagement",
    ],
  },
  {
    id: "problem",
    label: "Research Problem",
    title: "Research Problem",
    lead: "Introductory programming courses report withdrawal and failure rates of 30–50%. First-year students — especially those entering IT from non-technical streams — fail on logic they cannot see and messages they cannot read.",
    points: [
      "Compilers and linters detect what is wrong but explain nothing",
      "AI assistants hand over the solution and remove the productive struggle novices need",
      "A slow run → fail → frustration loop with no guidance on what to do differently",
      "Two novices cannot recognise a stalled collaboration from inside it",
    ],
  },
  {
    id: "gap",
    label: "Research Gap",
    title: "Research Gap",
    lead: "The capabilities exist — but scattered across separate systems that were never designed to inform one another.",
    points: [
      "Static tools are fast but not context-aware, producing false positives",
      "Repair tools and AI assistants correct code instead of teaching",
      "Learning dashboards are passive — they monitor after the fact",
      "No system closes the loop across detection, remediation, collaboration and motivation inside the student's own editor",
    ],
  },
  {
    id: "objectives",
    label: "Research Objectives",
    title: "Research Objectives",
    lead: "Design, develop and evaluate one platform where four components observe the same learner from different angles and share what they see.",
    points: [
      "Code Coach — detect 15 beginner Java error types as you type, with three-level scaffolded hints",
      "Study Guider — turn repeated struggle into graph-RAG micro-lessons verified by a quiz",
      "PairPath — classify five collaboration states live and nudge pairs back into balance",
      "Gamification — adapt game type and difficulty from seven performance indicators",
    ],
  },
  {
    id: "methodology",
    label: "Methodology",
    title: "Methodology",
    lead: "Design Science Research with one rule throughout: measure before every design commitment.",
    points: [
      "Generation-verified synthetic data — every label is correct by construction",
      "A hand-written holdout tests whether synthetic-trained models transfer to human code",
      "Model selection by validation F1, then per-type calibrated thresholds",
      "Independently deployable services sharing one identity provider and a typed learning-event contract",
    ],
  },
  {
    id: "technologies",
    label: "Technologies",
    title: "Technologies",
    lead: "A hybrid architecture: a TypeScript VS Code extension in front of Python and Node.js microservices, each owning its own data store.",
    points: [
      "Editor: TypeScript, VS Code Extension API, CodeLens, diagnostics & webviews",
      "Analysis: FastAPI, Tree-sitter, scikit-learn logistic-regression gates",
      "Intelligence: Random Forest, XGBoost, LangChain Graph RAG, Neo4j",
      "Platform: Next.js portal, Socket.IO, PostgreSQL, Firestore, Docker, Cloud Run",
    ],
  },
];

export type Component = {
  id: string;
  name: string;
  tagline: string;
  owner: string;
  regNo: string;
  description: string;
  stats: { value: string; label: string }[];
  tech: string[];
  color: string;
};

export const components: Component[] = [
  {
    id: "code-coach",
    name: "Code Coach",
    tagline: "Real-time error detection",
    owner: "W. P. R. Nethmina",
    regNo: "IT22253958",
    description:
      "A VS Code extension backed by a FastAPI service. Each time the student pauses, the file is parsed with Tree-sitter, 15 beginner error types are checked, and every finding arrives with three hint levels — concept, guidance, targeted. Corrected code is never shown.",
    stats: [
      { value: "15", label: "error types" },
      { value: "3", label: "hint levels" },
      { value: "3.9 ms", label: "median latency" },
    ],
    tech: ["TypeScript", "FastAPI", "Tree-sitter", "scikit-learn"],
    color: "#8b5cf6",
  },
  {
    id: "study-guider",
    name: "Study Guider",
    tagline: "Adaptive remediation",
    owner: "H. A. S. I. Madurapperuma",
    regNo: "IT22230942",
    description:
      "Consumes Code Coach's learning events and classifies persistent struggle with a Random Forest. Three consecutive failures on one concept trigger a graph-RAG micro-lesson built around the student's own code, followed by a quiz that verifies understanding. Mastery lives in a Neo4j skill graph.",
    stats: [
      { value: "0.91", label: "macro-F1" },
      { value: "4.8/5", label: "grounding" },
      { value: "3", label: "strike trigger" },
    ],
    tech: ["FastAPI", "LangChain", "Neo4j", "React"],
    color: "#0ea5e9",
  },
  {
    id: "pairpath",
    name: "PairPath",
    tagline: "Behaviour-aware pair programming",
    owner: "M. N. H. Appuhami",
    regNo: "IT22140852",
    description:
      "Instruments a shared editor so every edit, run, discussion note and role switch becomes a behavioural event. A tuned XGBoost classifier assigns one of five collaboration states and a rule-governed layer nudges the pair — never supplying solutions.",
    stats: [
      { value: "0.879", label: "macro-F1" },
      { value: "5", label: "collab states" },
      { value: "1.45 ms", label: "per window" },
    ],
    tech: ["Socket.IO", "PostgreSQL", "XGBoost", "Python"],
    color: "#10b981",
  },
  {
    id: "gamification",
    name: "Adaptive Gamification",
    tagline: "Practice at the edge of ability",
    owner: "J. Aron Charles",
    regNo: "IT22203380",
    description:
      "Three game modules — Drag & Drop Code, Bug Hunt and Pair Challenge — adapt game type and difficulty from seven performance indicators through a transparent rule-based engine that educators can inspect and trust.",
    stats: [
      { value: "3", label: "game modules" },
      { value: "7", label: "indicators" },
      { value: "3", label: "adaptive decisions" },
    ],
    tech: ["Next.js", "Node.js", "Express", "MongoDB"],
    color: "#f59e0b",
  },
];

/* ---------- Metrics (all figures from the R26-SE-036 research paper) ---------- */

export const metrics = [
  { value: 15, decimals: 0, suffix: "", label: "Beginner Error Types", color: "#8b5cf6", icon: "bug" },
  { value: 0.973, decimals: 3, suffix: "+", label: "Code Coach Test F1", color: "#6366f1", icon: "target" },
  { value: 1, decimals: 3, suffix: "", label: "Per-site Precision", color: "#0ea5e9", icon: "crosshair" },
  { value: 3.9, decimals: 1, suffix: "ms", label: "Median Analysis", color: "#10b981", icon: "zap" },
  { value: 0.879, decimals: 3, suffix: "", label: "PairPath Macro-F1", color: "#f59e0b", icon: "users" },
  { value: 0.91, decimals: 2, suffix: "", label: "Study Guider Macro-F1", color: "#f43f5e", icon: "brain" },
];

export const errorTypeF1 = [
  { label: "Off-by-one loop boundary", f1: 0.973 },
  { label: "Incorrect conditional operator", f1: 0.982 },
  { label: "Array length index misuse", f1: 0.973 },
  { label: "Missing break in switch", f1: 1.0 },
  { label: "While variable not updated", f1: 1.0 },
];

export const pairPathStates = [
  { label: "Productive", f1: 0.876, color: "#10b981" },
  { label: "Driver dominance", f1: 0.688, color: "#f59e0b" },
  { label: "Passive navigator", f1: 0.913, color: "#0ea5e9" },
  { label: "Logic struggle", f1: 0.916, color: "#8b5cf6" },
  { label: "Disengaged", f1: 1.0, color: "#f43f5e" },
];

/* ---------- Milestones ---------- */

export type MilestoneStatus = "completed" | "current" | "upcoming";

export type Milestone = {
  title: string;
  date?: string; // leave undefined to show "Date TBA"
  description: string;
  type: "Group" | "Individual";
  status: MilestoneStatus;
};

export const milestones: Milestone[] = [
  {
    title: "Topic Assessment",
    date: "January 2026",
    description: "Topic Assessment Form submitted and approved — the research problem, gap and four sub-objectives defined.",
    type: "Group",
    status: "completed",
  },
  {
    title: "Project Proposal",
    date: "March 2026",
    description: "Individual proposal reports for Code Coach, Study Guider, PairPath and the Adaptive Gamification Engine.",
    type: "Individual",
    status: "completed",
  },
  {
    title: "Progress Presentation 1",
    description: "First progress review: architecture, datasets and early prototypes of each component.",
    type: "Group",
    status: "completed",
  },
  {
    title: "Progress Presentation 2",
    description: "Second progress review: integrated platform, trained models and evaluation results.",
    type: "Group",
    status: "completed",
  },
  {
    title: "Research Paper",
    description: "“Code Guru: An Integrated Real-Time Learning Support Platform for Novice Java Programmers” manuscript completed.",
    type: "Group",
    status: "completed",
  },
  {
    title: "VS Code Marketplace Release",
    description: "Code Guru: Code Coach published on the Visual Studio Marketplace and Open VSX.",
    type: "Group",
    status: "completed",
  },
  {
    title: "Research Portfolio Website",
    date: "September 2026",
    description: "This website — showcasing the research, milestones, team and deliverables.",
    type: "Group",
    status: "current",
  },
  {
    title: "Final Thesis",
    description: "Group thesis and four individual theses covering each component in full.",
    type: "Group",
    status: "upcoming",
  },
  {
    title: "Final Logbook",
    description: "Complete record of supervisor meetings, decisions and weekly progress.",
    type: "Individual",
    status: "upcoming",
  },
  {
    title: "Final Report",
    description: "Final report on the integrated platform and its evaluation.",
    type: "Group",
    status: "upcoming",
  },
  {
    title: "Final Presentation & Viva",
    description: "Final defence and live demonstration of Code Guru to the evaluation panel.",
    type: "Group",
    status: "upcoming",
  },
];

/* ---------- Downloads ---------- */

export type DocLink = { label: string; url?: string };

export type Deliverable = {
  title: string;
  kind: "PDF" | "PPTX" | "DOCX" | "XLSX";
  date?: string;
  description: string;
  url?: string; // set only for documents visitors may download (shows a Download button)
  files?: DocLink[]; // several parts, e.g. one per member
};

/**
 * Deliverables are listed for reference only. Add a `url` to an entry to make it
 * downloadable — currently only the research paper.
 */
export const documents: Deliverable[] = [
  {
    title: "Topic Assessment Form",
    kind: "PDF",
    date: "Jan 2026",
    description: "Research problem, existing systems, proposed solution and objectives.",
  },
  {
    title: "Project Proposals",
    kind: "PDF",
    date: "Mar 2026",
    description: "Individual proposal reports for each component.",
    files: [
      { label: "Code Coach — Nethmina" },
      { label: "Study Guider — Madurapperuma" },
      { label: "PairPath — Appuhami" },
      { label: "Gamification — Aron Charles" },
    ],
  },
  {
    title: "Research Paper",
    kind: "PDF",
    description: "Code Guru: An Integrated Real-Time Learning Support Platform for Novice Java Programmers.",
    url: "https://mysliit-my.sharepoint.com/:b:/g/personal/it22253958_my_sliit_lk/IQAsjdVinLOyRKwWzbDTsYxAAey-OJqlaX9YvePU1mTxfRg?e=vxHYaD",
  },
  {
    title: "Final Thesis (Group)",
    kind: "PDF",
    description: "The complete group thesis for the Code Guru platform.",
  },
  {
    title: "Individual Theses",
    kind: "PDF",
    description: "One thesis per component, written by each member.",
    files: [
      { label: "Code Coach — Nethmina" },
      { label: "Study Guider — Madurapperuma" },
      { label: "PairPath — Appuhami" },
      { label: "Gamification — Aron Charles" },
    ],
  },
  {
    title: "Final Logbook",
    kind: "PDF",
    description: "Supervisor meetings, decisions and weekly progress.",
  },
  {
    title: "Final Report",
    kind: "PDF",
    description: "Final report on the integrated platform and evaluation.",
  },
];

export const presentations: Deliverable[] = [
  { title: "Proposal Presentation", kind: "PPTX", description: "Problem, gap, objectives and proposed solution." },
  { title: "Progress Presentation 1", kind: "PPTX", description: "Architecture, datasets and early prototypes." },
  { title: "Progress Presentation 2", kind: "PPTX", description: "Integrated platform and evaluation results." },
  { title: "Final Presentation", kind: "PPTX", description: "Final defence and live demonstration." },
];

/* ---------- Team ---------- */

export type Person = {
  name: string;
  role: string;
  focus?: string;
  regNo?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  scholar?: string;
  photo?: string; // e.g. "/team/nethmina.jpg" placed in /public/team
};

export const supervisors: Person[] = [
  {
    name: "Ms. Suriyaa Kumari",
    role: "Supervisor",
    focus: "Department of Information Technology",
    email: "suriyaa.k@sliit.lk",
  },
  {
    name: "Ms. Uthpala Samarakoon",
    role: "Co-Supervisor",
    focus: "Department of Information Technology",
    email: "uthpala.s@sliit.lk",
  },
];

export const members: Person[] = [
  {
    name: "W. P. R. Nethmina",
    role: "Group Leader",
    focus: "Code Coach",
    regNo: "IT22253958",
    email: "it22253958@my.sliit.lk",
    github: "https://github.com/RVNethmina",
    photo: "/team/nethmina.jpg",
  },
  {
    name: "H. A. S. I. Madurapperuma",
    role: "Member",
    focus: "Study Guider",
    regNo: "IT22230942",
    email: "it22230942@my.sliit.lk",
    github: "https://github.com/NimeshHasaranga",
  },
  {
    name: "M. N. H. Appuhami",
    role: "Member",
    focus: "PairPath",
    regNo: "IT22140852",
    email: "it22140852@my.sliit.lk",
    github: "https://github.com/Shanuka095",
  },
  {
    name: "J. Aron Charles",
    role: "Member",
    focus: "Adaptive Gamification",
    regNo: "IT22203380",
    email: "it22203380@my.sliit.lk",
    github: "https://github.com/Aron-charles",
  },
];

/* ---------- Highlights ---------- */

export const highlights = [
  {
    tag: "Released",
    title: "On the VS Code Marketplace",
    description: "Code Guru: Code Coach installs from VS Code, and from Open VSX for Cursor, VSCodium and Windsurf.",
    icon: "rocket",
  },
  {
    tag: "Live",
    title: "A working web platform",
    description: "One account across the extension and the portal — insights, lessons, practice games and pairing.",
    icon: "globe",
  },
  {
    tag: "Research",
    title: "Research paper completed",
    description: "Detection, remediation and collaboration evaluated, with per-site precision raised from 0.500 to 1.000.",
    icon: "award",
  },
];

export const nav = [
  { id: "home", label: "Home" },
  { id: "domain", label: "Domain" },
  { id: "components", label: "Components" },
  { id: "metrics", label: "Metrics" },
  { id: "milestones", label: "Milestones" },
  { id: "downloads", label: "Downloads" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

export const contactEmail = "it22253958@my.sliit.lk";
