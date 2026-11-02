type CvEntry = {
	title: string
	detail?: string
	period?: string
	// A sidenote is plain text under the list, not a titled item.
	note?: boolean
}

type CvSection = {
	id: string
	heading: string
	entries: CvEntry[]
}

export const CV_SECTIONS: CvSection[] = [
	{
		id: 'work',
		heading: 'Work',
		entries: [
			{
				title: 'Software Engineer, Pipedrive',
				detail: 'Front End Developer Intern > Junior Front End Developer > Software Engineer',
				period: '2018 – now',
			},
			{ title: 'Student, Vali IT! course', detail: '4 months course + 2 months internship', period: '2018' },
			{ title: 'Technician / AutoCad draftsman, MIHO OÜ', detail: 'Construction technical drawings with AutoCad', period: '2016 – 2018' },
			{ title: 'Database administrator, Ericsson Estonia', detail: 'AutoCad drawings and database administration tasks', period: '2007 – 2016' },
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
			{ title: 'Development', detail: 'HTML, CSS, JS, React.js, TypeScript, Next.js, accessibility' },
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
				detail:
					'I love to spend it outdoors: cycling, bikepacking, riding my motorcycle, snowboarding, camping etc. At home you would find me reading or playing boardgames.',
			},
		],
	},
]
