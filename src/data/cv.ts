type CvRole = {
	title: string
	highlights: string[]
}

type CvEntry = {
	title: string
	detail?: string
	// Steps of a career path, shown one after another under the title.
	steps?: string[]
	period?: string
	// Detailed highlights of the work, grouped by role, shown under the entry.
	roles?: CvRole[]
	// A sidenote is plain text under the list, not a titled item.
	note?: boolean
}

type CvSection = {
	id: string
	heading: string
	// Paragraphs shown above the entries.
	summary?: string[]
	// Short skill names shown as tags between the summary and the entries.
	tags?: string[]
	entries: CvEntry[]
}

export const CV_SECTIONS: CvSection[] = [
	{
		id: 'profile',
		heading: 'Profile',
		summary: [
			"I'm a front-end / full-stack engineer who has spent 8 years working on a high-traffic SaaS public web platform. My main focus was public website, signup, CMS and shared component library, where I was one of the main contributers.",
			"In the last 2 years I led Pipedrive's public-web accessibility initiative through two mission-scale efforts. I scoped them, made the business case, prioritized WCAG audit findings, coordinated different teams and shipped many of the fixes myself.",
			'I also led the engineering side of web experimentation and was voted "Experimenter of the Year" in a company-wide vote.',
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
				title: 'Software Engineer, Pipedrive',
				steps: [
					'Software Engineer (Jan 2022 – present)',
					'Junior Front End Developer (Apr 2019 – Dec 2021)',
					'Front End Developer Intern (Dec 2018 – Mar 2019)',
				],
				period: '2018 – 2026',
				roles: [
					{
						title: 'Accessibility Mission Lead & Engineer, Public Web',
						highlights: [
							"Led Pipedrive's public-web accessibility program through two mission-scale efforts. I defined scope, wrote the business case, triaged audit findings, and coordinated Web, Design, Discovery and Marketplace teams while building many of the fixes myself.",
							'2026: Triaged a WCAG 2.2 AA audit of 21 pages (64 issues, 18 critical) and delivered 35 remediation tickets in shared components and templates. These included skip links and landmarks, an accessible signup flow and modals, a semantic pricing comparison table, keyboard-operable tooltips, accordions and toggles, a search combobox, and reduced-motion support.',
							'2025: Resolved all Critical and Serious issues from automated ObservePoint scans with about 24 fixes across the component library and renderers. The work covered keyboard access, ARIA, focus visibility, heading semantics, contrast and signup form errors. It prepared the site for the EU Accessibility Act, and I added alerting to catch regressions.',
							'Built CMS and tooling support so the gains last: aria-label fields, heading-style overrides, a visually hidden utility class, and role-based test selectors.',
							'Taught the wider engineering org through a 15-part "Accessibility bites" series, and set accessibility requirements and the review bar for new code.',
							'Argued against a separate AI-accessibility initiative, because the accessibility tree already serves both people and AI agents. That saved the company the work.',
						],
					},
					{
						title: 'Engineering Lead, Web Strategy & Contextual Experience',
						highlights: [
							'Won Pipedrive\'s company-wide "Experimenter of the Year" award (the Pipey), chosen by company-wide vote.',
							'Led the engineering side of Web Strategy from its inception. I defined how the team ships A/B experiments with fewer defects and ran the weekly engineering syncs.',
							'Turned winning experiments into scoped, well-groomed engineering work. Detailed ticket preparation reduced rework between engineering and stakeholders.',
							'Resolved experiment conflicts and bugs in the Optimizely setup.',
							"Wrote the team's guide to building Optimizely experiments, now maintained by other engineers. Wrote a handover guide for the successor lead.",
							'Onboarded and mentored two colleagues, including one from another business function. Was the technical partner to the web designer on the component library.',
						],
					},
					{
						title: 'Content Platform & CMS Engineering',
						highlights: [
							'Built a templatized hub system for SEO content: article and category templates, multi-hub support, custom ordering, structured data, and a migration of existing pages.',
							'Improved the reliability of the CMS-to-renderer webhook pipeline and cut alert noise. Contributed to bug-bash plans for a webhook-service rewrite.',
						],
					},
					{
						title: 'Design System & Growth Engineering',
						highlights: [
							'Major contributor to the shared component library (about 170 merged PRs). I built variants for the flagship product-launch landing page on a tight timeline.',
							'Implemented homepage, pricing and getting-started experiments and rolled out winners.',
							'Researched an email-validation vendor migration for the signup service and wrote up the findings.',
						],
					},
					{
						title: 'Earlier work',
						highlights: [
							'1,100+ merged PRs across the main public-site renderer, signup, the knowledge base, Academy, Marketplace and billing front ends.',
							'Built marketing components and CMS features, added new languages to the site, and documented the CMS translation flow.',
							'Led performance work, including Core Web Vitals assessment, caching and removal of legacy components.',
							'Worked on the calculator and homepage revamp initiatives.',
							'Handled on-call and production alerts, and security vulnerability remediation.',
						],
					},
				],
			},
			{ title: 'Student, Vali IT! course', detail: '4 months course + 2 months internship', period: '2018' },
			{ title: 'Technician / AutoCad draftsman, MIHO OÜ', detail: 'Construction technical drawings with AutoCad', period: '2016 – 2018' },
			{
				title: 'Database administrator, Ericsson Estonia',
				detail: 'AutoCad drawings and database administration tasks',
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
			{ title: 'Accessibility', detail: 'WCAG 2.2, ARIA, VoiceOver and screen readers, audit triage' },
			{ title: 'Design systems and CMS', detail: 'Component libraries, Craft CMS integration, i18n with Crowdin' },
			{ title: 'Growth and SEO', detail: 'A/B experimentation (Optimizely), SEO and Core Web Vitals' },
			{ title: 'Operations', detail: 'Observability and alerting (Grafana, Loki), AI-assisted development' },
			{ title: 'Leadership', detail: 'Mentoring, code review, technical leadership' },
			{ title: 'Design', detail: 'Illustrator, Photoshop, InDesign' },
		],
	},
	{
		id: 'outside-work',
		heading: 'Outside work',
		entries: [
			{ title: 'Languages', detail: 'Estonian (native), English' },
			{
				title: 'Free time',
				detail: 'I love to spend it outdoors: cycling, bikepacking, riding my motorcycle, snowboarding, camping etc. At home you would find me reading or playing boardgames.',
			},
		],
	},
]
