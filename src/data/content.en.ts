import type { Certification, ExperienceItem, SiteContent, SkillItem, Work } from "./content";
import { resumePagePath } from "./content";

const contact = {
  email: "recead0715@naver.com",
  phone: "010-4272-3945",
} as const;

const homeCareOrganization =
  "Gachon University Medical Campus\nIndustry–University Cooperation Foundation";

/**
 * English portfolio copy for `/en`.
 * Edit freely — structure mirrors `content.ts`.
 */
export const siteContentEn: SiteContent = {
  meta: {
    title: "Inhong Kim — Healthcare Portfolio",
    description:
      "Portfolio of Inhong Kim — 1 year of healthcare experience across sports science, data analysis, and digital health.",
  },

  nav: {
    siteName: "Inhong Kim",
    contactCta: "Contact",
    sections: [
      { id: "hero", label: "Home" },
      { id: "values", label: "Values" },
      { id: "skills", label: "Skills" },
      { id: "education", label: "Education" },
      { id: "experience", label: "Experience" },
      { id: "works", label: "Work" },
      { id: "story", label: "Story" },
      { id: "contact", label: "Contact" },
    ],
  },

  hero: {
    name: "Inhong Kim",
    tagline: "Sports Science × Digital Health |\n1 year of professional experience",
    headline: "Finding the value of movement",
    bio: "I explore healthcare and digital health solutions by combining sports science expertise with data analysis.",
    profileImage: "/images/profile.png",
    cutoutImage: "/images/hero-cutout-v8.png",
    profileGallery: [
      { src: "/images/profile.png", alt: "Inhong Kim profile", variant: "formal" as const },
      { src: "/images/profile-field-1.png", alt: "Field consultation", variant: "field" as const },
      { src: "/images/profile-field-2.png", alt: "Device demonstration", variant: "field" as const },
    ],
    profileHint: {
      desktop: "Hover to browse photos",
      mobile: "Tap to browse photos",
    },
    resumeCtaLabel: "View Resume",
    resumeUrl: resumePagePath,
    naverResumeCtaLabel: "View Korean CV",
    naverResumeUrl: "/resume/naver",
    noProfileImage: "No profile image",
  },

  bridge: {
    line1: "At the intersection of\nsports science and digital health,",
    line2: "I look for the value of healthier living — together.",
  },

  values: {
    sectionLabel: "Values",
    title: "Building health value\nthrough movement and data",
    description:
      "I explore healthcare and digital health solutions by combining sports science expertise with data analysis — delivering trustworthy, evidence-based insights.",
    items: [
      "Evidence-based decision-making",
      "User-centered digital health experiences",
      "Reading movement and recovery through data",
      "Practical solutions that connect\nresearch and the field",
    ],
  },

  skills: {
    sectionLabel: "Skills",
    title: "Core capabilities",
    description: "Skills I bring to healthcare and digital health work.",
    items: [
      {
        id: "oa",
        category: "OA",
        tools: "MS Word, Excel, PowerPoint",
        proficiency: 90,
        details: ["Data management & visualization", "Documentation & paperwork", "Supporting materials"],
      },
      {
        id: "data",
        category: "Data Analysis",
        tools: "SPSS, MySQL",
        proficiency: 70,
        details: [
          "Hypothesis testing, regression,\nand multi-faceted statistical analysis",
          "Efficient data extraction queries\nand management",
        ],
      },
      {
        id: "viz",
        category: "Visualization",
        tools: "Figma, Looker Studio",
        proficiency: 65,
        details: ["UX-focused layout design", "Component-based UI prototyping"],
      },
      {
        id: "ai",
        category: "Generative AI",
        tools: "Claude, Cursor, Gemini",
        proficiency: 85,
        details: ["MCP-based workflow automation", "Visual asset generation", "Vibe coding"],
      },
    ] satisfies SkillItem[],
  },

  education: {
    sectionLabel: "Education",
    title: "Education",
    items: [
      {
        school: "Sungkyunkwan University",
        period: "2020 – Aug 2025 (Graduated)",
        major: "B.S. in Sports Science (primary)\n+ International Trade (double major)",
      },
      {
        school: "Giheung High School",
        period: "2017 – 2020 (Graduated)",
        major: "Liberal arts track",
      },
    ],
  },

  experience: {
    sectionLabel: "Experience",
    title: "Experience",
    items: [
      {
        organization: homeCareOrganization,
        role: "Researcher, National Senior Healthcare Project",
        period: "Mar 2025 – Feb 2026",
        employmentType: "Contract",
        sections: [
          {
            title: "① Health log extraction,\npreprocessing & analysis quality",
            points: [
              "Extracted 69k log records with SQL\nand secured 85% analysis validity via SPSS preprocessing",
              "Identified wearable blackout and missing intervals\nand maintained analyzable continuity through field follow-up",
            ],
          },
          {
            title: "② Retention improvement\nvia insight-based health guidance",
            points: [
              "Diagnosed churn drivers through field observation\nand designed guidance linking biometrics to daily habits",
              "Rephrased complex health data into action-focused language with generative AI\n— achieved 83% user retention",
            ],
          },
          {
            title: "③ Interactive decision\ndashboard design",
            points: [
              "Designed a Figma interactive dashboard\ncentered on active users and churn-risk cohorts",
              "Used as decision-support material\nfor 5 MOUs / service contracts",
            ],
          },
        ],
      },
      {
        organization: "Shinsung Taekwondo (Migeum)",
        role: "Assistant Instructor",
        period: "Apr 2023 – Dec 2023",
        employmentType: "Part-time",
        sections: [],
      },
      {
        organization: "mvm Fitness (Seongbok)",
        role: "CS Manager",
        period: "Feb 2021 – Aug 2022",
        employmentType: "Part-time",
        sections: [],
      },
    ] satisfies ExperienceItem[],
  },

  works: {
    sectionLabel: "Portfolio",
    title: "Major projects\n& certifications",
    featuredIds: ["01"],
    featuredLabel: "Featured",
    featuredCta: "View case study",
    moreLabel: "More projects",
    tabs: {
      projects: "Projects",
      certifications: "Certifications",
    },
    tabHint: "Select a tab to explore",
    stackLabels: {
      projects: "Projects",
      certifications: "Certifications",
    },
    scrollHint: "Scroll to explore {label} ·",
    openHint: "Tap to view details",
    projects: [
      {
        id: "01",
        title: "Senior healthcare national project\n— data collection & operations",
        category: "Digital Health",
        image: "/works/01.jpg",
        description:
          "Managed and analyzed health logs in a national senior healthcare project, supporting 85% analysis validity, 83% retention, and 5 MOUs/contracts through insight-based guidance and a decision dashboard.",
        panel: {
          sectionLabel: "Case Study",
          subtitle:
            "A national senior healthcare pilot where biometric and device logs were managed reliably,\nand participation was sustained through field observation and generative-AI health guidance.",
          meta: [
            { label: "Role", value: "Researcher,\nNational Senior Healthcare Project" },
            { label: "Org", value: homeCareOrganization },
            { label: "Period", value: "Mar 2025 – Feb 2026" },
            { label: "Tools", value: "MySQL, SPSS, Figma, Generative AI" },
          ],
          metrics: [
            { label: "Collected data", value: "69k", note: "SQL log extraction & analysis" },
            { label: "Analysis validity", value: "85%", note: "After SPSS preprocessing\n& QC" },
            { label: "Retention", value: "83%", note: "After personalized health guidance" },
            { label: "Decision support", value: "5", note: "MOUs / service contracts" },
          ],
          blocks: [
            {
              id: "problem",
              title: "Problem",
              summary: "In a long pilot, data continuity and user motivation were both at risk.",
              bullets: [
                "Among 224 participants, wearable friction caused repeated data gaps and dropout",
                "Blackouts and missingness accumulated into unusable analysis gaps",
                "Participants struggled to understand what the numbers meant in daily life, weakening motivation",
                "Partners held large volumes of data but could not use them directly for decisions",
              ],
            },
            {
              id: "role",
              title: "My role",
              summary: "I connected data operations, field research, guidance design, and dashboarding.",
              bullets: [
                "Managed extraction and preprocessing of 69k logs with SQL/SPSS to secure analysis validity",
                "Observed churn drivers through site visits and interviews",
                "Turned biometric data into action-centered personalized guidance with generative AI",
                "Designed a decision KPI dashboard in Figma to support MOUs/contracts",
              ],
            },
            {
              id: "method",
              title: "Approach",
              summary: "Hypotheses came from the field; validation and iteration drew on data and generative AI.",
              bullets: [
                "Interviewed at-risk participants (VoC) and confirmed poor understanding of metrics as a core driver",
                "Designed and refined a senior health-coach tone via prompt engineering and tuning",
                "Analyzed behavior patterns and churn factors with SQL/SPSS to inform ops and onboarding",
                "Visualized active users and risk cohorts on a dashboard shared with partners",
              ],
            },
            {
              id: "results",
              title: "Results",
              summary: "Improved data quality, retention, and decision support together.",
              bullets: [
                "Secured 85% analysis validity",
                "Reached 83% user retention",
                "Supported 5 MOUs / service contracts",
                "Established a research loop: discover user problems → validate → connect to service opportunities",
              ],
            },
            {
              id: "insights",
              title: "Insights",
              bullets: [
                "In healthcare pilots, retention is a meaning and trust problem before it is a device problem",
                "More data without behavior change lowers both analysis value and motivation",
                "Generative AI can be an interface that translates complex health metrics into user language",
              ],
            },
            {
              id: "learnings",
              title: "Learnings",
              bullets: [
                "Standardizing churn and blackout rules and onboarding early sharply reduces later ops load",
                "Prompt tuning must be a feedback loop, not a one-off",
                "Dashboards should prioritize decision-ready metric structure over aesthetics",
              ],
            },
          ],
          demoHref: "/en/demo",
          demoCtaLabel: "Open dashboard demo",
        },
      },
      {
        id: "02",
        title: "Samsung Life × SKKU LifeNology Lab\nCohort 1 — de:light",
        category: "Digital Health",
        image: "/works/02.jpg",
        description:
          "Planned an fNIRS-based wearable ring and companion app (de:light), designing UX flows and prototypes in an industry–university program.",
        panel: {
          sectionLabel: "UX Case Study",
          subtitle:
            "A digital health project in which a team planned and prototyped\nan fNIRS wearable ring and connected app experience.",
          meta: [
            { label: "Role", value: "Team member / Planning · UX" },
            { label: "Org", value: "SKKU–Samsung Life LifeNology Lab Cohort 1" },
            { label: "Period", value: "Oct 2024 – Jan 2025" },
            { label: "Tools", value: "Figma, Runway Gen, Fixcap" },
          ],
          metrics: [
            { label: "Program", value: "LifeNology Lab 1", note: "SKKU × Samsung Life" },
            { label: "Output", value: "App prototype", note: "Wearable-linked UX" },
            { label: "Core sensor", value: "fNIRS", note: "Functional near-infrared\nspectroscopy" },
            { label: "Domain", value: "Eating habits", note: "Intervention & management" },
          ],
          blocks: [
            {
              id: "problem",
              title: "Problem",
              summary:
                "Eating-habit interventions needed experience design that catches the moment of awareness, not willpower alone.",
              bullets: [
                "Simple calorie-logging apps often miss the moment when appetite rises",
                "fNIRS signals needed UX that everyday users could understand and trust",
                "Ring wearability and app context had to be designed together",
              ],
            },
            {
              id: "role",
              title: "My role",
              summary: "I led early planning, experience design, and mockups that shaped the team’s core flow.",
              bullets: [
                "Planned key app screens and interactions for eating-intervention scenarios",
                "Built Figma prototypes and clarified the user journey",
                "Supported concept video and visual assets with Runway Gen and Fixcap",
              ],
            },
            {
              id: "method",
              title: "Approach",
              summary: "Persona workshops and iterative prototyping made the service experience concrete.",
              bullets: [
                "Defined the journey: fNIRS signal → appetite alert → intervention guidance",
                "Produced wireframes and clickable prototypes in Figma",
                "Refined UX with persona and context feedback from team workshops",
              ],
            },
            {
              id: "outcome",
              title: "Outcome",
              summary: "Delivered planning artifacts that explain the wearable–app connected experience.",
              bullets: [
                "Completed wearable ring ↔ mobile app UX flow",
                "Secured prototypes and visuals that communicate the service concept",
                "Gained end-to-end experience in digital health device planning",
              ],
            },
          ],
        },
      },
      {
        id: "03",
        title: "Student council\n— Human Rights & Welfare Bureau",
        category: "Teamwork",
        images: ["/works/03.jpg", "/works/03-b.jpg"],
        description:
          "Collected and analyzed student survey data to guide library remodeling priorities, and coordinated input on barrier-free map design.",
        panel: {
          sectionLabel: "Research Case",
          subtitle:
            "Designed and analyzed a survey of ~800 students to prioritize library remodeling\nand mediate between the student council and the university.",
          meta: [
            { label: "Role", value: "Human Rights & Welfare Officer" },
            { label: "Org", value: "55th Student Council, Sungkyunkwan University" },
            { label: "Period", value: "Nov 2022 – Nov 2023" },
            { label: "Tools", value: "Google Forms, Excel" },
          ],
          metrics: [
            { label: "Survey responses", value: "800", note: "Enrolled students" },
            { label: "Target satisfaction", value: "87%", note: "After space improvements" },
            { label: "Study period", value: "1 year", note: "Planning & execution" },
          ],
          blocks: [
            {
              id: "problem",
              title: "Problem",
              summary: "The need for remodeling was widely shared, but student needs were not quantified.",
              bullets: [
                "Many complaints (seats, lighting, noise) lacked prioritized evidence",
                "Objective data was needed between council proposals and the university budget/timeline",
                "Without survey design, decisions risked overweighting unrepresentative opinions",
              ],
            },
            {
              id: "role",
              title: "My role",
              summary: "I owned the survey end-to-end and applied the analysis to planning.",
              bullets: [
                "Designed items on purpose of use, pain points, and desired improvements",
                "Collected and cleaned responses, then ran frequency and cross-tabulation analyses",
                "Fed results into space plans and mediated stakeholder views",
              ],
            },
            {
              id: "method",
              title: "Approach",
              summary: "Followed a research loop: design → collect → analyze → apply.",
              bullets: [
                "Covered density, noise, outlets, openness, and other space factors",
                "Cross-analyzed by year and visit frequency to set priorities",
                "Presented visual summaries in council–university meetings",
              ],
            },
            {
              id: "results",
              title: "Results",
              summary: "Created evidence for a data-backed remodeling direction.",
              bullets: [
                "Completed analysis of ~800 responses",
                "Derived improvement items targeting 87%+ space satisfaction",
                "Documented remodeling rationale grounded in student needs",
              ],
            },
          ],
        },
      },
      {
        id: "04",
        title: "College of Sports Science\n— tailored corporate partnerships",
        category: "Teamwork",
        image: "/works/04.jpg",
        description:
          "Planned and executed major-specific corporate partnerships based on student needs analysis.",
        panel: {
          sectionLabel: "Business Case",
          subtitle:
            "A partnership project that set priorities from a 200-student needs survey,\nthen planned, negotiated, and delivered tailored deals.",
          meta: [
            { label: "Role", value: "Deputy, External Relations" },
            { label: "Org", value: "Student Council, College of Sports Science, SKKU" },
            { label: "Period", value: "Oct 2021 – Oct 2022" },
            { label: "Tools", value: "Google Forms, Excel" },
          ],
          metrics: [
            { label: "Survey sample", value: "200", note: "Enrolled students" },
            { label: "Partnership volume", value: "+30%", note: "vs. previous" },
            { label: "Scope", value: "Plan → run", note: "Full cycle" },
          ],
          blocks: [
            {
              id: "problem",
              title: "Problem",
              summary: "Existing partnerships were driven more by habit than by real student needs.",
              bullets: [
                "Needs were scattered across gear, supplements, and facility discounts",
                "Little demand evidence was available to present to companies",
                "The council needed better volume and terms",
              ],
            },
            {
              id: "role",
              title: "My role",
              summary: "I covered needs research, negotiation decks, and company communication.",
              bullets: [
                "Designed category surveys and analyzed 200 responses",
                "Wrote proposals and negotiation materials from the findings",
                "Coordinated meetings, terms, and execution follow-up",
              ],
            },
            {
              id: "method",
              title: "Approach",
              summary: "Ran a cycle of research → prioritization → proposal → negotiation.",
              bullets: [
                "Cross-analyzed needs by year and sport to set partnership priorities",
                "Built company-specific proposals around top demand items",
                "Reflected outcomes in delivery schedules and allocation",
              ],
            },
            {
              id: "results",
              title: "Results",
              summary: "Shifted to needs-based partnerships and increased volume.",
              bullets: [
                "Partnership goods volume +30% vs. prior",
                "Moved to a survey-evidence-based partnership structure",
                "Practiced the full plan–negotiate–execute cycle",
              ],
            },
          ],
        },
      },
      {
        id: "05",
        title: "Korea Sports Council\n— Kookdae Smartzers Cohort 1",
        category: "Sports Marketing",
        images: ["/works/05.jpg", "/works/05-b.jpg"],
        description:
          "Planned and produced sports promotion content and executed a digital-channel marketing strategy.",
        panel: {
          sectionLabel: "Marketing Case",
          subtitle:
            "An external sports-marketing program promoting swimming through planned, produced, and distributed digital content.",
          meta: [
            { label: "Role", value: "Program team member" },
            { label: "Org", value: "Kookdae Smartzers Cohort 1 (Swimming),\nKorea Sports Council" },
            { label: "Period", value: "Apr 2022 – Nov 2022" },
            { label: "Channels", value: "SNS & digital media" },
          ],
          metrics: [
            { label: "Sport", value: "Swimming", note: "Cohort 1" },
            { label: "Duration", value: "8 months", note: "Apr–Nov 2022" },
            { label: "Content", value: "Multiple pieces", note: "Video & card news" },
          ],
          blocks: [
            {
              id: "problem",
              title: "Problem",
              summary: "Swimming lacked easy channels to convey its appeal to the public.",
              bullets: [
                "Rules and athlete stories were poorly communicated",
                "Offline events alone struggled to sustain attention",
                "The team needed a consistent campaign message",
              ],
            },
            {
              id: "role",
              title: "My role",
              summary: "I contributed from content ideation through channel operations support.",
              bullets: [
                "Ideated content from athlete interviews and training contexts",
                "Supported production for channel formats (card news, short-form)",
                "Helped with uploads/ops and campaign messaging",
              ],
            },
            {
              id: "method",
              title: "Approach",
              summary: "Built storytelling content that improved understanding of the sport.",
              bullets: [
                "Connected daily life, training, and highlights into storylines",
                "Matched tone and format to each channel (Instagram, YouTube, etc.)",
                "Aligned message and visuals through team feedback rounds",
              ],
            },
            {
              id: "outcome",
              title: "Outcome",
              summary: "Produced multiple swimming promo pieces and practiced marketing ops.",
              bullets: [
                "Produced and distributed multiple sports promo assets",
                "Practiced plan–produce–distribute for sports marketing",
                "Strengthened external collaboration and content planning skills",
              ],
            },
          ],
        },
      },
    ] satisfies Work[],
  },

  certifications: [
    {
      name: "ADsP",
      fullName: "Associate Data Specialist",
      issuer: "Korea Data Agency",
      date: "2026.06.05",
      type: "cert",
      description: "Data filtering and analysis with R Studio and SQL",
    },
    {
      name: "AI-POT Level 2",
      fullName: "AI Prompt Utilization",
      issuer: "KPC (Korea Productivity Center)",
      date: "2026.04.30",
      type: "cert",
      description: "Reverse-prompting and connector/MCP-based workflow automation",
    },
    {
      name: "AIBT Level 2",
      fullName: "AI for Business",
      issuer: "KPC (Korea Productivity Center)",
      date: "2026.04.02",
      type: "cert",
      description: "Understanding AI business applications and practical automation",
    },
    {
      name: "Google Analytics Certification",
      fullName: "Google Analytics Certification",
      issuer: "Google",
      date: "2026.02.03",
      type: "cert",
      description: "Event-based behavior and acquisition path analysis",
    },
    {
      name: "TOEIC",
      fullName: "850",
      issuer: "ETS",
      date: "2025.01.26",
      type: "english",
      description: "English reading and business document comprehension",
    },
    {
      name: "OPIc",
      fullName: "Intermediate High",
      issuer: "ACTFL",
      date: "2025.08.03",
      type: "english",
      description: "Spoken English communication",
    },
    {
      name: "Smart Home Healthcare Instructor L2",
      fullName: "Smart Home Healthcare Instructor",
      issuer: "KSHA",
      date: "2025.11.14",
      type: "cert",
      description: "Combining smart-home tech with health services\nfor senior-focused planning",
    },
    {
      name: "Outstanding Poster Award",
      fullName: "2025 Fall Conference Outstanding Poster\n— Korean Society of Exercise Rehabilitation",
      issuer: "Korean Society of Exercise Rehabilitation",
      date: "2025.11",
      type: "award",
      description: "Selected for an outstanding research poster presentation",
    },
    {
      name: "SKKU Honors Graduation",
      fullName: "Academic Excellence Commendation",
      issuer: "Sungkyunkwan University",
      date: "2025.08.25",
      type: "award",
      description: "Recognized for academic excellence across sports science and international trade",
    },
    {
      name: "ROTC Outstanding Cadet",
      fullName: "President’s Commendation",
      issuer: "Sungkyunkwan University",
      date: "2022.08.25",
      type: "award",
      description: "Recognized for leadership and responsibility as a representative cadet",
    },
  ] satisfies Certification[],

  story: {
    sectionLabel: "Story",
    title: "I study movement\nand design life",
    paragraphs: [
      "Through sports science and healthcare data analysis, I have explored how people can move in healthier ways.",
      "My goal is to create practical insights while moving between the lab, the field, and digital services.",
    ],
    photos: [
      { id: "p1", label: "Research", image: "/images/rs_p4_0.png" },
      { id: "p2", label: "Field", image: "/images/rs_p2_1.png" },
      { id: "p3", label: "Data", image: "/images/rs_p4_2.png" },
    ],
  },

  about: {
    sectionLabel: "About",
    headline: "Let’s find the value of\nhealthier living together.",
    bio: "I’m Inhong Kim, with 1 year of healthcare experience.\nWith sports science expertise and data literacy, I aim to help shape the next generation of healthcare.",
    email: contact.email,
    phone: contact.phone,
    copyright: "Inhong Kim",
    ctaButton: contact.email,
    phoneCtaLabel: "Call",
    rightsReserved: "All rights reserved.",
  },

  socialLinks: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/inhongkim0715profile" },
    { label: "Email", href: `mailto:${contact.email}` },
    { label: "Phone", href: `tel:${contact.phone.replace(/[^\d]/g, "")}` },
    { label: "Resume (EN)", href: resumePagePath },
  ],
};
