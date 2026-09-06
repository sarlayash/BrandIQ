import { Question } from '../types';

export const QUESTION_BANK: Question[] = [
  {
    id: 'q1',
    category: 'LinkedIn Optimization',
    difficulty: 'Easy',
    estimatedSeconds: 30,
    scenario: 'A Fortune 500 technical recruiter visits your LinkedIn profile after seeing a comment you left on an industry discussion.',
    question: 'Which element of your profile immediately determines whether they bounce within 5 seconds or click through to your experience?',
    options: [
      'Your vanity banner image and follower count',
      'A value-driven headline stating whom you help, what problems you solve, and with what proof',
      'Having a list of 50 endorsement skills from peers',
      'Listing your GPA and college graduation honors in the summary'
    ],
    correctAnswerIndex: 1,
    explanation: 'Recruiters scan headlines in under 3-5 seconds. A headline communicating specific value, methodology, and niche expertise transforms a passive glance into an interview invitation.'
  },
  {
    id: 'q2',
    category: 'AI for Content Creation',
    difficulty: 'Medium',
    estimatedSeconds: 40,
    scenario: 'You used an LLM to generate a LinkedIn post analyzing recent fintech shifts. A respected senior leader comments: "This reads like pure generic ChatGPT fluff with zero personal perspective."',
    question: 'What is the most professional and reputation-enhancing way to respond?',
    options: [
      'Delete the post immediately to avoid damaging your digital footprint',
      'Defend that AI was only used for spelling and accuse them of being anti-AI',
      'Thank them for the candid feedback, share a specific real-world case from your own experience that adds nuance, and articulate your unique take',
      'Ignore the comment and ask your colleagues to downvote or report it'
    ],
    correctAnswerIndex: 2,
    explanation: 'Handling public critique with composure while infusing genuine practitioner perspective turns a potential reputational risk into a demonstration of maturity and expertise.'
  },
  {
    id: 'q3',
    category: 'Professional Ethics',
    difficulty: 'Medium',
    estimatedSeconds: 35,
    scenario: 'You are working on a high-stakes AI implementation for an employer/client with proprietary metrics, and you want to write a viral case study to boost your personal brand.',
    question: 'How should you approach sharing this work publicly?',
    options: [
      'Share the exact screenshots and raw data because transparency builds the highest engagement',
      'Anonymize the company name, generalize sensitive figures into percentage improvements, and obtain written authorization before publishing',
      'Post it without naming the client assuming fair use covers educational storytelling',
      'Only publish it on your personal blog rather than LinkedIn so compliance cannot track it'
    ],
    correctAnswerIndex: 1,
    explanation: 'Ethical personal branding honors NDAs and confidentiality. Anonymizing metrics, framing as generalized frameworks, and securing clearance protects both your employer and your credibility.'
  },
  {
    id: 'q4',
    category: 'Digital Reputation',
    difficulty: 'Hard',
    estimatedSeconds: 45,
    scenario: 'A competitor or disgruntled individual copies your viral thought-leadership article word-for-word, publishes it under their own name, and claims you plagiarized them.',
    question: 'What is the most strategic course of action to protect your brand authority?',
    options: [
      'Start an aggressive public call-out tagging their CEO and connections in multiple fiery posts',
      'Preserve timestamped proof (Google cache, original drafts, revision logs), file a formal DMCA/platform copyright report, and calmly post a masterclass thread dissecting the deep methodology only the true author could know',
      'Concede and delete your original post to prevent negative algorithmic penalties',
      'Hire a bot farm to spam their account with negative reports'
    ],
    correctAnswerIndex: 1,
    explanation: 'Documenting verifiable timestamps and exercising formal platform channels preserves your dignity. Demonstrating deep authorial knowledge effortlessly exposes copycats without petty drama.'
  },
  {
    id: 'q5',
    category: 'Recruiter Psychology',
    difficulty: 'Medium',
    estimatedSeconds: 35,
    scenario: 'A headhunter is evaluating two candidates with identical years of experience for a Senior AI Product Manager position.',
    question: 'Which digital footprint signal gives Candidate A the strongest psychological edge over Candidate B?',
    options: [
      'Candidate A has 25,000 automated connections and posts generic motivational quotes daily',
      'Candidate A has a documented public trail of case studies, open-source discussions, and thoughtful teardowns explaining "why" decisions were made',
      'Candidate A lists 40 online course certificates on their profile banner',
      'Candidate A writes in third-person on their LinkedIn bio'
    ],
    correctAnswerIndex: 1,
    explanation: 'Hiring managers look for "Proof of Work" and decision-making rationale. Artifacts showcasing process and critical thinking de-risk hiring choices significantly.'
  },
  {
    id: 'q6',
    category: 'Portfolio Building',
    difficulty: 'Easy',
    estimatedSeconds: 30,
    scenario: 'You are an aspiring Data & AI specialist, but your portfolio only features standard school project datasets (like Titanic Survival and Iris Flower classification).',
    question: 'Why does this weaken your personal brand, and how do you fix it?',
    options: [
      'It does not have enough CSS animations; you should add 3D webGL graphics',
      'Recruiters see Titanic datasets dozens of times weekly; replace them with an end-to-end project solving an unscripted real-world business problem with live user data',
      'You should re-label the Titanic dataset as proprietary enterprise data',
      'It is fine as long as your code has 100% test coverage'
    ],
    correctAnswerIndex: 1,
    explanation: 'Standard tutorial repos signal beginner tutorial-following. Custom, messy datasets with clear business impact demonstrate true problem-solving competence.'
  },
  {
    id: 'q7',
    category: 'Networking',
    difficulty: 'Easy',
    estimatedSeconds: 25,
    scenario: 'You want to connect with a VP of Engineering at a dream company you have never met before.',
    question: 'Which LinkedIn connection request note achieves the highest response rate?',
    options: [
      '"Hi! I want to expand my network with great leaders like you. Please accept!"',
      '"Hey, I saw you have job openings. Can you refer me for the senior developer role?"',
      '"Loved your podcast takeaway on microservices latency trade-offs last week. Applied your benchmarking tip to our staging cluster today with notable gains. Would love to follow your work here."',
      'No note at all, just spam the Connect button repeatedly'
    ],
    correctAnswerIndex: 2,
    explanation: 'Specific contextual appreciation combined with proof of application triggers reciprocity and respect, differentiating you from hundreds of transactional job-seekers.'
  },
  {
    id: 'q8',
    category: 'Thought Leadership',
    difficulty: 'Hard',
    estimatedSeconds: 50,
    scenario: 'You notice an emerging consensus in your industry that everyone praises, but your hands-on experimental data indicates serious edge-case vulnerabilities.',
    question: 'How do you position your contrarian perspective to build respected thought leadership without sounding like a troll?',
    options: [
      'Mock the mainstream advocates with memes and call their analysis amateur',
      'Stay silent because going against industry consensus will get you ostracized',
      'Frame the post with intellectual humility: validate the consensus upside, methodically present the edge-case data, and invite peer peer-review to stress-test your findings',
      'Privately message only junior engineers to spread the rumor'
    ],
    correctAnswerIndex: 2,
    explanation: 'True thought leaders do not court controversy for clickbait; they advance industry discourse by offering structured evidence, acknowledging trade-offs, and encouraging collaborative scrutiny.'
  },
  {
    id: 'q9',
    category: 'AI Productivity',
    difficulty: 'Medium',
    estimatedSeconds: 35,
    scenario: 'You want to scale your personal branding content output using generative AI without losing your authentic human voice.',
    question: 'Which workflow represents the gold-standard "Cyborg" content creation model?',
    options: [
      'Prompting an AI to generate 30 posts automatically and scheduling them untouched via a bot',
      'Writing raw personal anecdotes, extracting proprietary lessons, using AI to brainstorm alternative hooks and structural clarity, then manually editing the final voice',
      'Rephrasing other creators\' viral articles through an LLM and reposting them as your own',
      'Avoiding AI altogether because any AI use is universally detectable and frowned upon'
    ],
    correctAnswerIndex: 1,
    explanation: 'The highest-performing creators use AI as a thinking partner and editor (amplifying human seed insights and personal stories) rather than an autonomous ghostwriter.'
  },
  {
    id: 'q10',
    category: 'Public Speaking',
    difficulty: 'Medium',
    estimatedSeconds: 40,
    scenario: 'You are invited to give a 15-minute lightning talk at an industry conference. Most attendees are senior peers.',
    question: 'What speaking framework cements your reputation as an authority rather than a presenter?',
    options: [
      'Reading 45 text-dense PowerPoint slides with high-speed delivery to prove how much you know',
      'A structured narrative arc: The High-Stakes Problem -> Why Traditional Approaches Break -> Your Novel Framework with 1 Concrete Takeaway -> Audience Call to Action',
      'Spending 10 minutes discussing your personal autobiography and company credentials before the first slide',
      'Giving an extemporaneous pitch about your consulting services with no technical substance'
    ],
    correctAnswerIndex: 1,
    explanation: 'High-leverage presentations center on attendee transformation and succinct, actionable frameworks. Dense self-promotion repels senior audiences.'
  },
  {
    id: 'q11',
    category: 'Brand Consistency',
    difficulty: 'Easy',
    estimatedSeconds: 25,
    scenario: 'Your LinkedIn says you are an "Enterprise Cloud Architect", your GitHub calls you a "Junior Web Hacker", and your Twitter/X bio reads "Crypto degenerate & casual gamer".',
    question: 'What is the primary risk of this fragmented online presence?',
    options: [
      'It creates cognitive dissonance for hiring managers and clients, causing them to doubt your professional identity and seriousness',
      'Google search algorithms will refuse to index your social media profiles',
      'You will be banned for having multiple identities across web platforms',
      'There is no downside; showing completely unrelated personas in every channel is always recommended'
    ],
    correctAnswerIndex: 0,
    explanation: 'Brand congruence creates mental clarity. While tone can adjust to platform culture, your core professional value proposition should feel cohesive across all public touchpoints.'
  },
  {
    id: 'q12',
    category: 'Storytelling',
    difficulty: 'Medium',
    estimatedSeconds: 35,
    scenario: 'You experienced a major failure in a recent startup or project and want to write about it on LinkedIn.',
    question: 'How do you turn this setback into a brand-building victory?',
    options: [
      'Blame your former co-founders and investors so people know the failure wasn\'t your fault',
      'Adopt toxic positivity and pretend the failure was actually a secret masterclass success',
      'Take radical ownership, dissect the exact miscalculations objectively, and share the repeatable protocol you engineered to ensure it never happens again',
      'Never mention failure; your personal brand should only ever project flawless perfection'
    ],
    correctAnswerIndex: 2,
    explanation: 'Vulnerability backed by radical accountability and analytical introspection demonstrates leadership grit and high emotional intelligence.'
  },
  {
    id: 'q13',
    category: 'Career Visibility',
    difficulty: 'Easy',
    estimatedSeconds: 30,
    scenario: 'You consistently deliver great code or designs inside your company, but promotions and high-profile assignments always go to peers who speak up more in meetings.',
    question: 'What is the foundational law of internal personal branding you are neglecting?',
    options: [
      '"If you do good work, you should never have to talk about it"',
      '"Doing the work is only 50%; packaging, communicating, and socializing the business impact accounts for the other 50%"',
      '"You must undermine colleagues during team standups to get noticed"',
      '"Work harder and stay late every evening until management notices silently"'
    ],
    correctAnswerIndex: 1,
    explanation: 'Excellence in silence is indistinguishable from mediocrity to busy executive leadership. Transparently connecting your effort to business KPIs is essential for career visibility.'
  },
  {
    id: 'q14',
    category: 'Influence Building',
    difficulty: 'Hard',
    estimatedSeconds: 45,
    scenario: 'You want to build sustained influence in your domain, but you currently have under 500 followers and zero organic reach.',
    question: 'Which "under-the-radar" tactic builds initial credibility faster than posting into the void?',
    options: [
      'Buying 5,000 bot followers to appear established on day one',
      'Joining engagement pods where members blindly like each other\'s posts with "Great post!"',
      'High-value commenting: Regularly leaving thoughtful, paragraph-length micro-insights on top creators\' posts where thousands of relevant peers already congregate',
      'Sending direct messages to 100 recruiters asking them to follow your page'
    ],
    correctAnswerIndex: 2,
    explanation: 'Borrowing established distribution through consistently insightful commentary in high-traffic comments sections attracts the highest-quality organic professional following.'
  },
  {
    id: 'q15',
    category: 'Future of Work',
    difficulty: 'Medium',
    estimatedSeconds: 40,
    scenario: 'With AI tools automating routine coding, copy, and analytical tasks, junior professionals worry their skill set is obsolete.',
    question: 'How should you position your personal brand to remain resilient and coveted in the AI era?',
    options: [
      'Brand yourself strictly as an ultra-fast manual typist',
      'Position yourself as a problem-solver who orchestrates AI agents, applies rigorous domain judgment, and leads cross-functional stakeholder synthesis',
      'Avoid mentioning AI on your profile so clients don\'t think you use shortcuts',
      'Switch careers to manual blue-collar trades exclusively'
    ],
    correctAnswerIndex: 1,
    explanation: 'Value has shifted from raw procedural execution to higher-order synthesis: problem formulation, taste, quality verification, and stakeholder trust.'
  },
  {
    id: 'q16',
    category: 'Content Marketing',
    difficulty: 'Easy',
    estimatedSeconds: 30,
    scenario: 'Your LinkedIn posts keep receiving low impressions (under 200 views) despite having 2,000 connections.',
    question: 'What common structural flaw kills post reach right at the beginning?',
    options: [
      'Not adding 30 generic hashtags like #business #success #love at the end',
      'A weak, boring first two lines (the "hook") before the "...see more" fold that gives the reader zero reason to stop scrolling',
      'Posting in plain text instead of video format only',
      'Having a profile picture taken outdoors'
    ],
    correctAnswerIndex: 1,
    explanation: 'The initial 2 lines determine click-through rate past the fold. If your hook lacks tension, curiosity, or value, readers scroll past and algorithms throttle distribution.'
  },
  {
    id: 'q17',
    category: 'Professional Writing',
    difficulty: 'Medium',
    estimatedSeconds: 35,
    scenario: 'You review an AI-assisted article you drafted and notice it is saturated with buzzwords: "In today\'s fast-paced digital landscape, leveraging synergistic paradigms is crucial..."',
    question: 'How do you edit this to sound like a seasoned industry operator?',
    options: [
      'Add even more complex corporate jargon to sound scholarly',
      'Strip out rhetorical fluff; replace with crisp, direct verbs, specific dollar/time figures, and tangible constraints',
      'Translate it into Latin quotes',
      'Leave it as is because corporate recruiters love corporate buzzwords'
    ],
    correctAnswerIndex: 1,
    explanation: 'True experts write with utmost simplicity and precision. Fluffy corporate jargon signals insecurity or reliance on raw unedited AI prompts.'
  },
  {
    id: 'q18',
    category: 'Employer Branding',
    difficulty: 'Hard',
    estimatedSeconds: 40,
    scenario: 'Your company leadership encourages employees to be brand ambassadors on LinkedIn, but you also want to build your personal brand equity.',
    question: 'How do you balance company loyalty with personal career sovereignty?',
    options: [
      'Only re-share company corporate press releases without adding any personal words',
      'Tell the company your personal brand is none of their business and refuse to mention your job',
      'Frame stories through your personal journey: showcase the actual problems you solved at the company, credit your teammates, and highlight organizational culture authentically',
      'Create a fake anonymous account to post about work'
    ],
    correctAnswerIndex: 2,
    explanation: 'A win-win personal brand aligns personal thought leadership with authentic workplace contributions. Highlighting team wins and complex company challenges enhances both brands.'
  },
  {
    id: 'q19',
    category: 'Interview Positioning',
    difficulty: 'Easy',
    estimatedSeconds: 30,
    scenario: 'In an executive interview, the hiring director says: "Tell me about yourself."',
    question: 'Which framework turns this cliché question into an unforgettable brand pitch?',
    options: [
      'Chronologically reciting your resume starting from your high school graduation year',
      'The Present-Past-Future framework: What you currently excel at -> Key milestone proofs that forged your expertise -> Why this specific company is the logical next chapter for your vision',
      'Giving a 30-second summary of your personal hobbies and weekend activities',
      'Asking the interviewer why they haven\'t read your LinkedIn profile already'
    ],
    correctAnswerIndex: 1,
    explanation: 'Present-Past-Future instantly anchors your modern competence, validates it with historical achievements, and aligns your trajectory with their company objectives.'
  },
  {
    id: 'q20',
    category: 'Personal Website',
    difficulty: 'Medium',
    estimatedSeconds: 35,
    scenario: 'You are designing your personal domain website (e.g., yourname.com).',
    question: 'What above-the-fold component has the highest conversion rate for consulting or career opportunities?',
    options: [
      'An auto-playing 2-minute video background with heavy techno music',
      'A 1-sentence value proposition paired with social proof (logos of companies, publications, or client testimonials) and a single clear Call-To-Action (CTA)',
      'A photo gallery of your vacations to show you are well-rounded',
      'A counter displaying how many visitors have arrived since 2021'
    ],
    correctAnswerIndex: 1,
    explanation: 'Visitors make value judgments in under 5 seconds. Clear positioning + tangible proof + clear next step is the holy trinity of digital conversion.'
  },
  {
    id: 'q21',
    category: 'Professional Decision Making',
    difficulty: 'Hard',
    estimatedSeconds: 45,
    scenario: 'A sponsor offers you $3,000 to promote an unvetted crypto trading bot or questionable career coaching program to your 10,000 LinkedIn followers.',
    question: 'How should you evaluate this opportunity in the context of long-term personal brand equity?',
    options: [
      'Accept immediately; audience monetisation should be prioritized whenever cash is offered',
      'Reject it; personal brand trust takes years to build and seconds to destroy—promoting low-integrity products permanently poisons your professional credibility',
      'Promote it with a tiny disclaimer hidden at the bottom of the post',
      'Ask for $5,000 instead to make the reputational damage worthwhile'
    ],
    correctAnswerIndex: 1,
    explanation: 'Trust is the only currency in personal branding that compounds indefinitely. Endorsing questionable services destroys goodwill that no amount of short-term sponsorship money can replace.'
  },
  {
    id: 'q22',
    category: 'Resume Positioning',
    difficulty: 'Medium',
    estimatedSeconds: 35,
    scenario: 'You are updating your resume and LinkedIn Experience bullet points.',
    question: 'Which bullet point format demonstrates executive-level personal branding mastery?',
    options: [
      '"Responsible for managing company social media and generating AI prompts daily."',
      '"Helped the engineering team do better testing and fixed bugs whenever needed."',
      '"Engineered an automated AI QA triage pipeline, reducing customer-reported regressions by 38% and saving 14 engineering hours/week across 6 enterprise deployments."',
      '"Worked hard as a dedicated team player who always gave 110%."'
    ],
    correctAnswerIndex: 2,
    explanation: 'Google\'s X-Y-Z formula ("Accomplished [X], as measured by [Y], by doing [Z]") grounds your achievements in quantifiable business reality rather than passive job duties.'
  },
  {
    id: 'q23',
    category: 'LinkedIn Optimization',
    difficulty: 'Easy',
    estimatedSeconds: 25,
    scenario: 'You want to maximize the inbound search discovery of your LinkedIn profile by recruiters using LinkedIn Recruiter tool.',
    question: 'Where should your critical keywords (e.g. "Full Stack Engineer", "GenAI Architecture", "Kubernetes") be strategically placed?',
    options: [
      'Spammed repeatedly in white text hidden in the footer of your summary',
      'Naturally woven across your Headline, About summary, Job Titles, Skills section, and Project descriptions',
      'Only mentioned once in a recommendation you write for someone else',
      'Keywords do not affect LinkedIn search indexing'
    ],
    correctAnswerIndex: 1,
    explanation: 'LinkedIn\'s search index weights matches in Headlines, Job Titles, and the structured Skills taxonomy highest. Strategic, natural distribution ensures maximum search discoverability.'
  },
  {
    id: 'q24',
    category: 'AI for Content Creation',
    difficulty: 'Hard',
    estimatedSeconds: 45,
    scenario: 'You notice that many creators use AI image generators to create surreal, plastic-looking portraits and sci-fi thumbnails for everyday business posts.',
    question: 'Why does this damage high-tier B2B personal branding, and what is the better alternative?',
    options: [
      'It looks low-effort and gimmicky; using real authentic work-in-progress screenshots, handwritten diagrams, or genuine real-world candid photos establishes far higher practitioner trust',
      'AI images take too much bandwidth to load on mobile devices',
      'LinkedIn will automatically delete any post with an AI image',
      'Plastic sci-fi aesthetics are actually the most trusted image format in enterprise software'
    ],
    correctAnswerIndex: 0,
    explanation: 'In an era of synthetic abundance, authentic human artifacts (rough whiteboards, real terminal logs, behind-the-scenes snapshots) command premium trust.'
  },
  {
    id: 'q25',
    category: 'Career Growth Strategy',
    difficulty: 'Medium',
    estimatedSeconds: 40,
    scenario: 'You are planning your personal branding roadmap for the next 12 months.',
    question: 'What defines a sustainable "Content Engine" that doesn\'t lead to burnout?',
    options: [
      'Committing to publishing 5 new articles per day across 7 different social networks simultaneously',
      'Creating 1 foundational deep-dive asset per month (e.g., a comprehensive case study or whitepaper), and repurposing it into 4 weekly threads, 8 bite-sized tips, and 2 visual slides',
      'Only posting when spontaneous inspiration strikes once every 4 months',
      'Outsourcing your entire presence to an agency and never checking your messages'
    ],
    correctAnswerIndex: 1,
    explanation: 'The Pillar-and-Cluster repurposing model maximizes leverage. One robust, deeply researched project provides enough raw insights for a month of diverse content.'
  }
];

// Helper to shuffle questions
export function getShuffledQuestions(pool: Question[] = QUESTION_BANK, count: number = 15): Question[] {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, pool.length)).map(q => {
    // Shuffle options as required by prompt
    const originalOptions = q.options.map((opt, idx) => ({ text: opt, isCorrect: idx === q.correctAnswerIndex }));
    const shuffledOpts = [...originalOptions].sort(() => 0.5 - Math.random());
    const newCorrectIdx = shuffledOpts.findIndex(o => o.isCorrect);
    return {
      ...q,
      options: shuffledOpts.map(o => o.text),
      correctAnswerIndex: newCorrectIdx
    };
  });
}

// Adaptive next question selector
export function getAdaptiveNextQuestion(
  availableQuestions: Question[],
  answeredQuestions: { isCorrect: boolean }[],
  currentDifficulty: 'Easy' | 'Medium' | 'Hard'
): { question: Question; nextDifficulty: 'Easy' | 'Medium' | 'Hard' } | null {
  if (availableQuestions.length === 0) return null;

  // Evaluate recent performance (last 2 questions)
  const recent = answeredQuestions.slice(-2);
  let nextDifficulty = currentDifficulty;

  if (recent.length >= 2 && recent.every(r => r.isCorrect)) {
    // Promote difficulty
    if (currentDifficulty === 'Easy') nextDifficulty = 'Medium';
    else if (currentDifficulty === 'Medium') nextDifficulty = 'Hard';
  } else if (recent.length >= 2 && recent.every(r => !r.isCorrect)) {
    // Demote difficulty to maintain confidence
    if (currentDifficulty === 'Hard') nextDifficulty = 'Medium';
    else if (currentDifficulty === 'Medium') nextDifficulty = 'Easy';
  }

  // Find candidate from matching difficulty or nearest
  let candidate = availableQuestions.find(q => q.difficulty === nextDifficulty);
  if (!candidate) {
    candidate = availableQuestions[0];
  }

  // Shuffle options
  const originalOptions = candidate.options.map((opt, idx) => ({ text: opt, isCorrect: idx === candidate!.correctAnswerIndex }));
  const shuffledOpts = [...originalOptions].sort(() => 0.5 - Math.random());
  const newCorrectIdx = shuffledOpts.findIndex(o => o.isCorrect);

  const preparedQuestion: Question = {
    ...candidate,
    options: shuffledOpts.map(o => o.text),
    correctAnswerIndex: newCorrectIdx
  };

  return { question: preparedQuestion, nextDifficulty };
}
