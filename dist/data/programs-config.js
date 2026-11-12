// Shared by the static page generator and the browser. Do not duplicate course mappings.
export const COURSES = [
  {
    id: 'verbal-intervention', name: 'Verbal Intervention™', category: 'verbal',
    riskBadge: 'Verbal Only • Hands-Off Policy',
    industries: ['healthcare','education','human-services','security','retail','corporate'],
    overview: 'Build a shared approach to recognizing distress and responding with calm, respectful communication. Designed for teams working within a hands-off policy.',
    outcomes: ['Recognize early changes in behavior.','Use calm verbal and nonverbal communication.','Set clear, respectful limits.','Understand how stress can influence a response.'],
    audience: 'Frontline staff, managers, educators, and customer-facing teams.',
    context: 'Supports a consistent communication approach within your organization’s hands-off policies.',
    icon: 'message'
  },
  {
    id: 'nonviolent-crisis-intervention', name: 'Nonviolent Crisis Intervention (NCI)™', category: 'physical',
    riskBadge: 'Standard Crisis • Safe Disengagement & Holding',
    industries: ['healthcare','education','behavioral-health','human-services'],
    overview: 'Connect prevention and verbal de-escalation with supervised safety intervention skills for staff whose roles may involve a physical response.',
    outcomes: ['Recognize developing crisis behavior.','Match responses to assessed risk.','Practice disengagement with an instructor.','Review team communication after an incident.'],
    audience: 'Healthcare, education, behavioral health, and direct-support teams.',
    context: 'Course fit and physical skills must be reviewed against staff roles and organizational policy.',
    icon: 'shield'
  },
  {
    id: 'nci-intermediate', name: 'NCI™ with Intermediate Physical Skills', category: 'physical',
    riskBadge: 'Elevated Risk • Non-Supine/Prone Physical Skills',
    industries: ['healthcare','education','behavioral-health'],
    overview: 'A broader physical skills pathway for designated staff supporting people whose behavior may require more than the core NCI approach.',
    outcomes: ['Assess the fit of a response to changing risk.','Strengthen team coordination.','Practice approved intermediate skills with an instructor.','Review incident responses and next steps.'],
    audience: 'Designated response teams in healthcare, education, and behavioral health.',
    context: 'DACI reviews role, policy, prerequisites, and training environment before confirming this pathway.',
    icon: 'shield'
  },
  {
    id: 'nci-advanced', name: 'NCI™ with Advanced Physical Skills', category: 'physical',
    riskBadge: 'High-Risk • Complex & Dangerous Behavior',
    industries: ['behavioral-health','security','healthcare'],
    overview: 'Discuss a higher-risk pathway for designated staff supporting individuals who may display complex or dangerous behavior.',
    outcomes: ['Consider risk when choosing a response.','Coordinate roles during complex incidents.','Practice advanced skills under instructor supervision.','Identify opportunities to prevent repeat escalation.'],
    audience: 'Specialist response teams in behavioral health, healthcare, and security.',
    context: 'Advanced skills require a consultation about prerequisites, suitability, and organizational authorization.',
    icon: 'shield'
  },
  {
    id: 'reframing-behavior', name: 'Reframing Behavior', category: 'prevention',
    riskBadge: 'Prevention & Neuroscience • All Staff',
    industries: ['education','behavioral-health','human-services'],
    overview: 'Explore how an understanding of stress and behavior can support more constructive interactions and a stronger prevention culture.',
    outcomes: ['Recognize how stress can affect behavior.','Reflect on adult responses to distress.','Develop supportive everyday interactions.','Build a shared prevention vocabulary.'],
    audience: 'Educators and staff building a consistent approach to prevention.',
    context: 'Discuss licensing, staff roles, and an appropriate organizational delivery plan with DACI.',
    icon: 'brain'
  },
  {
    id: 'prevention-first', name: 'Prevention First', category: 'prevention',
    riskBadge: 'Early Recognition • Healthcare & Frontline',
    industries: ['healthcare','dementia-care','human-services'],
    overview: 'Start a conversation about foundational awareness for healthcare and support staff: recognizing distress early and knowing when to seek help.',
    outcomes: ['Notice early signs of escalating distress.','Use consistent language across teams.','Reflect on the influence of staff responses.','Recognize when additional support is needed.'],
    audience: 'Healthcare, dementia care, and frontline support staff.',
    context: 'Program availability and the appropriate onsite training option will be confirmed during consultation.',
    availability: 'Consultation required • Availability to confirm', icon: 'eye'
  },
  {
    id: 'de-escalation-basics', name: 'De-Escalation Basics', category: 'verbal',
    riskBadge: 'Foundational Skills • Fast Deployment',
    industries: ['retail','corporate','education'],
    overview: 'Discuss an introductory prevention and communication pathway for teams seeking a shared starting point for responding to tension.',
    outcomes: ['Recognize situations that may escalate.','Consider how tone and body language affect others.','Use respectful communication to reduce tension.','Identify when to involve a designated colleague.'],
    audience: 'Education, customer-facing, and workplace teams seeking foundational skills.',
    context: 'Program fit, licensing, and the appropriate onsite option will be confirmed before scheduling.',
    availability: 'Consultation required • Availability to confirm', icon: 'message'
  },
  {
    id: 'dementia-capable-care', name: 'Dementia Capable Care', category: 'specialty',
    riskBadge: 'Specialty Care • Cognitive & Memory Support',
    industries: ['dementia-care','healthcare'],
    overview: 'A person-centered care pathway for understanding distress and adapting communication to the needs of people living with dementia.',
    outcomes: ['Recognize that distress can communicate an unmet need.','Adapt communication to the person.','Consider abilities when planning supportive interactions.','Discuss consistent approaches across the care team.'],
    audience: 'Memory care, senior living, and healthcare teams.',
    context: 'Discuss your care environment, team roles, and the appropriate program level with DACI.',
    icon: 'heart'
  }
];

export const INDUSTRIES = [
  { id:'healthcare', name:'Healthcare', icon:'health', courses:['prevention-first','verbal-intervention','nonviolent-crisis-intervention'], description:'A consistent response, from the front desk to the care team.', risks:['Distress, uncertainty, and communication barriers in care settings.','Different response responsibilities across clinical and support roles.','A need for shared language and clear escalation pathways.'] },
  { id:'education', name:'Education', icon:'school', courses:['reframing-behavior','verbal-intervention','nci-intermediate'], description:'Supportive school environments begin with a shared approach.', risks:['Recognizing student distress before behavior escalates.','Consistent communication across classrooms and support teams.','Matching staff responsibilities to school policies and support plans.'] },
  { id:'behavioral-health', name:'Behavioral Health', icon:'brain', courses:['nci-intermediate','nci-advanced','reframing-behavior'], description:'Thoughtful preparation for complex care environments.', risks:['Changing levels of distress and complex behavior.','Coordinated responses across multidisciplinary teams.','Protecting dignity while considering safety and organizational policy.'] },
  { id:'human-services', name:'Human Services', icon:'people', courses:['verbal-intervention','nonviolent-crisis-intervention'], description:'Practical communication skills for people who support people.', risks:['Supporting individuals with different communication needs.','Recognizing distress during daily support activities.','Keeping responses consistent across shifts and settings.'] },
  { id:'dementia-care', name:'Dementia Care', icon:'heart', courses:['dementia-capable-care','prevention-first'], description:'Person-centered responses that respect the individual.', risks:['Distress linked to cognitive and communication changes.','Understanding behavior in the context of individual needs.','Maintaining a consistent, supportive approach across the care team.'] },
  { id:'security', name:'Public Safety & Security', icon:'shield', courses:['verbal-intervention','nci-advanced'], description:'Clear communication and coordinated responses under pressure.', risks:['Tense encounters in public-facing environments.','Clear boundaries between communication and physical response roles.','Coordination with organizational procedures and designated support.'] },
  { id:'retail', name:'Retail', icon:'store', courses:['de-escalation-basics','verbal-intervention'], description:'Prepare customer-facing teams for difficult conversations.', risks:['Customer frustration and conflict at service points.','Knowing when to involve managers or designated support.','Maintaining a respectful, consistent hands-off approach.'] },
  { id:'corporate', name:'Corporate Environments', icon:'building', courses:['de-escalation-basics','verbal-intervention'], description:'A shared language for a safer, more respectful workplace.', risks:['Tension in employee, visitor, or client interactions.','Consistent communication across managers and departments.','Clear pathways for reporting concerns and seeking support.'] }
];

export const TIERS = [
  { id:'prevention', name:'Prevention & Culture' },
  { id:'verbal', name:'Verbal De-Escalation' },
  { id:'physical', name:'Physical Intervention' },
  { id:'specialty', name:'Specialty Care' }
];
