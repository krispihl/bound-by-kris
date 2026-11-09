type CvHighlight = {
	// Short lead-in, shown in bold above the text so the list can be scanned.
	label: string
	text: string
}

type CvRole = {
	title: string
	// Key results shown as chips under the role title.
	stats?: string[]
	highlights: CvHighlight[]
}

type CvStep = {
	title: string
	period?: string
	detail?: string
	// The role held now, shown with a filled dot.
	current?: boolean
}

type CvEntry = {
	title: string
	detail?: string
	// Positions held, newest first, shown as a timeline under the title.
	steps?: CvStep[]
	period?: string
	// Detailed highlights of the work, grouped by role, shown under the entry.
	roles?: CvRole[]
	// A sidenote is plain text under the list, not a titled item.
	note?: boolean
}

// Words that link to a page on this site (to), e.g. "board games" to the games list, or to another site (href), opening
// in a new tab.
export type CvLink = { text: string; to: string } | { text: string; href: string }

// A paragraph is plain text, or a list of text pieces with links among them. The PDF prints the link words as plain text.
export type CvParagraph = string | (string | CvLink)[]

export const paragraphText = (paragraph: CvParagraph) =>
	typeof paragraph === 'string' ? paragraph : paragraph.map((part) => (typeof part === 'string' ? part : part.text)).join('')

export type CvSection = {
	id: string
	heading: string
	// Paragraphs shown above the entries.
	summary?: CvParagraph[]
	// Paragraphs shown after the summary on the site only, e.g. a pointer to somewhere the printed PDF can't link to.
	webSummary?: CvParagraph[]
	// Short skill names shown as tags between the summary and the entries.
	tags?: string[]
	entries: CvEntry[]
}

export const CV_SECTIONS: CvSection[] = [
	{
		id: 'profile',
		heading: 'Profile',
		summary: [
			"I'm a front-end engineer with full-stack experience, who has spent 8 years working on a high-traffic SaaS public web platform. My main focus was public website, signup, CMS and our shared component library, where I was one of the main contributors.",
			"During the last 2 years I led Pipedrive's public-web accessibility initiative through two mission-scale efforts. I scoped them, made the business case, prioritized WCAG audit findings, coordinated different teams and shipped many of the fixes myself.",
			'I also led the engineering side of web experimentation and was voted "Experimenter of the Year" in a company-wide vote.',
		],
		webSummary: [
			[
				'Read what colleagues say about working with me in my ',
				{
					text: 'LinkedIn recommendations',
					href: 'https://www.linkedin.com/in/kristina-pihl-97461a10a/details/recommendations/',
				},
				'.',
			],
		],
		tags: [
			'Web Accessibility (WCAG)',
			'Design Systems',
			'A/B Testing',
			'React',
			'TypeScript',
			'Front-End Development',
			'Web Performance',
			'SEO',
			'Mentoring',
			'Code Review',
		],
		entries: [],
	},
	{
		id: 'work',
		heading: 'Work',
		entries: [
			{
				title: 'Pipedrive',
				steps: [
					{ title: 'Software Engineer', period: 'Jan 2022 – Dec 2026', current: true },
					{ title: 'Junior Front End Developer', period: 'Apr 2019 – Dec 2021' },
					{ title: 'Front End Developer Intern', period: 'Dec 2018 – Mar 2019' },
				],
				period: '2018 – 2026',
				roles: [
					{
						title: 'Accessibility Mission Lead & Engineer',
						stats: ['EAA compliance', '15-part Accessibility Bites'],
						highlights: [
							{
								label: 'Ran public-web accessibility initiative',
								text: 'Guided two major company-wide initiatives across Design, Web, and Marketplace teams—handling everything from the business case and prioritizing audit findings to building core component fixes.',
							},
							{
								label: 'Eliminated critical barriers',
								text: 'Resolved nearly 60 high-impact WCAG 2.2 AA and ObservePoint issues across multiple pages for European Accessibility Act (EAA) compliance, fixing signup flows, navigation landmarks, pricing tables, keyboard interactions and much more.',
							},
							{
								label: 'Built to last',
								text: 'Added regression alerts and baked accessibility directly into our CMS and design system via helpers, heading overrides, accessible label fields etc.',
							},
							{
								label: 'Fostered a quality culture',
								text: 'Created a 15-part "Accessibility Bites" engineering series, set PR review standards, shared guiding documents with Web content team.',
							},
						],
					},
					{
						title: 'Engineering Lead',
						stats: ['Experimenter of the Year', 'Optimizely handbook'],
						highlights: [
							{
								label: 'Built our experimentation practices from scratch',
								text: 'Led the engineering side of Web Strategy, establishing how we ship reliable A/B tests with fewer defects and guided weekly engineering syncs.',
							},
							{
								label: 'Streamlined testing to production',
								text: 'Turned winning experiments into well-scoped roadmap tickets to cut down rework, resolved Optimizely conflicts, and partnered with our web designer on the shared component library.',
							},
							{
								label: 'Scaled the team through documentation and mentorship',
								text: 'Wrote our engineering Optimizely handbook and handover guides, while mentoring and onboarding colleagues.',
							},
							{
								label: 'Recognition',
								text: 'Awarded Pipedrive\'s "Experimenter of the Year" (the Pipey) by company wide colleague votes.',
							},
						],
					},
					{
						title: 'Content Platform & CMS Engineering',
						stats: ['Craft CMS', 'SEO', 'Core Web Vitals'],
						highlights: [
							{
								label: 'Public website and CMS',
								text: 'Worked across Craft CMS and the renderers behind our public-facing pages, from the main site to signup and Knowledge Base. Built features that let content teams create and publish pages with less engineering help, including localization into new languages.',
							},
							{
								label: 'Scalable SEO content',
								text: 'Built reusable templates for content hubs, with structured data and a migration of existing pages.',
							},
							{
								label: 'Fast pages',
								text: 'Contributed to Core Web Vitals work, caching improvements and removal of legacy components.',
							},
						],
					},
					{
						title: 'Design System',
						stats: ['Design collaboration', 'Accessible components'],
						highlights: [
							{
								label: 'Component library',
								text: 'Major contributor to our shared component library, building reusable, accessible components used across the public website.',
							},
							{
								label: 'Design partnership',
								text: 'Worked closely with designers on new components and new features, guiding them towards consistent naming conventions and bringing accessibility requirements into designs early.',
							},
						],
					},
				],
			},
			{
				title: 'Vali IT! course',
				steps: [{ title: 'Student', detail: '4 months course + 2 months internship' }],
				period: '2018',
			},
			{
				title: 'MIHO OÜ',
				steps: [{ title: 'Technician / AutoCad draftsman', detail: 'Construction technical drawings with AutoCad' }],
				period: '2016 – 2018',
			},
			{
				title: 'Ericsson Estonia',
				steps: [{ title: 'Database administrator', detail: 'AutoCad drawings and database administration tasks' }],
				period: '2007 – 2016',
			},
			{ title: 'And anything before that is already ancient history', note: true },
		],
	},
	{
		id: 'education',
		heading: 'Higher education',
		entries: [
			{ title: 'Graphic design, additional training', detail: 'Estonian Academy of Arts, Open Academy', period: '2010 – 2012' },
			{ title: 'Master of Science, telecommunications, cum laude', detail: 'Tallinn University of Technology', period: '2008 – 2010' },
			{ title: 'Bachelor of Science, telecommunications, cum laude', detail: 'Tallinn University of Technology', period: '2004 – 2007' },
		],
	},
	{
		id: 'skills',
		heading: 'Skills',
		entries: [
			{ title: 'Front-end', detail: 'HTML, CSS, JavaScript, TypeScript, React, Next.js' },
			{ title: 'Accessibility', detail: 'WCAG 2.2, ARIA, VoiceOver' },
			{ title: 'Design systems and CMS', detail: 'Component libraries, Craft CMS integration' },
			{ title: 'Growth and SEO', detail: 'A/B experimentation (Optimizely), SEO and Core Web Vitals' },
			{ title: 'Operations', detail: 'Observability and alerting (Grafana, Loki)' },
			{
				title: 'AI-assisted development',
				detail: 'Claude Code, GitHub Copilot, custom subagents and skills, AI-assisted code review and testing',
			},
			{ title: 'Leadership', detail: 'Mentoring, code review, technical leadership' },
			{ title: 'Design', detail: 'Illustrator, Photoshop, InDesign' },
		],
	},
	{
		id: 'languages',
		heading: 'Languages',
		summary: ['Estonian (native), English'],
		entries: [],
	},
	{
		id: 'interests',
		heading: 'Interests',
		summary: [
			['Cycling, bikepacking, motorcycle touring, snowboarding, running, swimming, reading, ', { text: 'board games', to: '/boardgames' }],
		],
		entries: [],
	},
]
