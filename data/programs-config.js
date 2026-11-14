// Shared source of truth for DACI program pages, selections, and industry bundles.
export const CURRICULUM_SOURCES = {
  "cpiEducation": "https://www.crisisprevention.com/globalassets/us-ca/resources/pdf/cpi-nci-ebk-0244-ed-1024-us-education-training-solutions-brochure-update_final.pdf",
  "cpiVerbal": "https://www.crisisprevention.com/our-programs/verbal-intervention/",
  "cpiDementia": "https://www.crisisprevention.com/our-programs/dementia-capable-care/",
  "cpiDementiaTopics": "https://www.crisisprevention.com/globalassets/us-ca/resources/pdf/dc-dementia-training-requirements-direct-care-workers-bill-325_alignment.pdf",
  "cpiIntermediate": "https://www.crisisprevention.com/our-programs/nonviolent-crisis-prevention-with-intermediate-physical-skills/"
};
export const COURSES = [
  {
    "id": "daci-level-1",
    "name": "DACI Level 1",
    "subtitle": "Prevention, Assessment & De-Escalation",
    "category": "verbal",
    "riskBadge": "Hands-Off • Prevention & De-Escalation",
    "industries": [
      "healthcare",
      "education",
      "behavioral-health",
      "human-services",
      "retail",
      "corporate"
    ],
    "overview": "Recognize early warning signs, assess changing situations, and use calm, respectful communication to prevent and de-escalate a crisis. A hands-off foundation for safer teams.",
    "outcomes": [
      "Recognize behavioral triggers and early warning signs.",
      "Use verbal and nonverbal communication to reduce tension.",
      "Apply trauma-informed approaches while preserving dignity.",
      "Coordinate a hands-off response and support post-incident learning."
    ],
    "audience": "Healthcare, education, behavioral health, human services, corporate, and community teams.",
    "context": "A hands-off program focused on prevention, assessment, communication, and recovery.",
    "duration": "8-hour comprehensive program",
    "durationNote": "Awareness: 2 hours; basic: 4 hours; comprehensive: 8 hours. Instructor development: 16–24 hours (20-hour planning midpoint). Final format is confirmed with DACI.",
    "certification": "DACI Certificate of Completion following successful program completion.",
    "icon": "message",
    "modules": [
      {
        "title": "Understanding human behavior",
        "description": "Explore stress, fear, behavioral triggers, and the influence of trauma."
      },
      {
        "title": "Dynamic assessment",
        "description": "Notice warning signs, environmental factors, and changes in risk."
      },
      {
        "title": "Communication for de-escalation",
        "description": "Practice listening, empathy, rapport, and calm verbal and nonverbal communication."
      },
      {
        "title": "Trauma-informed crisis response",
        "description": "Build trust and preserve dignity during difficult interactions."
      },
      {
        "title": "Personal safety & situational awareness",
        "description": "Consider personal space, environmental positioning, and routes to support."
      },
      {
        "title": "Hands-off crisis intervention",
        "description": "Practice decision-making, de-escalation, and team communication."
      },
      {
        "title": "Managing challenging situations",
        "description": "Recognize threatening behavior and know when to seek additional help."
      },
      {
        "title": "Recovery, documentation & follow-up",
        "description": "Review incidents, support recovery, and identify prevention opportunities."
      }
    ]
  },
  {
    "id": "daci-level-2",
    "name": "DACI Level 2",
    "subtitle": "Prevention, Assessment & De-Escalation with Intermediate Physical Skills",
    "category": "physical",
    "riskBadge": "Intermediate Physical Skills • Designated Response Roles",
    "industries": [
      "healthcare",
      "behavioral-health",
      "human-services"
    ],
    "overview": "Prepare healthcare and behavioral health teams to recognize, assess, and de-escalate crises, coordinate a team response, and practice intermediate safety skills under instructor supervision.",
    "outcomes": [
      "Recognize psychiatric and behavioral warning signs.",
      "Assess changing risks and use therapeutic communication.",
      "Coordinate a team response within organizational policy.",
      "Support safety, documentation, and recovery after an incident."
    ],
    "audience": "Healthcare and behavioral health professionals, direct-care teams, and designated clinical response staff.",
    "context": "Physical skills are matched to staff responsibilities, organizational policy, and instructor assessment.",
    "duration": "8-hour or 16-hour certification",
    "durationNote": "Certification options: 8 hours or 16 hours. Advanced certification: 24 hours; instructor certification: 40 hours. DACI confirms the appropriate option and schedule during consultation.",
    "certification": "DACI program evaluation includes written, skills, scenario, and team-response assessments. Certification level is confirmed with DACI.",
    "icon": "shield",
    "modules": [
      {
        "title": "Understanding behavioral health crises",
        "description": "Recognize behavioral presentations related to distress, trauma, and substance use."
      },
      {
        "title": "Trauma-informed intervention",
        "description": "Recognize triggers and preserve dignity during a response."
      },
      {
        "title": "Advanced verbal de-escalation",
        "description": "Practice therapeutic communication, active listening, and respectful limits."
      },
      {
        "title": "Dynamic behavioral assessment",
        "description": "Assess behavioral and environmental indicators as circumstances change."
      },
      {
        "title": "Team-based crisis response",
        "description": "Coordinate roles, leadership, communication, and staff safety."
      },
      {
        "title": "High-risk behavioral emergencies",
        "description": "Recognize situations needing specialist support and coordinated care."
      },
      {
        "title": "Workplace violence prevention",
        "description": "Develop awareness, professional boundaries, and prevention plans."
      },
      {
        "title": "Intermediate safety interventions",
        "description": "Practice instructor-supervised skills consistent with facility policy."
      },
      {
        "title": "Medical concerns during crises",
        "description": "Recognize distress and activate the appropriate emergency response."
      },
      {
        "title": "Recovery, documentation & debriefing",
        "description": "Support recovery, document incidents, and improve future responses."
      }
    ]
  },
  {
    "id": "daci-level-3",
    "name": "DACI Level 3",
    "subtitle": "Advanced Crisis Intervention, Subject Control & Restraint",
    "category": "physical",
    "riskBadge": "Law Enforcement & Corrections Only",
    "industries": [
      "security"
    ],
    "overview": "Advanced crisis communication, assessment, and instructor-supervised subject control and restraint training for law enforcement and corrections personnel.",
    "outcomes": [
      "Recognize escalation and assess changing threats.",
      "Apply de-escalation and agency-approved decision-making principles.",
      "Coordinate a response within agency policy and authorized duties.",
      "Recognize medical distress and complete post-incident responsibilities."
    ],
    "audience": "Law enforcement officers and corrections or detention personnel only.",
    "context": "Restricted to law enforcement and corrections. This program is not offered as a general healthcare, school, retail, or private-security pathway.",
    "duration": "24-hour basic certification",
    "durationNote": "Basic certification: 24 hours; advanced certification: 40 hours; instructor certification: 80 hours. Eligibility and agency requirements are reviewed before scheduling.",
    "certification": "Written examination, instructor-supervised skills assessment, scenario evaluation, and team performance assessment.",
    "icon": "shield",
    "modules": [
      {
        "title": "Behavioral crisis recognition",
        "description": "Recognize crisis indicators and factors influencing behavior."
      },
      {
        "title": "Advanced de-escalation",
        "description": "Practice communication, active listening, and techniques for reducing confrontation."
      },
      {
        "title": "Legal considerations & agency policy",
        "description": "Review decision-making responsibilities within applicable law and agency policy."
      },
      {
        "title": "Threat assessment & officer safety",
        "description": "Assess environmental risk and maintain situational awareness."
      },
      {
        "title": "Team-based crisis intervention",
        "description": "Coordinate roles, communication, and a planned response."
      },
      {
        "title": "Subject control & restraint principles",
        "description": "Study and practice authorized skills with an instructor."
      },
      {
        "title": "High-risk crisis encounters",
        "description": "Use supervised scenarios to consider complex operational situations."
      },
      {
        "title": "Medical considerations",
        "description": "Recognize distress, monitor safety, and seek medical support."
      },
      {
        "title": "Post-incident responsibilities",
        "description": "Complete reporting, documentation, review, and staff support."
      },
      {
        "title": "Scenario-based evaluation",
        "description": "Demonstrate communication, assessment, and coordinated team performance."
      }
    ]
  },
  {
    "name": "DACI Youth",
    "subtitle": "Adolescent Crisis Prevention, Assessment, De-Escalation & Therapeutic Support",
    "scope": "Hands-off youth support",
    "overview": "Build a shared approach to recognizing distress, responding calmly, and supporting young people through difficult moments. Practice communication and prevention strategies within a hands-off policy.",
    "audience": "Educators, behavioral health professionals, residential treatment staff, juvenile care providers, and other youth-serving teams.",
    "outcomes": [
      "Identify early distress and assess behavioral risk.",
      "Match supportive responses to the level of escalation.",
      "Use calm communication and respectful limits.",
      "Choose non-physical strategies that support safety.",
      "Restore rapport and learn together after an incident."
    ],
    "modules": [
      {
        "title": "Distress, behavior & risk",
        "description": "Explore how perceived threats and stress can affect behavior; identify opportunities for prevention."
      },
      {
        "title": "Recognizing escalation",
        "description": "Practice noticing changes in behavior and choosing a supportive response."
      },
      {
        "title": "The influence of adult responses",
        "description": "Consider underlying causes and how staff behavior can shape an interaction."
      },
      {
        "title": "Supportive communication",
        "description": "Prepare for difficult conversations using clear, calm, respectful communication."
      },
      {
        "title": "Responding to resistance",
        "description": "Practice limits and communication strategies matched to the situation."
      },
      {
        "title": "Hands-off safety decisions",
        "description": "Use verbal and environmental responses that fit the assessed risk."
      },
      {
        "title": "Recovery & reflective practice",
        "description": "Rebuild rapport after a crisis and identify improvements for future support."
      }
    ],
    "sourceKeys": [
      "cpiEducation",
      "cpiVerbal"
    ],
    "sourceNote": "Topic summaries adapted from CPI's published education and Verbal Intervention materials for the DACI Youth outline. DACI-specific certification details require client confirmation.",
    "id": "daci-youth",
    "category": "verbal",
    "riskBadge": "Youth & Adolescent Support • Hands-Off",
    "industries": [
      "education",
      "behavioral-health",
      "human-services"
    ],
    "context": "Developmentally appropriate, trauma-informed support without physical intervention techniques.",
    "duration": "8-hour planning estimate",
    "durationNote": "Allow approximately 8 hours for planning. Duration and certification requirements are confirmed with DACI before scheduling.",
    "certification": "DACI Youth completion and evaluation requirements are confirmed for the selected course format.",
    "icon": "people"
  },
  {
    "name": "DACI Memory",
    "subtitle": "Dementia Education, De-Escalation & Crisis Intervention",
    "scope": "Hands-off dementia support",
    "overview": "Understand the person behind distress and adapt support to their remaining abilities. Explore person-centered communication, daily care, and non-physical approaches to preventing and de-escalating dementia-related distress.",
    "audience": "Memory care, assisted living, skilled nursing, home care, hospice, adult day services, and healthcare teams supporting people living with dementia.",
    "outcomes": [
      "Recognize how cognitive changes affect daily life.",
      "Consider personal history and remaining abilities when planning support.",
      "Interpret distress as possible communication of an unmet need.",
      "Adapt communication and care to the individual.",
      "Use non-physical strategies to reduce distress.",
      "Contribute to a consistent person-centered care plan."
    ],
    "modules": [
      {
        "title": "Dementia & changing abilities",
        "description": "Connect cognitive changes with practical support needs."
      },
      {
        "title": "Knowing the person",
        "description": "Consider preferences, history, strengths, and personhood."
      },
      {
        "title": "Behavior as communication",
        "description": "Look for unmet needs and distress triggers."
      },
      {
        "title": "Communication that fits",
        "description": "Adapt language and approach as communication abilities change."
      },
      {
        "title": "Support during daily care",
        "description": "Match assistance and activities to remaining abilities."
      },
      {
        "title": "Preventing & de-escalating distress",
        "description": "Practice person-centered, non-physical responses."
      },
      {
        "title": "Supportive environments & relationships",
        "description": "Consider environmental changes and family support."
      },
      {
        "title": "Care planning & team follow-through",
        "description": "Translate observations into consistent support approaches."
      }
    ],
    "sourceKeys": [
      "cpiDementia",
      "cpiDementiaTopics"
    ],
    "sourceNote": "Topic summaries adapted from CPI's published Dementia Capable Care information for the DACI Memory outline. This description does not establish a CPI credential or DACI clinical accreditation.",
    "id": "daci-memory",
    "category": "specialty",
    "riskBadge": "Dementia & Cognitive Support • Hands-Off",
    "industries": [
      "dementia-care",
      "healthcare",
      "human-services"
    ],
    "context": "Person-centered, non-physical support for individuals living with dementia and cognitive impairment.",
    "duration": "8-hour planning estimate",
    "durationNote": "Allow approximately 8 hours for planning. Duration and certification requirements are confirmed with DACI before scheduling.",
    "certification": "DACI Memory completion and evaluation requirements are confirmed for the selected course format.",
    "icon": "heart"
  },
  {
    "id": "daci-retail",
    "name": "DACI Retail",
    "subtitle": "Retail Crisis Prevention & De-Escalation",
    "category": "verbal",
    "riskBadge": "Customer-Facing Teams • Hands-Off",
    "industries": [
      "retail",
      "corporate"
    ],
    "overview": "Help customer-facing teams recognize rising frustration, communicate respectfully, maintain professional boundaries, and involve the right support before a situation escalates.",
    "outcomes": [
      "Recognize signs of customer frustration and escalating tension.",
      "Use respectful communication and clear boundaries.",
      "Choose hands-off responses and seek designated support.",
      "Document concerns and identify opportunities for prevention."
    ],
    "audience": "Retail sales associates, customer service staff, store managers, and other customer-facing teams.",
    "context": "A hands-off pathway tailored to the organization’s customer service and safety policies.",
    "duration": "4-hour planning estimate",
    "durationNote": "Allow approximately 4 hours for planning. The final curriculum, duration, and completion requirements are confirmed during consultation.",
    "certification": "Course format and DACI completion requirements are confirmed during consultation.",
    "icon": "store",
    "sourceKeys": [
      "cpiVerbal"
    ],
    "sourceNote": "Learning focus draws on CPI’s published verbal de-escalation topics, adapted for a proposed DACI retail outline. Final retail content is confirmed during consultation.",
    "modules": [
      {
        "title": "Recognizing frustration",
        "description": "Identify early warning signs during customer interactions."
      },
      {
        "title": "Calm, respectful communication",
        "description": "Practice listening, tone, and language that reduce tension."
      },
      {
        "title": "Professional boundaries",
        "description": "Communicate limits and available options clearly."
      },
      {
        "title": "Hands-off safety decisions",
        "description": "Maintain personal space and recognize when to disengage."
      },
      {
        "title": "Team escalation & support",
        "description": "Coordinate with managers and designated support personnel."
      },
      {
        "title": "Incident review & prevention",
        "description": "Report concerns and use team learning to improve future interactions."
      }
    ]
  }
];
export const INDUSTRIES = [
  {
    "id": "healthcare",
    "name": "Healthcare",
    "icon": "health",
    "courses": [
      "daci-level-1",
      "daci-level-2",
      "daci-memory"
    ],
    "description": "A consistent response, from the front desk to the care team.",
    "risks": [
      "Distress, uncertainty, and communication barriers in care settings.",
      "Different response responsibilities across clinical and support roles.",
      "A need for shared language and clear escalation pathways."
    ]
  },
  {
    "id": "education",
    "name": "Education",
    "icon": "school",
    "courses": [
      "daci-level-1",
      "daci-youth"
    ],
    "description": "Supportive school environments begin with a shared approach.",
    "risks": [
      "Recognizing student distress before behavior escalates.",
      "Consistent communication across classrooms and support teams.",
      "Matching staff responsibilities to school policies and support plans."
    ]
  },
  {
    "id": "behavioral-health",
    "name": "Behavioral Health",
    "icon": "brain",
    "courses": [
      "daci-level-2",
      "daci-youth"
    ],
    "description": "Thoughtful preparation for complex care environments.",
    "risks": [
      "Changing levels of distress and complex behavior.",
      "Coordinated responses across multidisciplinary teams.",
      "Protecting dignity while considering safety and organizational policy."
    ]
  },
  {
    "id": "human-services",
    "name": "Human Services",
    "icon": "people",
    "courses": [
      "daci-level-1",
      "daci-level-2",
      "daci-youth"
    ],
    "description": "Practical communication skills for people who support people.",
    "risks": [
      "Supporting individuals with different communication needs.",
      "Recognizing distress during daily support activities.",
      "Keeping responses consistent across shifts and settings."
    ]
  },
  {
    "id": "dementia-care",
    "name": "Dementia Care",
    "icon": "heart",
    "courses": [
      "daci-memory",
      "daci-level-1"
    ],
    "description": "Person-centered responses that respect the individual.",
    "risks": [
      "Distress linked to cognitive and communication changes.",
      "Understanding behavior in the context of individual needs.",
      "Maintaining a consistent, supportive approach across the care team."
    ]
  },
  {
    "id": "security",
    "name": "Public Safety & Security",
    "icon": "shield",
    "courses": [
      "daci-level-1"
    ],
    "description": "Communication skills for public-facing teams, with a separate specialist pathway for law enforcement and corrections.",
    "risks": [
      "Tense encounters in public-facing environments.",
      "Clear boundaries between communication and physical response roles.",
      "Coordination with organizational procedures and designated support."
    ]
  },
  {
    "id": "retail",
    "name": "Retail",
    "icon": "store",
    "courses": [
      "daci-retail",
      "daci-level-1"
    ],
    "description": "Prepare customer-facing teams for difficult conversations.",
    "risks": [
      "Customer frustration and conflict at service points.",
      "Knowing when to involve managers or designated support.",
      "Maintaining a respectful, consistent hands-off approach."
    ]
  },
  {
    "id": "corporate",
    "name": "Corporate Environments",
    "icon": "building",
    "courses": [
      "daci-level-1",
      "daci-retail"
    ],
    "description": "A shared language for a safer, more respectful workplace.",
    "risks": [
      "Tension in employee, visitor, or client interactions.",
      "Consistent communication across managers and departments.",
      "Clear pathways for reporting concerns and seeking support."
    ]
  }
];
export const TIERS = [
  {
    "id": "verbal",
    "name": "Hands-Off De-Escalation"
  },
  {
    "id": "physical",
    "name": "Physical Intervention"
  },
  {
    "id": "specialty",
    "name": "Dementia Care"
  }
];
