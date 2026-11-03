export type Resource = {
	name: string
	href: string
	description: string
}

export type ResourceGroup = {
	title: string
	resources: Resource[]
}

export const A11Y_RESOURCES: ResourceGroup[] = [
	{
		title: 'Blogs',
		resources: [
			{
				name: 'Adrian Roselli',
				href: 'https://adrianroselli.com/tag/accessibility',
				description: 'Deep dives into HTML, ARIA and how patterns really behave with assistive tech.',
			},
			{
				name: 'Sara Soueidan',
				href: 'https://www.sarasoueidan.com/blog/',
				description: 'Thorough, practical articles on accessible front-end, CSS and SVG.',
			},
			{
				name: 'Léonie Watson',
				href: 'https://tink.uk/category/code-things/',
				description: 'Code things from a screen reader user: ARIA, browsers and accessibility APIs.',
			},
		],
	},
	{
		title: 'Documentation for building',
		resources: [
			{
				name: 'Inclusive Components',
				href: 'https://inclusive-components.design/',
				description: 'Common interface components, built step by step to be accessible.',
			},
			{
				name: 'WebAIM',
				href: 'https://webaim.org/resources/',
				description: 'Articles, checklists and tools such as the contrast checker.',
			},
			{
				name: 'W3C WAI',
				href: 'https://www.w3.org/WAI/standards-guidelines/',
				description: 'The standards themselves: WCAG, ARIA and the guidance around them.',
			},
		],
	},
]
