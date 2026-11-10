export type ListItem = {
	text: string
	sublist?: ListBlock
}

export type ListBlock = {
	type: 'list'
	ordered: boolean
	items: ListItem[]
}

export type Block =
	| { type: 'heading'; level: 3; text: string }
	| { type: 'paragraph'; text: string }
	| { type: 'quote'; quote: string; author: string }
	| { type: 'code'; code: string }
	| { type: 'table'; header: string[]; rows: string[][] }
	| ListBlock

export type A11ySection = {
	heading: string
	// The "Common pitfalls" section, which is shown on its own card.
	isIssues?: boolean
	blocks: Block[]
}

export type A11yBite = {
	number: number
	title: string
	summary: string
	sections: A11ySection[]
}

// Inline text supports a small markdown subset: `code`, **bold**, *italic* and [links](url).
export const A11Y_BITES: A11yBite[] = [
	{
		number: 1,
		title: 'Skip links',
		summary:
			'I think most of you, who have worked with me long enough, have heard me babble about skip links more than once. If not, here is your chance to hear it (once more). So you might already generally know what they are and why we need them, but in this post I will go over once more, why they are actually that important.',
		sections: [
			{
				heading: 'What are Skip Links?',
				blocks: [
					{
						type: 'paragraph',
						text: "Skip links are accessibility features that provide keyboard users with a shortcut to bypass navigation and potentially other repetitive elements on a webpage. They're typically the first focusable element on a page but remain invisible until activated with the `Tab` key.",
					},
				],
			},
			{
				heading: 'Why we need them?',
				blocks: [
					{
						type: 'paragraph',
						text: 'To put it bluntly, we need to stop wasting peoples time and nerves by making them perform similar repeating actions while navigating between pages.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: 'Keyboard users waste time navigating through repetitive header and footer content on every page',
							},
							{
								text: 'Users with motor disabilities experience fatigue from repeated navigation',
							},
							{
								text: 'Screen reader users must listen to entire navigation on every single page',
							},
						],
					},
					{
						type: 'paragraph',
						text: "If you think about how visual users scan the page, then they never read through header links one by one *on each page*. Once they have already looked at header navigation and go to a new page, they do not start from the header again. They start by scanning page content instead. So why would we make non-visual or keyboard only users scan through the header on each page? It's repetitive and annoying.",
					},
					{
						type: 'paragraph',
						text: "Some of you, who might be more familiar with assistive technology and it's use cases, could wonder - but aren't page landmarks already enough? The short answer is - no.",
					},
					{
						type: 'paragraph',
						text: 'Technically it’s correct: screen reader users can navigate by landmarks (like `<nav>`, `<main>`, or `<header>`) or by headings (`<h1>`, `<h2>`) using specialized shortcut keys. However, skip links remain a fundamental "Level A" requirement of the Web Content Accessibility Guidelines (WCAG) because of keyboard-only users and the diversity of assistive tools.',
					},
					{
						type: 'paragraph',
						text: 'Keyboard-Only *sighted* users is the group most often forgotten. These are people who can see the screen but cannot (or choose not to) use a mouse due to motor impairments, tremors, or temporary injuries.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: 'The Problem: Sighted keyboard users do not use screen readers. They don\'t have a "Landmarks Menu" or "Headings List." They interact with the page by pressing `Tab`.',
							},
							{
								text: 'The Solution: For them, a skip link is the only way to bypass a massive header or footer without tabbing x number of times.',
							},
						],
					},
					{
						type: 'paragraph',
						text: 'Even for screen reader users, the skip link is often the very first thing they hear: *"Link, Skip to main content."* It serves as a verbal confirmation that the site is accessible. Also it’s faster to hit `Enter` on that first link than it is to open a "Landmarks" rotor or menu, scroll down to "Main," and select it.',
					},
				],
			},
			{
				heading: 'Common pitfalls',
				isIssues: true,
				blocks: [
					{
						type: 'paragraph',
						text: 'Picture a typical marketing site without skip links: around 10 header links, identical on every page. Finding something usually means jumping through several pages, tabbing through *every single header link* each time. Most people would give up and search elsewhere.',
					},
					{
						type: 'paragraph',
						text: 'The footer could be even worse. Want the cookie settings link at the very bottom? That can mean a long list of footer links to tab through first. Amazing, right?',
					},
				],
			},
			{
				heading: 'Technical Solutions',
				blocks: [
					{
						type: 'paragraph',
						text: 'The technical implementation is actually rather straightforward and simple. It involves creating a visually hidden links before header and footer that become visible only when focused via keyboard navigation. This means we would not even change the visual layout of the page in any way for the sighted user, but we would make it **so much better** for anyone using keyboard navigation or screen reader assistive technologies.',
					},
					{
						type: 'quote',
						quote: '“The one argument for accessibility that doesn’t get made nearly often enough is how extraordinarily better it makes some people’s lives. How many opportunities do we have to dramatically improve people’s lives just by doing our job a little better?”',
						author: 'Steve Krug',
					},
				],
			},
		],
	},
	{
		number: 2,
		title: 'Focus indicators',
		summary:
			'In part 1, we discussed skip links. Skip links are used to skip some repeating patterns like header links. Otherwise, while using a keyboard, you would have to tab through each link separately. Now let us imagine that you are tabbing through those links. How do you understand, which link is currently selected? This is where focus indicators come into play.',
		sections: [
			{
				heading: 'What are Focus indicators?',
				blocks: [
					{
						type: 'paragraph',
						text: 'Focus indicators (often called focus rings) are the "mouse cursor" for keyboard users. They provide a visual cue that shows exactly which element currently has keyboard focus. The Golden Rule: If you can click it, you must be able to see when you have "tabbed" to it.',
					},
				],
			},
			{
				heading: 'Why we need them?',
				blocks: [
					{
						type: 'paragraph',
						text: 'Without focus indicators, a person navigating with the `Tab` key is effectively "flying blind"—they are interacting with the page, but have no idea which link or button they are about to trigger. Also, if a page has some focus indicators present, and some missing, the keyboard navigation experience will become extra confusing. At some point, you see where you are and the next minute you are lost without any visual cues. And then suddenly the focus indicator appears in seemingly a random place down the page!',
					},
				],
			},
			{
				heading: 'Common pitfalls',
				isIssues: true,
				blocks: [
					{ type: 'paragraph', text: 'Focus problems usually fall into four groups:' },
					{
						type: 'list',
						ordered: true,
						items: [
							{
								text: "**Not focusable at all:** a `<div>` used as a menu trigger opens on hover but never receives focus, so keyboard users can't reach it. Native `<a>` and `<button>` elements are focusable by default.",
							},
							{
								text: '**Ring removed on purpose:** the default outline gets stripped because it "looks ugly", and nothing replaces it. Keyboard users have no idea where they are.',
							},
							{
								text: "**Ring clipped:** the element is focusable, but a parent such as a card with `overflow: hidden` cuts the ring off. It technically works, but it's like a car with pedals and no steering wheel.",
							},
							{
								text: '**Focus off-screen:** a slide-in panel parked off-screen stays in the tab order. The ring vanishes 2000px to the left and the user thinks the page froze. This is called "Ghost Tabbing."',
							},
						],
					},
				],
			},
			{
				heading: 'Technical Solutions',
				blocks: [
					{
						type: 'paragraph',
						text: 'Visual focus indicator can be implemented with simple CSS, but remember that good focus indicator must be visible, obvious, and high-contrast.',
					},
					{
						type: 'heading',
						level: 3,
						text: 'Design Requirements:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: 'High Contrast: The indicator must stand out against the background. WCAG 2.1 requires a contrast ratio of at least 3:1 against the adjacent colors.',
							},
							{
								text: 'No "Layout Shift": Using a `border` can sometimes "push" surrounding content. It is better to use `outline` (potentially together with `box-shadow` ), as these are drawn on top of the element without taking up space.',
							},
							{
								text: "Consistency: While they don't have to look the same on every element, they should feel like they belong to the same design system.",
							},
						],
					},
					{
						type: 'heading',
						level: 3,
						text: 'Modern Implementation: `:focus-visible`',
					},
					{
						type: 'paragraph',
						text: 'The `:focus-visible` pseudo-class is the current industry standard. It tells the browser: "Show the focus ring if the user is using a keyboard, but hide it if they just clicked with a mouse." This keeps our UI "clean" for mouse users while protecting accessibility.',
					},
					{
						type: 'quote',
						quote: '“Accessibility allows us to tap into everyone’s potential.”',
						author: 'Debra Ruh',
					},
				],
			},
		],
	},
	{
		number: 3,
		title: 'Use of color',
		summary:
			"In part 2, we discussed focus indicators — you know, those rings that tell you where you are. But a ring is only as good as its visibility. If the color blends into the background, it’s about as helpful as a camouflage life vest. In this part, let's talk about using color to convey meaning. Is color alone enough to tell your story? Spoiler: **No.**",
		sections: [
			{
				heading: 'What is "Use of Color"?',
				blocks: [
					{
						type: 'paragraph',
						text: 'In practice we often use specific hues to signal information — like red for "Stop/Error," green for "Go/Success," or blue for "I’m a link, click me!" It’s a great visual shorthand, but if it’s your *only* way of communicating, you\'re essentially "whispering" to a huge chunk of your users. Technically, it\'s not *only* about color. We need *distinction*.',
					},
				],
			},
			{
				heading: 'Why?',
				blocks: [
					{
						type: 'paragraph',
						text: 'Imagine playing a game where "Delete My Account" is red button and "Keep My Account" is green one, but you see the world in grayscale. Suddenly, every click is a high-stakes gamble.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: "**Color Blindness:** About 8% of men and 0.5% of women see the world differently. If you rely solely on color, they're playing a guessing game.",
							},
							{
								text: '**Environmental Factors:** Try reading a "subtle" blue link on a screen with 10% brightness while standing in direct sunlight. Good luck. Or try to read a "light gray on white" website outside in the light? Or on a monitor from 2005? Contrast and color disappear faster than a "free trial" when you forget to cancel it.',
							},
							{
								text: '**[WCAG 1.4.1](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html) (Level A):** This isn\'t a design "vibe"; it’s a requirement. You cannot use color as the *only* visual means of conveying information. *Note: there are though some additional rules that you can obey if you are not willing to add back those nice and descriptive underlines to inline links for example (see below).*',
							},
						],
					},
				],
			},
			{
				heading: 'Common pitfalls',
				isIssues: true,
				blocks: [
					{
						type: 'paragraph',
						text: 'Designs often drop the underline from inline links and rely on colour alone. WCAG still allows that, but only if [the link has at least 3:1 contrast with the surrounding body text](https://webaim.org/articles/contrast/#only) *and* shows a non-colour cue on hover (typically an underline) and on focus (a focus ring).',
					},
					{
						type: 'paragraph',
						text: 'Lets say you have a blue link at 2.82:1 against the body text. Would the gap to 3:1 really be *that* visible? Probably not, but there has to be a standard to refer to. Treat the minimum as a floor and go *beyond* it where you can.',
					},
				],
			},
			{
				heading: 'Technical Solutions',
				blocks: [
					{
						type: 'list',
						ordered: true,
						items: [
							{
								text: '**Bring back the Underline:** The simplest, most universally understood "I am a link" indicator. It’s classic, it’s retro, and it actually works.',
							},
							{
								text: '**The "If No Underline" rule aka Contrast is King:** If design insists on no underline by default, we *must*:',
								sublist: {
									type: 'list',
									ordered: true,
									items: [
										{
											text: 'Hit that *3:1 contrast ratio* against surrounding text.',
										},
										{
											text: 'Provide a *non-color indicator* (like an underline) on mouse hover and keyboard focus',
										},
									],
								},
							},
							{
								text: "**Use icons or labels:** Don't just make an error message red. Add an icon or text so the meaning is clear even if the color is gone.",
							},
						],
					},
					{
						type: 'paragraph',
						text: 'And for testing you can do the "Grayscale Test": Turn your monitor to grayscale. If you can\'t tell what’s a link, what’s an error, or what’s just flavor text, your design is officially "Accessibility Lite."',
					},
					{
						type: 'paragraph',
						text: 'So let’s just stop making our users play "Hide and Seek" and give them clear indication.',
					},
					{
						type: 'quote',
						quote: '“Every design decision has the potential to include or exclude people”',
						author: 'Alistair Duggin',
					},
				],
			},
		],
	},
	{
		number: 4,
		title: 'Landmarks',
		summary:
			'We have already talked about skip links and how we can skip some content (like header links) and jump straight to the main part of the content. In this part we will see another way how assistive technology users can quickly navigate around on a web page. We will be talking about landmark regions.',
		sections: [
			{
				heading: 'What are Landmarks and roles?',
				blocks: [
					{
						type: 'paragraph',
						text: '**Landmarks** are specific regions of a webpage that allow assistive technologies to identify and navigate to major sections of the document. These are usually defined by HTML5 elements like `<main>`, `<nav>`, and `<footer>.`',
					},
					{
						type: 'paragraph',
						text: 'You could think of Landmarks as "You Are Here" stickers on a giant mall map. They tell assistive technology, "Hey, this chunk is the Header, and this massive pile of text is the Main content."',
					},
					{
						type: 'paragraph',
						text: 'While HTML5 elements have "implicit" roles, we can also add manual roles, which act as an override or a clarification when the HTML structure isn\'t perfect.',
					},
					{
						type: 'paragraph',
						text: 'So (ARIA) **Roles** are attributes you can manually add to HTML elements (e.g., `role="contentinfo"`) to tell assistive technology exactly what that element does. Sometimes an element knows exactly who it is (like a `<footer>` standing proudly by itself), but sometimes it gets a mid-life crisis because it\'s buried in too many `<div>` tags and needs a `role="contentinfo"` tag to remember its purpose in life.',
					},
				],
			},
			{
				heading: 'Why we need them?',
				blocks: [
					{
						type: 'paragraph',
						text: 'For users who rely on screen readers, landmarks are the primary method of "skimming" a page. Because screen reader users don\'t "scroll"—they "teleport." Landmarks are the coordinates for that teleportation. They allow users to bypass parts of the page and jump straight to the unique content of the section they were looking for.',
					},
					{
						type: 'paragraph',
						text: 'Imagine walking into a supermarket where *none* of the aisles have signs. To find the oat milk, you have to start at Aisle 1 (the logo), walk past the checkout (navigation), sniff every single cereal box (header links), and finally reach the fridge.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Efficient Navigation:** Landmarks provide a "Table of Contents" of the page UI. For example users can jump directly to the "Main" section, skipping dozens of repetitive header links.',
							},
							{
								text: '**Contextual Awareness:** Roles tell the user where they are. Without a `contentinfo` role, a user might reach the bottom of the page and not realize they are looking at footer already.',
							},
							{
								text: '**Structural Integrity:** They provide a standardized way for different browsers and screen readers to interpret your design system consistently.',
							},
						],
					},
				],
			},
			{
				heading: 'Common pitfalls',
				isIssues: true,
				blocks: [
					{
						type: 'paragraph',
						text: "Landmarks are easy to miss entirely: no `<main>` at all, or a `<footer>` that doesn't count as one.",
					},
					{
						type: 'paragraph',
						text: 'A typical footer trap comes from layout wrappers. For example the `<footer>` might end up inside a `<section>`. The browser is a bit of a snob: *"A footer inside a section belongs to that section, not the page."* It loses its `contentinfo` landmark role, and to a screen reader it\'s just a generic block of text.',
					},
				],
			},
			{
				heading: 'Technical Solutions',
				blocks: [
					{
						type: 'paragraph',
						text: 'A `<footer>` inside a `<section>` could be there for layout reasons, so simply moving it out could break the visual layout. There are a couple of ways to fix it without that.',
					},
					{
						type: 'list',
						ordered: true,
						items: [
							{
								text: 'We could implemented explicit role assignment. This means adding `role="contentinfo"` directly to the `<footer>` element. This would override the nesting rules and forces the browser to announce it as the global footer landmark. It’s like giving the footer a megaphone so it can shout "I\'M THE FOOTER!" from inside its wrapper.',
							},
							{
								text: 'A more elegant fix, when the layout is built with a component library, is to let its section component render as a different element. For the footer, that means: “Hey you, nice mr. Section! We really like all your amazing styles, but please be a Footer instead.” With no `<section>` around it, the `<footer>` gets its landmark role back.',
							},
						],
					},
					{
						type: 'paragraph',
						text: 'The `<main>` needs care too. When the main content is built from multiple separate `<section>` elements, it is not enough to slap the role on the first one. If you only put the `<main>` tag on the *first* section, everything following it (the siblings) will be "orphaned" from the main landmark. This is because screen readers treat landmarks like *containers,* not like bookmarks or anchors.',
					},
					{
						type: 'paragraph',
						text: 'When everything is wrapped, a user can jump to "Main" and then use "Screen Reader Search" or "Heading Navigation" to explore everything inside that container.',
					},
					{
						type: 'paragraph',
						text: 'Thus we needed to actually wrap *all* the main content.',
					},
					{
						type: 'paragraph',
						text: '**For your information, here’s a list of all landmarks and their corresponding roles:**',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '`<header>`, role="banner"',
							},
							{
								text: '`<nav>`, role="navigation"',
							},
							{
								text: '`<main>` , role="main"',
							},
							{
								text: '`<section>`, role="region"*',
							},
							{
								text: '`<form>`, role="form"*',
							},
							{
								text: '`<aside>`, role="complementary"',
							},
							{
								text: '`<footer>`, role="contentinfo"',
							},
						],
					},
					{
						type: 'paragraph',
						text: 'It’s important to note that unlike `<main>` or `<nav>`, the `<section>` and `<form>` elements are “shy”. They only show up in the Landmarks list (the VoiceOver Rotor) if you give them a name using `aria-label` or `aria-labelledby`.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: 'Invisible landmark: `<section>...</section>`',
							},
							{
								text: 'Visible landmark: `<section aria-label="Customer Reviews">...</section>`',
							},
						],
					},
					{
						type: 'quote',
						quote: '“The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect.”',
						author: 'Tim Berners-Lee',
					},
				],
			},
		],
	},
	{
		number: 5,
		title: 'Accessible tables',
		summary:
			'In previous post we talked about landmarks. These are specific regions on page that allow assistive technologies to identify and navigate to major sections of the document. But assistive technologies also provide you other “quick references” to scan the page content. For example a list of page headings, links or tables. In this post we are going to focus on data tables and how we can make them accessible and meaningful for everyone.',
		sections: [
			{
				heading: 'What are accessible data tables?',
				blocks: [
					{
						type: 'paragraph',
						text: 'In technical terms, it means creating a digital structure where screen readers and assistive technologies can programmatically determine the relationship between data cells and their headers. Instead of just being a "box with numbers," the table tells a story: "In the \'Lite\' column, for the \'Leads and deals\' row, the value is 2500." It’s about building a map that works even if you can’t see the "You Are Here" sticker.',
					},
					{
						type: 'paragraph',
						text: 'You can think of accessible data table as a well-organized dinner party. Everyone knows exactly where they are sitting, who is sitting next to them, and what’s on the menu.',
					},
				],
			},
			{
				heading: 'Why we need them?',
				blocks: [
					{
						type: 'paragraph',
						text: 'For users with visual impairments, a poorly built table is just a chaotic "word soup."',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Context is King:** Without proper headers, a screen reader user might hear "20,000" and have no clue if that’s a price, a seat limit, or the number of coffee cups consumed by the dev team this week.',
							},
							{
								text: '**The "Where Am I?" Factor:** Screen readers allow users to jump from cell to cell. Accessible tables ensure the "mental cursor" stays synced with the actual data. If you move from row to row, it should tell you that the cell content is connected to the row for "this data". Accessible table will do that for you.',
							},
							{
								text: "**It’s the Law (and it's just nice):** Following WCAG standards (specifically [Guideline 1.3.1](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)) isn't just about avoiding a stern letter from legal; it’s about making sure everyone can understand your content clearly.",
							},
						],
					},
				],
			},
			{
				heading: 'Common pitfalls',
				isIssues: true,
				blocks: [
					{
						type: 'paragraph',
						text: 'Visual tables on a page are often a "master of disguise." They *look* like a table, but under the hood they are `<div>`s pretending to be one, with no relationship between rows or cells. For assistive technology users, that makes them useless.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Missing relationships:** a data cell can have multiple headers, but nothing links them. It’s like a family tree where no one is talking to each other.',
							},
							{
								text: '**"Ghost" columns:** on mobile, "sliding window" layout might show two columns and hide the rest with `display: none`. That removes them from the accessibility tree (good!), but breaks the column count unless it\'s handled.',
							},
							{
								text: "**The CSS Grid conflict:** swapping in native `<table>` tags isn't a quick fix when the layout relies on CSS Grid. Grid overrides the display values the browser uses to size and align table columns, so a `<tr>` stops behaving like a table row.",
							},
						],
					},
				],
			},
			{
				heading: 'Technical Solutions',
				blocks: [
					{
						type: 'paragraph',
						text: 'Let\'s explore two main paths: going "Native" or going "Full ARIA."',
					},
					{
						type: 'heading',
						level: 3,
						text: '1. The Native Table (The "Pure" Way)',
					},
					{
						type: 'paragraph',
						text: 'We could use `<table>`, `<tr>`, and `<td>`.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: 'Pros: Browsers give you a lot for free (like column mapping).',
							},
							{
								text: 'Cons: It would break an existing mobile "overflow" trick and CSS Grid layout. A `<tr>` is a "Table Row Box," not a "Block Box," so it refuses to overflow its parent. It\'s very stubborn.',
							},
						],
					},
					{
						type: 'heading',
						level: 3,
						text: '2. The ARIA Role Approach (when the design can’t change)',
					},
					{
						type: 'paragraph',
						text: 'When there’s no time to change the current design, you can "annotate" the existing `<div>` structure with WAI-ARIA roles. This keeps the layout but gives screen readers the "map" they need, mimicking the native table relationships.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: 'Identify Everything: Use `role="table"`, `role="rowgroup"`, `role="row"`, and `role="cell"`.',
							},
							{
								text: 'Coordinate System: Use `aria-colindex` and `aria-rowindex`. What this gives us is that even if we hide "Column 2" on mobile, the reader will still say "Column 3 of 5," so the user doesn\'t feel lost in space.',
							},
							{
								text: 'The Triple-Link: Use `aria-labelledby` to point a data cell to its Column Header, Block Header, and Row Header IDs.',
							},
						],
					},
					{
						type: 'paragraph',
						text: 'Example: `<div role="cell" aria-labelledby="lite-plan pricing-limits leads-deals">2500</div>`',
					},
					{
						type: 'paragraph',
						text: 'And with this, the existing "broken" table could become great again! (...or as great as it gets as native tables are still the better option whenever you can use them.)',
					},
					{
						type: 'quote',
						quote: '“Accessibility is a reflection of respect and equality, not an optional extra.”',
						author: 'Debra Ruh',
					},
				],
			},
		],
	},
	{
		number: 6,
		title: 'ARIA Live Regions and Roles',
		summary:
			'In this bit we will see how we can make content changes “visible” for everyone. We will talk about ARIA live regions and roles. When to use what and how to politely announce changes to the user.',
		sections: [
			{
				heading: 'What are ARIA Live Regions and Roles?',
				blocks: [
					{
						type: 'paragraph',
						text: 'In accessible web design, Live Regions are areas of a page that update dynamically without a full page refresh. Think of them as the "interruption settings" for your website. We’ve all been there: you click a "Save" button, a little green toast pops up saying "Success!", and you go about your day. But for a screen reader user, if you haven\'t coded that toast correctly, that "Success!" message might as well be written in invisible ink. Screen reader users will not "notice" visual changes, so we must use ARIA to signal that an update has occurred.',
					},
					{
						type: 'heading',
						level: 3,
						text: 'The Semantic Roles (aka shortcuts)',
					},
					{
						type: 'paragraph',
						text: 'These are like the "Presets" on your microwave. You hit one button, and it knows exactly what to do.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '`role="alert"`: Should be used for important, very time-sensitive information. It is "assertive" (read annoying!), meaning it interrupts the screen reader\'s current task to announce the message *immediately*. Like literally mid sentence.',
							},
							{
								text: '`role="status"`: Should be used for less urgent information, like "Settings saved" or "Data updated." It is "polite," meaning it waits for the screen reader to finish its current sentence before announcing.',
							},
						],
					},
					{
						type: 'paragraph',
						text: 'There are also 3 other roles, which are more specific and less used (`log` , `marquee`, `timer`). We will describe them shortly in the technical part.',
					},
					{
						type: 'heading',
						level: 3,
						text: 'The Explicit Properties (aka m**anual controls)**',
					},
					{
						type: 'paragraph',
						text: "These are for the control freaks 😏 They let you DIY the interruption behavior if the presets don't quite fit your vibe.",
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '`aria-live`: Defines the priority of the announcement (`polite`, `assertive`, or `off`).',
							},
							{
								text: '`aria-atomic`: Determines if the screen reader should read the *entire* region when a change occurs (`true`) or only the specific part that changed (`false`).',
							},
						],
					},
				],
			},
			{
				heading: 'Why we need them?',
				blocks: [
					{
						type: 'paragraph',
						text: 'Standard HTML doesn\'t have a way to tell assistive technology, "Hey, this specific `<div>` just changed its text!" Imagine you’re ordering a pizza online. You give the site your card number, hit Pay, and then... silence. You don\'t know if the payment went through or maybe your connection hung and you will be feasting tonight instead of a nice dose of salami and cheese.',
					},
					{
						type: 'paragraph',
						text: 'We use these attributes to say, "Hey! Something changed over here, and you should probably know about it.". Without these attributes:',
					},
					{
						type: 'list',
						ordered: true,
						items: [
							{
								text: '**Users miss feedback:** A user might click "Submit," a small error message appears, but the screen reader stays silent.',
							},
							{
								text: '**Context is lost:** If only a number changes in a sentence like "You have 5 messages," the user might just hear "5" without knowing what it refers to.',
							},
						],
					},
				],
			},
			{
				heading: 'Common pitfalls',
				isIssues: true,
				blocks: [
					{ type: 'paragraph', text: 'Even when components have roles and live regions, the details often slip:' },
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Silent spinners:** a loading spinner without `role="status"`, `aria-live` or an accessible label gives screen reader users no hint that anything is loading.',
							},
							{
								text: '**Partial announcements:** an `aria-live="polite"` wrapper around a validation message, without `aria-atomic="true"`, may only announce the changed text node. For short messages, `aria-atomic="true"` makes sure the whole message is read.',
							},
						],
					},
				],
			},
			{
				heading: 'Technical Solutions: Roles vs. explicit ARIA',
				blocks: [
					{
						type: 'heading',
						level: 3,
						text: '1. The "Shorthand" Approach (Best Practice)',
					},
					{
						type: 'paragraph',
						text: "Most of the time, you don't need to overthink it. Use semantic roles and let the browser do the heavy lifting. They are cleaner and have built-in defaults that screen readers handle consistently.",
					},
					{
						type: 'list',
						ordered: true,
						items: [
							{
								text: '`role="alert"` > PANIC! > The building is on fire! Or at least your password is so wrong that I can not wait to tell you! (implies `assertive`)',
							},
							{
								text: '`role="status"` > Chill. > I\'ll tell you when I\'m done, no rush (implies `polite`)',
							},
						],
					},
					{
						type: 'paragraph',
						text: 'Three other possible roles act like specialized versions of status or alert. Using them provides more semantic "flavor" to the user:',
					},
					{
						type: 'list',
						ordered: true,
						items: [
							{
								text: '`role="log"` > New information is added to the end of the list, and old information stays visible. Screen readers generally only announce the *new* addition. When to use: Chat logs, messaging history, error logs, or game scores. Unlike `status`, which usually replaces the entire content, `log` implies a sequence of events.',
							},
							{
								text: '`role="marquee"` > Used for information that changes frequently or "scrolls" (like a stock ticker). Most screen readers are configured to be less "chatty" with marquees so they don\'t overwhelm the user. When to use: Scrolling news headlines or stock prices. Use this sparingly. If the info is important, `status` is safer.',
							},
							{
								text: '`role="timer"` > Identifies a numerical counter that indicates elapsed or remaining time. When to use: Stopwatches, countdown clocks, or "time remaining" in a game. By default, `timer` doesn\'t always announce every second (which would be annoying). You may need to pair it with `aria-live="polite"` if you want periodic updates.',
							},
						],
					},
					{
						type: 'code',
						code: '<div role="alert">Your session is about to expire.</div>',
					},
					{
						type: 'heading',
						level: 3,
						text: '2. The "Granular" Approach (Advanced)',
					},
					{
						type: 'paragraph',
						text: 'Sometimes the defaults are a bit too much. If `role="alert"` is a megaphone, explicit properties let you choose between a megaphone and a gentle tap on the shoulder. So use explicit properties when the default behavior of a role doesn\'t fit your needs.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '`aria-live="assertive"`: Interrupts whatever the screen reader is currently saying. Use sparingly unless it\'s a "your session is about to explode" situation (remember `role="alert"` )',
							},
							{
								text: '`aria-live="polite"`: Waits for a break in the conversation to inform you that "The data has arrived, sir." (remember `role="status"` )',
							},
							{
								text: 'Unintuitively `aria-live="off"` does not indicate that changes should *not* be announced. When an element has `aria-live="off"`, changes to the element\'s content are only supposed to be announced when focus is on, or inside, the element.',
							},
							{
								text: '`aria-atomic="true"`: The "All or Nothing." Tells the screen reader to read the *whole* container, even if only one letter changed. If this is false, it\'ll only read the new bit. So you could use `aria-atomic="false"` for example on live scoreboard, where you only want the user to hear the specific piece of data that changed, not the entire list.',
							},
							{
								text: '`aria-relevant`: The value is a space-separated list of change types, including `additions`, `removals`, and `text`, with a shorthand `all` meaning all three. It defaults to `additions text` . Use `removals` if you need to announce when something is *removed* from the DOM, but note that assistive technologies only need to be informed of content removal when its removal represents an *important* change.',
							},
						],
					},
					{
						type: 'code',
						code: '<div role="alert" aria-atomic="false">\n  <span>System Update:</span>\n  <span>Server rebooting in 5 minutes.</span>\n</div>',
					},
					{
						type: 'heading',
						level: 3,
						text: '3. Critical Implementation Rules',
					},
					{
						type: 'list',
						ordered: true,
						items: [
							{
								text: '**Presence is Key:** Screen readers are like cats; they don\'t like surprises. If you suddenly inject a `role="alert"` element into the DOM, they might ignore it. For the best compatibility, the element with the `role` or `aria-live` attribute should be present in the DOM *on page load*. Changing the role dynamically or injecting the entire element via JavaScript sometimes causes screen readers to miss the first announcement. Therefore it’s better to have an empty `div` with the role already on the page, and then shove your text into it later.',
							},
							{
								text: '**Don\'t Conflict:** Avoid setting `aria-live="polite"` on a `role="alert"`. It confuses the browser because the role says "Urgent!" while the property says "Wait your turn."',
							},
							{
								text: '**Keep it Brief:** Since `assertive` alerts interrupt the user, keep the text short and actionable.',
							},
							{
								text: "**But anyway, don't be a loudmouth:** If everything is an `alert`, then nothing is. If you use `assertive` for every minor detail, users will mute their screen reader and find a better site.",
							},
						],
					},
					{
						type: 'paragraph',
						text: 'In conclusion, start with `role="status"` (or `role="alert"` if really needed). Reach for `aria-live` and `aria-atomic` when you need to change how much of the region is read or exactly when the interruption happens.',
					},
					{
						type: 'quote',
						quote: '“Start by doing what’s necessary, then do what’s possible and suddenly you are doing the impossible.”',
						author: 'Francis of Assisi',
					},
				],
			},
		],
	},
	{
		number: 7,
		title: 'Using <aside> together with <nav> elements',
		summary:
			'Many pages carry a second set of navigation next to the main menu, such as a Table of Contents linking to the sections of a long article. Is it the same kind of navigation as the main menu? To find out, continue reading.',
		sections: [
			{
				heading: 'What are <aside> and <nav>?',
				blocks: [
					{
						type: 'paragraph',
						text: 'In the world of semantic HTML, tags do more than just style content—they describe its purpose to both machines and humans. Think of them as the "adults in the room" compared to the generic `<div>`.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**`<aside>`**: Defines content that is remotely related to the content around it. Think of it as a sidebar or a "callout" box. Programmatically, it serves as a *complementary* landmark.',
							},
							{
								text: '**`<nav>`:** Identifies a section of the page that contains navigation links, such as menus, tables of contents, or breadcrumbs. This serves as a *navigation* landmark. It’s the GPS of your document.',
							},
						],
					},
					{
						type: 'paragraph',
						text: 'While both are landmarks elements that help structure a page, they have different personalities.',
					},
					{
						type: 'heading',
						level: 3,
						text: 'How are they similar?',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Assistive Technology Visibility:** Both elements automatically create "Landmarks" in the Accessibility Tree. This allows screen reader users to use shortcut keys to jump quickly between sections..',
							},
							{
								text: '**Structural Purpose:** Both are used to group related content together, moving away from "div-soup" (generic `<div>` containers) and toward a readable document structure.',
							},
							{
								text: '**Non-Essential to Flow:** Usually, if you deleted both, the "Main" content of the page would still make sense. They are the side dishes, not the main course.',
							},
						],
					},
					{
						type: 'heading',
						level: 3,
						text: 'How are they different?',
					},
					{
						type: 'paragraph',
						text: 'The primary difference lies in *intent*. One describes *what the content is about* (Relationship), while the other describes *what the content does* (Function): So essentially the difference is all about intent vs. function:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**`<aside>`:** It’s the relational one. Its job is to provide "extra info" (role="complementary"). It says: "By the way, here’s something related." It is also recommended to be labeled if it contains a unique section.',
							},
							{
								text: '**`<nav>`:** It’s the functional one. Its job is to provide links (role="navigation"). It says: "Here is how you get out of here." It **must** be labeled if multiple navigation elements exist on page.',
							},
						],
					},
				],
			},
			{
				heading: 'Why we need them?',
				blocks: [
					{
						type: 'list',
						ordered: true,
						items: [
							{
								text: '**Assistive Technology Navigation:** Screen reader users don’t just read top-to-bottom (who has the time for that?). Using these tags allows them to jump directly to the "Sidebar" or "Main Menu" without tabbing through x number of links.',
							},
							{
								text: "**SEO & Indexing:** Search engines are judgmental. Links inside a `<nav>` are recognized as part of your site's skeleton, while content in an `<aside>` is flagged as secondary, helping your actual main content shine.",
							},
							{
								text: '**Future-Proofing:** As your DOM grows into being even more beautiful, but complex, semantic landmarks keep the accessibility tree from becoming a nightmare.',
							},
						],
					},
				],
			},
			{
				heading: 'Common pitfalls',
				isIssues: true,
				blocks: [
					{
						type: 'paragraph',
						text: 'A Table of Contents beside an article is a classic case. It is often wrapped in a generic `<div>` column. That works, but it’s a bit like labelling a jar "Stuff": technically true, but not very helpful.',
					},
					{ type: 'paragraph', text: '**1. Why `<aside>` is the correct choice**' },
					{
						type: 'paragraph',
						text: "The `<aside>` element is intended for content that is remotely related to the main content. A TOC helps users navigate the article but isn't part of its body, so it fits perfectly.",
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Accessibility:** Screen readers recognize `<aside>` as a landmark, making it easier for users to jump to the navigation.',
							},
							{ text: '**SEO:** It tells Google, "This is the map, not the treasure."' },
						],
					},
					{ type: 'paragraph', text: '**2. Recommended HTML structure**' },
					{ type: 'paragraph', text: 'Instead of a generic wrapper like this:' },
					{ type: 'code', code: '<div class="toc">\n  <nav aria-label="Topics">\n    ...\n  </nav>\n</div>' },
					{ type: 'paragraph', text: 'Make the outer wrapper an `<aside>` and keep the inner `<nav>`:' },
					{
						type: 'code',
						code: '<aside class="toc" aria-labelledby="toc-heading">\n  <span id="toc-heading">Topics</span>\n\n  <nav aria-label="Table of Contents">\n    <ul>\n      <li><a href="#key-takeaways">Key takeaways</a></li>\n    </ul>\n  </nav>\n</aside>',
					},
					{
						type: 'paragraph',
						text: '*Note: Adding `aria-labelledby` means a screen reader announces "Topics, complementary" when entering the area, instead of leaving the user guessing.*',
					},
				],
			},
			{
				heading: 'Technical Solutions',
				blocks: [
					{
						type: 'paragraph',
						text: 'In modern layouts with a sidebar, such as an article with a table of contents, `<aside>` and `<nav>` often work together, just like in the improved TOC above.',
					},
					{
						type: 'paragraph',
						text: 'When we have a sidebar that contains links to other pages, we use both.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: 'The `<aside>` tells the browser: "This whole area is secondary to the main page content."',
							},
							{
								text: 'The `<nav>` inside it tells the browser: "The specific purpose of this content is to help the user navigate to other parts of the page or site."',
							},
						],
					},
					{
						type: 'paragraph',
						text: 'When building a layout like this, adopt these industry-standard patterns:',
					},
					{
						type: 'paragraph',
						text: '**1. The Unique Label Rule** - If you have multiple `<nav>` elements, you **must** label them. Otherwise, a screen reader user sees a list of "navigation, navigation, navigation," which is about as helpful as a door with no handle.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**How:** Use `aria-label` to provide a clear, concise name.',
							},
							{
								text: '**Tip**: Don\'t use the word "navigation" in your label. The screen reader already says it. `aria-label="Main navigation"` is announced as *"Main navigation navigation."* (And nobody likes a stuttering bot).',
							},
						],
					},
					{
						type: 'code',
						code: '<nav aria-label="Main"> ... </nav>\n...\n<aside>\n  <nav aria-label="On this page"> ... </nav>\n</aside>',
					},
					{
						type: 'paragraph',
						text: '**2. Nested Navigations** - A sidebar with its own links, such as a table of contents, typically has a `<nav>` inside an `<aside>`.',
					},
					{
						type: 'paragraph',
						text: 'The `<aside>` should act as the high-level container (Complementary Landmark), and the `<nav>` inside it should specifically wrap the list of links.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Aside**: "I am in a sidebar."',
							},
							{
								text: '**Nav**: "I am navigating the table of contents."',
							},
						],
					},
					{
						type: 'paragraph',
						text: 'It is good practice to also add heading within your `<aside>`. Use `aria-labelledby` to link the aside to its own title. This ensures the name of the sidebar in the landmark list matches the visual text on the screen.',
					},
					{
						type: 'code',
						code: '<aside aria-labelledby="sidebar-title">\n  <h2 id="sidebar-title">On this page</h2>\n  <nav aria-label="Table of contents">\n    <ul>...</ul>\n  </nav>\n</aside>',
					},
					{
						type: 'paragraph',
						text: '**3. Placement and source order**',
					},
					{
						type: 'paragraph',
						text: 'The order of your tags in the HTML is the "highway" for keyboard users. There are two potential strategies for a page with a sidebar:',
					},
					{
						type: 'paragraph',
						text: '**Strategy A: The "Content First" Pattern:**',
					},
					{
						type: 'paragraph',
						text: 'If the primary goal of the page is for the user to read a specific article, the `<main>` content should come **before** the `<aside>` in the HTML.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Order:** `Header` → `Main` → `Aside` → `Footer`.',
							},
							{
								text: '**Why:** Users get the content they actually clicked on immediately.',
							},
							{
								text: '**Mobile Benefit:** On small screens, the sidebar naturally stacks *below* the content, which is the standard mobile UX.',
							},
							{
								text: '**Skip Links:** Technically optional for the sidebar.',
							},
						],
					},
					{
						type: 'paragraph',
						text: '**Strategy B: The "Navigation First" Pattern:**',
					},
					{
						type: 'paragraph',
						text: 'If the sidebar is a critical navigation tool (like a category tree) that users will use frequently to jump between pages, it should come **before** the `<main>` content.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Order:** `Header` → `Aside (Nav)` → `Main` → `Footer`.',
							},
							{
								text: '**Why:** It treats the sidebar as a primary interface tool.',
							},
							{
								text: '**The Mandatory Requirement:** If you use this order, you **must** include a skip link at the very top of your `<body>` , e.g. together with the skip link for main content.',
							},
						],
					},
					{
						type: 'paragraph',
						text: '**The Golden Question:** "Is the sidebar more important than the main content?" If yes, put it first. If no, let the content lead!',
					},
					{
						type: 'quote',
						quote: '“Always think: Who is in this room? Whose voices are heard? Whose voices are missing? Why?”',
						author: 'Per Axbom',
					},
				],
			},
		],
	},
	{
		number: 8,
		title: 'Accessible tooltips',
		summary:
			"In the land of UI components, tooltips are often treated as an afterthought—a tiny bubble for a tiny bit of text. But when that “tiny” text holds important information about your app or its features, accessibility isn't optional. If your helpful hint is a secret to anyone not using a mouse, you’re doing it wrong. Let’s talk about making tooltips accessible for everyone.",
		sections: [
			{
				heading: 'What are accessible tooltips?',
				blocks: [
					{
						type: 'paragraph',
						text: 'An accessible tooltip is more than just a visual "ooh, look, a bubble!" moment. It’s a programmatic bridge between an element and its description. It is specifically designed to be perceivable and operable by all users—including those using screen readers or keyboard-only navigation.',
					},
					{
						type: 'paragraph',
						text: 'In the world of accessibility, a tooltip isn\'t just a "pretty face." While a sighted mouse user gets a helpful hint, an accessible tooltip ensures a screen-reader user *hears* it and a keyboard navigator can actually *trigger* it without losing their place on the page. If it’s only visible to a mouse user, it’s not a tooltip—it’s a secret.',
					},
				],
			},
			{
				heading: 'Why we need them?',
				blocks: [
					{
						type: 'paragraph',
						text: 'Without accessibility in mind, tooltips often become "ghost content"—visible to some but non-existent to others. We need accessible tooltips to:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Bridge the Information Gap:** Modern UIs love "mystery meat" navigation (looking at you, icon-only buttons). Tooltips provide the mandatory translation for assistive technology.',
							},
							{
								text: "**Keyboard Equality:** Standard tooltips usually only care about `hover`. We need to make sure `Tab` focus gets the same VIP treatment so keyboard users aren't left in the dark.",
							},
						],
					},
				],
			},
			{
				heading: 'Common pitfalls',
				isIssues: true,
				blocks: [
					{ type: 'paragraph', text: 'Tooltips tend to break in the same few ways:' },
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Unreachable trigger:** a wrapper `div` without `tabIndex` never receives keyboard focus, so the tooltip content is out of reach.',
							},
							{
								text: '**The "Portal" black hole:** content rendered via `createPortal` into `document.body` has no programmatic link to its trigger. Screen readers see two strangers who never met.',
							},
							{
								text: "**Ghosting the keyboard:** without `onFocus`, `onBlur` and `onKeyDown` listeners, you can't open the tooltip with `Tab` or dismiss it with `Escape`.",
							},
							{
								text: '**"Catch me if you can" dismissal:** hiding instantly on `mouseLeave` makes the tooltip vanish like a mirage when users move the cursor *to* it to read or copy the text.',
							},
						],
					},
				],
			},
			{
				heading: 'Technical Solutions',
				blocks: [
					{
						type: 'paragraph',
						text: 'To hit the [WCAG 2.1 Success Criterion 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html) (the fancy way of saying "don\'t break the UI on hover"), the code has to go from "just CSS" to "actually smart."',
					},
					{
						type: 'heading',
						level: 3,
						text: '1. Programmatic association',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '`aria-describedby`: Link the trigger to the tooltip via a unique ID. Now, screen readers announce the description immediately after the element’s name.',
							},
							{
								text: '**The hidden twin strategy:** Since portalled bubbles are hard for screen readers to track, introduce a visually hidden `div` inside the trigger.',
								sublist: {
									type: 'list',
									ordered: false,
									items: [
										{
											text: '`useId()` generates a stable ID for the hidden copy, linking the trigger to this hidden `div` via `aria-describedby`',
										},
										{
											text: '**Portal isolation:** give the visual bubble `aria-hidden="true"` so screen readers don\'t get stuck in a "double-announcement" loop.',
										},
									],
								},
							},
						],
					},
					{
						type: 'paragraph',
						text: 'You could also use `role="tooltip"` on the container. This tells the browser exactly what this element’s function is in the accessibility tree.',
					},
					{
						type: 'heading',
						level: 3,
						text: '2. Making it "sticky"',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Dismissible:** Users can hit `Escape` to kill the tooltip without losing their place.',
							},
							{
								text: '**The 300 ms grace period:** To fix the vanishing act, you can add a hover delay. On `mouseLeave`, a timer starts. If you move your mouse back or into the bubble within 300ms, you clear the timer. This allows the cursor to pass through the "dead zone" between the trigger and the bubble without the content disappearing. No more chasing bubbles!',
							},
							{
								text: '**Persistent:** It stays visible until the user *explicitly* decides it’s time to go. You can tab to the tooltip and it will disappear either when you tab away or when you decide to dismiss it with `Esc`.',
							},
						],
					},
					{
						type: 'heading',
						level: 3,
						text: '3. Keyboard & focus management',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Dual-triggering:** Tooltips should listen for both the mouse (`mouseenter`) and the keyboard (`focus`).',
							},
							{
								text: '`tabIndex={0}`: Apply this to all triggers. Whether it’s a hover or click tooltip, it’s now officially on the "Tab Highway."',
							},
							{
								text: '**Strict non-interactivity:** A tooltip is for *reading*, not *doing*. If you need a link or a button inside that popup, it’s a dialog and those handle focus trapping differently.',
							},
							{
								text: '**Global overrides:** Add `handleKeyDown` to support the `Escape` key for immediate dismissal and `Enter`/`Space` for reopening.',
							},
						],
					},
					{
						type: 'paragraph',
						text: '**Bottom line:** If your tooltip disappears like a shy ghost or ignores the keyboard entirely, it’s not helping—it’s haunting. Let’s keep our UI helpful, reachable, and ghost-free 👻🚫 It’s a small component, but a huge leap in making the web more inclusive, one `tabIndex` at a time.',
					},
					{
						type: 'quote',
						quote: '“Inclusion isn’t just inviting someone to sit at your table. It’s believing they belong there.”',
						author: 'Mia Carella',
					},
				],
			},
		],
	},
	{
		number: 9,
		title: 'Accessible forms',
		summary:
			"Accessibility isn't a feature, it’s the infrastructure. For forms, it's the difference between a clear path and a dead end. And in case a form lives inside a modal, the complexity doubles: we aren’t just managing inputs, we’re managing a tiny, floating sub-universe.",
		sections: [
			{
				heading: 'What are accessible forms?',
				blocks: [
					{
						type: 'paragraph',
						text: 'An accessible form is a predictable, machine-readable interface that allows everyone to input, review, and submit data without wanting to throw their keyboard out a window. It’s built on three pillars:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Semantic integrity:** Every input is legally married to a permanent label. No "situationships" or vague placeholders allowed.',
							},
							{
								text: '**Navigational predictability:** The `Tab` key should move like a chess grandmaster—logical, sequential, and always visible.',
							},
							{
								text: '**Actionable feedback:** The form actually talks back. It tells you what’s required, what’s broken, and when you’ve successfully crossed the finish line.',
							},
						],
					},
				],
			},
			{
				heading: 'Why we need them?',
				blocks: [
					{
						type: 'paragraph',
						text: "Forms are often the most cognitively and visually complex parts of a website. Making them accessible doesn't just check a compliance box, it fundamentally improves the experience for a wide range of users.",
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Cognitive clarity:** Clear instructions mean users with cognitive disabilities don\'t have to play "Guess the Input." This includes logical layout structures, clear instructions, and immediate feedback.',
							},
							{
								text: '**Voice command support:** If I’m shouting "Next Field" at my computer, the code needs to know what "Next" actually means. People using speech input rely on programmatically linked labels to activate controls and move focus to specific fields via voice commands.',
							},
							{
								text: '**Improved hit targets:** Ever tried to click a tiny checkbox with a shaky hand or a trackpad on a bumpy bus? Larger, label-linked clickable areas are a godsend for dexterity.',
							},
							{
								text: "**Screen reader harmony:** Assistive tech users shouldn't have to solve a riddle to figure out which field they’re typing in. They depend on structural elements like labels and fieldsets to identify and understand the purpose of each control in the context of the form.",
							},
							{
								text: '**Universal usability:** Ultimately, an accessible form is a more usable form for everyone. Because frankly, even "power users" hate bad forms.',
							},
						],
					},
				],
			},
			{
				heading: 'Common pitfalls',
				isIssues: true,
				blocks: [
					{ type: 'paragraph', text: 'Forms, also inside modals, tend to share the same barriers:' },
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**The silent treatment:** errors are visible, but without `aria-describedby` screen reader users hear "invalid" and not the "why."',
							},
							{ text: '**Messy IDs:** IDs with whitespace (a coding sin) and implicit labels that some screen readers ignore.' },
							{ text: '**Redundant noise:** decorative icons and images get announced as "Image, Image, Image."' },
							{
								text: '**No focus guidance:** after a failed submit, focus stays on the button, and users have to navigate back to find which field failed.',
							},
							{ text: '**Grudge-holding errors:** `aria-invalid="true"` stays on after the user has fixed the value.' },
							{
								text: '**No browser assistance:** missing `autocomplete` and `required` attributes block autofill and native validation.',
							},
						],
					},
				],
			},
			{
				heading: 'Technical Solutions',
				blocks: [
					{
						type: 'heading',
						level: 3,
						text: '1. Modal "golden rules"',
					},
					{
						type: 'paragraph',
						text: 'When forms live in modals, the container must act as a "mini-application" to prevent user disorientation.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Focus trap:** Use a focus trap to ensure `Tab` and `Shift+Tab` cycle exclusively within the modal. Users should never accidentally "leak" focus into the background page.',
							},
							{
								text: '**Role & labeling:** Apply `role="dialog"` and `aria-modal="true"`. It tells the browser, "Pay attention to me now."',
							},
							{
								text: '**Initial focus:** Upon opening, move focus to the first interactive element (usually the first input).',
							},
							{
								text: '**The great return:** The `Esc` key must trigger the close function. When the modal closes, we need to put the user back exactly where they started. It’s only polite.',
							},
						],
					},
					{
						type: 'heading',
						level: 3,
						text: '2. Form input requirements',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Explicit labels:** Avoid relying on `placeholder` text, which disappears when typing. Use `<label for="id">` for long-term commitment.',
							},
							{
								text: '**Visible focus:** Maintain a high-contrast focus ring. Never use `outline: none` without a robust custom replacement.',
							},
							{
								text: "**Grouping:** Use `<fieldset>` and `<legend>` for related inputs so screen readers announce the group's context.",
							},
						],
					},
					{
						type: 'heading',
						level: 3,
						text: '3. Autocomplete & personalization',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Identify input purpose:** Use the `autocomplete` attribute for standard fields (e.g., `autocomplete="email"`, `autocomplete="given-name"`, `autocomplete="new-password"`).',
							},
							{
								text: "**Benefits:** We let the browser do the heavy lifting. Our users' fingers will thank us.",
							},
						],
					},
					{
						type: 'heading',
						level: 3,
						text: '4. Handling "required" fields',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**The native way:** Use the HTML5 `required` attribute. It’s robust, simple, and the browser handles the basic nagging for us. (But for custom components that don\'t support native attributes, use `aria-required="true"`.)',
							},
							{
								text: '**Visual cues:** Don’t just use color (red is for danger, but not everyone sees red). Use the classic `*` or `(required)` text.',
							},
						],
					},
					{
						type: 'heading',
						level: 3,
						text: '5. Logic & flow',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Tab order:** If it looks like it’s next, it should be next in the DOM. Simple.',
							},
							{
								text: '**Intentional submission:** No "surprise submissions." A form should only submit when a user explicitly hits a button—never just because they finished a field.',
							},
						],
					},
					{
						type: 'paragraph',
						text: '**Bottom line:** A form that everyone can use is a form that actually gets filled out. Let’s keep the barriers in the obstacle courses, not in your signup flows.',
					},
					{
						type: 'quote',
						quote: '“Compliance is a checkbox. Inclusion is a mindset. If your goal is meeting the standards, you are not truly accessible or inclusive”',
						author: 'Sheri Byrne-Haber',
					},
				],
			},
		],
	},
	{
		number: 10,
		title: 'Accessible graphical elements',
		summary:
			'The first thing people usually think when they hear the term “accessibility” is: *“Yes, I know what it is! It’s those image alt texts right?”*. On one hand this is cool because, there is at least *something* related to accessibility, that has been talked about so much that people kind of know it already by heart. On the other hand, it is insidious, as it will give false impression there is not really much more to accessibility than slapping some alt text on images and we are good to go. Also it is not that widespread knowledge that not *all* images actually need alt text filled to begin with. Let’s talk about how we should actually make graphical elements accessible, informative and not annoying.',
		sections: [
			{
				heading: 'What are accessible graphical elements?',
				blocks: [
					{
						type: 'paragraph',
						text: 'Accessible images and (other) graphics are visual elements designed and coded so that *everyone,* including people with visual, cognitive, or motor impairments, can actually tell what’s going on.',
					},
					{
						type: 'paragraph',
						text: 'It’s more than just slapping `alt="dog"` on a photo and calling it a day. It’s about intent. For example:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Informative images:** Photos or illustrations that actually tell a story or show data. (Pro tip: Putting text *inside* an image is a classic anti-pattern - avoid if possible).',
							},
							{
								text: '**Decorative elements:** Background swirls, blobs, and "pretty things" that look great but don’t add a single bit of info.',
							},
							{
								text: '**Functional graphics:** The workers of the web, e.g. icons or buttons (like the "magnifying glass" or the "Close X") that actually *do* something when clicked. They *perform an action*.',
							},
							{
								text: '**Complex graphics:** Charts, infographics, and maps—basically the images that need a "TL;DR" description.',
							},
						],
					},
				],
			},
			{
				heading: 'Why we need them?',
				blocks: [
					{
						type: 'paragraph',
						text: 'While ensuring everyone can use the web is the right thing to do, accessible graphics also offer technical and business value:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**SEO & AI discovery:** Google’s bots and the new wave of AI "answer engines" can’t "see" our beautiful UI. They read code. Proper alt text lets them index the features, so the product shows up when someone asks, "What does a sales pipeline look like?"',
							},
							{
								text: '**Technical resilience:** Images fail. CDNs have bad days and hotel Wi-Fi is a nightmare. When images fail to load, alt text is the ultimate safety net. It ensures the user doesn’t see a "broken" box, but the context they actually came for.',
							},
							{
								text: '**Improved user experience:** For screen reader users, a page without alt text is like watching a movie with the sound off. Without them, a user hears "Image_04.jpg" (thrilling!). With them, they hear "Sales forecast report view." It turns a "silent" page into a narrative by removing the guesswork and allowing users with visual impairments to navigate our web with the same speed and confidence as sighted users.',
							},
							{
								text: '**Clean, maintainable code:** Following accessibility standards forces us to use structured HTML and semantic ARIA roles. This results in a cleaner codebase that is easier for the team to test, automate, and scale. Using `aria-label` or `role="img"` gives us stable hooks to grab onto, making tests less brittle than selecting for example by CSS classes that might change.',
							},
						],
					},
				],
			},
			{
				heading: 'Common pitfalls',
				isIssues: true,
				blocks: [
					{
						type: 'paragraph',
						text: 'Most sites have moved past missing alt text. The harder part is going from "it exists" to "it’s actually helpful":',
					},
					{
						type: 'list',
						ordered: true,
						items: [
							{
								text: '**Literal instead of functional:** describe what an image *does*, not what it *is*. A logo linking to an award article shouldn\'t say "Software Advice Front Runners logo" but "Read the Software Advice Front Runners award article."',
							},
							{
								text: '**Noisy decorative icons:** screen readers don\'t need to hear every decorative checkmark. Add `aria-hidden="true"` to the "visual sugar" so users get to the content faster.',
							},
							{
								text: '**Broken relationships:** a rating badge reads "5 of 5", but the logo beside it has no alt text, so users don\'t know *who* gave the rating, and the decorative star icons add clutter. Give the logo an alt text like `alt="Acme Reviews rating:"` and hide the stars, and it reads *"Acme Reviews rating: 5 of 5."*',
							},
						],
					},
				],
			},
			{
				heading: 'Technical Solutions',
				blocks: [
					{
						type: 'paragraph',
						text: 'How to handle graphics like a pro:',
					},
					{
						type: 'paragraph',
						text: '**1. Standard images (`<img>` tag)**',
					},
					{
						type: 'paragraph',
						text: "The `alt` attribute is *mandatory* for all `<img>` tags, but its content depends on the image's purpose. E.g. what's inside depends on why it's there:",
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Informative:** Use a concise description that conveys the *intent* of the image and remember that alternative content needs to be meaningful and descriptive (keep it under 250 characters). Make sure you avoid phrases like “image of” or “graphic of” to describe an image. A screen reader already tells the user this information. Just get to the point.',
							},
						],
					},
					{
						type: 'code',
						code: '<img src="dashboard.png" alt="Acme sales pipeline showing three deals in the Negotiation stage.">',
					},
					{
						type: 'paragraph',
						text: 'Also there is a general rule that you should try to avoid adding images with actual informative text content on them. If this information is valuable for the sighted user, it will be valuable to everyone. If the design really needs something like this, then image alt text needs to include the same information.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Decorative:** Purely aesthetic flourishes must be hidden from assistive tech using a "null" alt attribute to avoid cluttering the experience. So use `alt=""`. This is a "do not disturb" sign for screen readers.',
							},
						],
					},
					{
						type: 'code',
						code: '<img src="blue-swirl.png" alt="">',
					},
					{
						type: 'paragraph',
						text: 'PS! An empty/null alternative text attribute *is not the same* as a missing alternative text attribute! If the alternative text attribute is missing, assistive technology might read out the file name or surrounding content in an attempt to give the user more information about the image.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Redundant:** If the text right next to the image already explains it, use `alt=""` to avoid being that person who repeats themselves.',
							},
						],
					},
					{
						type: 'paragraph',
						text: '**2. Functional icons**',
					},
					{
						type: 'paragraph',
						text: 'If an icon is a button, describe the *action.*',
					},
					{
						type: 'code',
						code: '<button aria-label="Delete Deal"><i class="icon-trash"></i></button>',
					},
					{
						type: 'paragraph',
						text: 'Because hearing "trash can" is less helpful than hearing "delete".',
					},
					{
						type: 'paragraph',
						text: '**3. Standalone SVGs** You have two paths here, choose wisely:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Using the <img> tag:** For basic, uncomplicated, or decorative images, use the `<img>` tag and reference the SVG as a file. This pattern should render lighter and faster on pages overall (versus inline SVGs)',
							},
						],
					},
					{
						type: 'code',
						code: '<img class="lightbulb" alt="Lightbulb moment!" src="lightbulb.svg">',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Using the <svg> tag:** For more complex or essential SVGs, you should consider adding the SVG as markup into the HTML. Although adding the SVG into the markup makes the page potentially heavier and slower, you have more options with JavaScript and CSS to manipulate the styles and animations of the images.',
							},
						],
					},
					{
						type: 'paragraph',
						text: 'There are a few patterns you could use with SVGs by adding various additional attributes like `role` , `title` , `description` , `aria-decribedby` etc. Different assistive technology and browsers “read” and understand those values also differently though. This of course doesn’t make life any easier for the developers. There have been some testing done on the subject and to be on the safe side you could use this pattern: `<svg> + role="img" + <title> + <desc> + aria-labelledby="[ID]"` It’s a bit more code, but it’s the most reliable way to make sure different browsers don\'t get confused.',
					},
					{
						type: 'paragraph',
						text: '**4. Visual & UX standards**',
					},
					{
						type: 'paragraph',
						text: 'We can not forget the following general accessibility standards, while dealing with images:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Contrast:** All UI icons and meaningful graphical elements must maintain a minimum 3:1 contrast ratio against the background. If it’s too faint to see, it might as well not be there.',
							},
							{
								text: '**Non-color indicators:** Never rely on color alone to convey status. If a "Hot Lead" is indicated by a red dot, ensure there is also a text label or a specific shape (e.g., a flame icon) so color-blind users can distinguish it.',
							},
							{
								text: '**Hit targets:** All interactive graphics should have a minimum tap area of 24x24 pixels to accommodate users with motor impairments. But even better would be 44x44 pixels to meet the AAA standard.',
							},
						],
					},
					{
						type: 'paragraph',
						text: '**5. Complex Data (think of charts & infographics)**',
					},
					{
						type: 'paragraph',
						text: "If you’re showing a complex chart, don't try to cram 50 data points into alt text. Use a summary + link approach:",
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: 'Provide a high-level summary in the `alt` text.',
							},
							{
								text: 'Provide a link to a full data table or a text description right below it.',
							},
						],
					},
					{
						type: 'quote',
						quote: '“Accessible design is good design”',
						author: 'Steve Ballmer',
					},
				],
			},
		],
	},
	{
		number: 11,
		title: 'Accessible names',
		summary:
			'In the last post we talked about adding accessible image descriptions. Those were basically accessible names for images. But images are not the only elements, which need accessible names. In this post we will do a deeper dive into what exactly are accessible names, where they come from and do we always need to explicitly add them.',
		sections: [
			{
				heading: 'What is accessible name?',
				blocks: [
					{
						type: 'paragraph',
						text: 'Think of an accessible name as an element’s ID badge. Without it, the element is just a nameless stranger lurking on the DOM. The W3C defines two distinct layers of communication:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Accessible name:** The short, punchy label. It answers the question: *"What is this?"* (e.g., "Submit" or "Menu")',
							},
							{
								text: '**Accessible description:** An optional, longer string that provides additional context or instructions. It answers the question: *"How do I use this?"* or *"What are the requirements?"* (e.g., "Password must be at least 8 characters").',
							},
						],
					},
					{
						type: 'paragraph',
						text: '**The Core Purpose:**',
					},
					{
						type: 'list',
						ordered: true,
						items: [
							{
								text: '**Convey intent:** Ensure the user understands the purpose of the element. So basically the user should know if they’re clicking "Save" or "Delete the entire Database."',
							},
							{
								text: '**Distinguishability:** If you have five "Edit" buttons on a page, the accessible name is the only thing keeping a screen reader user from playing "Button Roulette."',
							},
						],
					},
				],
			},
			{
				heading: 'Why we need them?',
				blocks: [
					{
						type: 'paragraph',
						text: 'Beyond just "helping users," there are strict technical requirements:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: "**The law of the web:** WCAG and ARIA specs aren't optional; they require *all* interactive elements to have a name. No name = broken experience.",
							},
							{
								text: "**Beyond interactions:** It’s not just for buttons. Dialogs, tables, and landmarks (like `<nav>`) need names so users don't get lost in the digital wilderness.",
							},
							{
								text: '**Voice control:** Users who navigate by shouting at their computers (voice commands) rely on the accessible name matching the visible text. If they say "Click Login" and your hidden label says "Enter," nothing happens. Awkward.',
							},
						],
					},
				],
			},
			{
				heading: 'Technical Solutions',
				blocks: [
					{
						type: 'paragraph',
						text: "**Composition aka don't be a chatterbox**",
					},
					{
						type: 'paragraph',
						text: 'For assistive technology users, especially screen reader users, the quality of accessible names is one of the most significant contributors to usability. A bad name is a productivity killer.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Too short:** "Button 1" (Useless).',
							},
							{
								text: '**Too long:** "The blue button that you should probably click if you want to save your work before the session expires" (Exhausting).',
							},
							{
								text: '**Just right:** "Save changes."',
							},
						],
					},
					{
						type: 'paragraph',
						text: '**Accessible name guidance by Role**',
					},
					{
						type: 'paragraph',
						text: 'Certain elements always require a name, others may usually or sometimes require a name, and still others should never be named. You can find a comprehensive table, which lists all ARIA roles and when naming is required, in the [accessible name guidance by role](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/#accessiblenameguidancebyrole) section of the ARIA Authoring Practices Guide.',
					},
					{
						type: 'paragraph',
						text: '**How names are derived**',
					},
					{
						type: 'paragraph',
						text: 'Browsers use the Accessible Name and Description Computation (AccName) algorithm. They look for names in a specific strict order of precedence:',
					},
					{
						type: 'list',
						ordered: true,
						items: [
							{
								text: '`aria-labelledby`: The CEO. References other elements by ID.',
							},
							{
								text: '`aria-label`: The Manager. A string you write directly on the element.',
							},
							{
								text: 'Native HTML labels: The reliable staff. `<label>`, `<legend>`, or `<caption>`.',
							},
							{
								text: 'Content naming: The "last man standing." Text sitting inside the tags.',
							},
							{
								text: 'Fallback attributes: The `title` and `placeholder` attributes - unreliable and should only be used as a last resort.',
							},
						],
					},
					{
						type: 'paragraph',
						text: 'To implement accessible names correctly, developers should follow these rules:',
					},
					{
						type: 'paragraph',
						text: '**1. Prefer visible text**',
					},
					{
						type: 'paragraph',
						text: 'If there is text on the screen that describes the element, use it! This simplifies maintenance and ensures that what a sighted user sees matches what a screen reader user hears.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: 'Technique: Use `aria-labelledby` to point to a nearby heading or text block.',
							},
						],
					},
					{
						type: 'paragraph',
						text: '**2. Prefer native HTML techniques**',
					},
					{
						type: 'paragraph',
						text: "Always reach for native HTML before ARIA. ARIA is a power tool. Don't use it if a screwdriver (native HTML) will do.",
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: 'Naming form controls: Use the `<label>` element.',
							},
							{
								text: 'Naming fieldsets: Use the `<legend>` element.',
							},
							{
								text: 'Naming tables/figures: Use the `<caption>` or `<figcaption>` elements.',
							},
						],
					},
					{
						type: 'paragraph',
						text: '**3. Using ARIA when content is insufficient**',
					},
					{
						type: 'paragraph',
						text: 'Use `aria-label` when an element has no visible text (like an icon button) or when the visible text is ambiguous.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '*Warning:* Using `aria-label` on an element with internal text will *hide that internal text* for screen readers. It replaces *everything*. Use with caution!',
							},
						],
					},
					{
						type: 'paragraph',
						text: '**4. Describing with `aria-describedby`**',
					},
					{
						type: 'paragraph',
						text: 'Don\'t cram instructions into the name. Use `aria-describedby` to link to help text so the screen reader knows it’s "extra info," not the primary label.',
					},
					{
						type: 'paragraph',
						text: '**Here’s the technical summary table**',
					},
					{
						type: 'table',
						header: ['Requirement', 'Recommended Technique'],
						rows: [
							['Simple button', 'Child text: `<button>Save</button>`'],
							['Icon-only button', '`aria-label="Close"`'],
							['Complex widget', '`aria-labelledby="<ID-of-visible-title>"`'],
							['Input instructions', '`aria-describedby="<ID-of-help-text>"`'],
						],
					},
					{
						type: 'paragraph',
						text: "**Pro-Tip:** Accessibility isn't a one-and-done task. Any time you touch code, check you haven't turned a button into a nameless void. Don't guess: open Chrome DevTools, go to the Accessibility tab and look at the Computed Properties. If the \"Name\" field is empty, there's work to do.",
					},
					{
						type: 'quote',
						quote: '“Accessibility is not a problem to be solved. It is a culture to be built.”',
						author: 'Sheri Byrne-Haber',
					},
				],
			},
		],
	},
	{
		number: 12,
		title: 'Stable component semantics',
		summary:
			'When we build responsive websites, we often spend hours ensuring that layout grids bend, text reflows fluidly, and images scale gracefully. But there is a silent, invisible layer of the user experience that often breaks when a screen shrinks: *semantic consistency*. If a component acts as a tab list on a desktop browser, it should not magically transform into an application menu when viewed on a phone. (Spoiler alert: Elements do not actually like identity crises). This post breaks down why keeping ARIA roles and semantic HTML synchronized across all device layouts is vital for an accessible web.',
		sections: [
			{
				heading: 'What is Accessibility Tree?',
				blocks: [
					{
						type: 'paragraph',
						text: 'To understand why consistency matters, we have to look under the hood of how browsers and assistive technologies interact.',
					},
					{
						type: 'paragraph',
						text: 'When a browser loads a webpage, it parses the HTML to create the Document Object Model (DOM). Simultaneously, it builds a secondary blueprint called the *Accessibility Tree*. This tree strips away layout wrappers, fancy CSS styles, and presentation noise, leaving behind *only* the pure semantic meaning of your interface. Here is a good simplified example for DOM vs Accessibility tree (from [TestDino’s article on the accessibility tree](https://testdino.com/blog/accessibility-tree)):',
					},
					{
						type: 'paragraph',
						text: 'Assistive technologies, like screen readers, read this tree to map out three vital pieces of programmatic data:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Role:** What the component is (e.g., `role="tab"`, `role="button"`). The role is the law! *It dictates expected keyboard controls.*',
							},
							{
								text: '**State / Property:** The current condition of the component (e.g., `aria-selected="true"`, `aria-expanded="false"`).',
							},
							{
								text: '**Accessible name:** The text label that identifies it (e.g., "Get Started").',
							},
						],
					},
				],
			},
			{
				heading: 'Why we need components to match?',
				blocks: [
					{
						type: 'paragraph',
						text: 'A responsive website is legally and structurally considered a *single set of pages.* When a user accesses our site, their expectations of how elements behave does not change just because their screen size shrank.',
					},
					{
						type: 'heading',
						level: 3,
						text: '1. Function dictates roles, not form',
					},
					{
						type: 'paragraph',
						text: 'ARIA roles describe *what a component does*, not how it looks. A button must remain a `role="button"` whether it is clicked with a precision mouse on a 32-inch monitor or tapped with a thumb on a mobile touchscreen. Changing roles via JavaScript media queries simply because a layout shifts visually breaks this rule.',
					},
					{
						type: 'heading',
						level: 3,
						text: '2. Predictability and cognitive load',
					},
					{
						type: 'paragraph',
						text: 'Screen reader users rely heavily on cognitive mapping and muscle memory.',
					},
					{
						type: 'paragraph',
						text: 'When a screen reader encounters `role="tab"`, it announces "Tab" and signals to the user that they can navigate between views using their arrow keys in some predicted way. If that role dynamically swaps to a menu item on mobile viewports, the user instinctively expects a list of immediate actions (like saving or deleting) rather than a content panel switcher. This breaks their mental model of the interface.',
					},
					{
						type: 'heading',
						level: 3,
						text: '3. The myth of the "Mobile User"',
					},
					{
						type: 'paragraph',
						text: 'Device lines are nowadays completely blurred. Millions of users navigate desktop laptops using touchscreens, and conversely, many power-users attach external Bluetooth keyboards to their smartphones. Because you can never guarantee *how* a user is accessing your layout based on pixel width alone, the semantic role must remain a stable source of truth.',
					},
					{
						type: 'heading',
						level: 3,
						text: '4. Regulatory compliance',
					},
					{
						type: 'paragraph',
						text: 'Under the Web Content Accessibility Guidelines, [WCAG Success Criterion 3.2.4: Consistent Identification (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html) dictates that components performing the same function across a set of pages must be identified consistently. Swapping roles via screen-size breakpoints directly risks failing this compliance checkpoint.',
					},
				],
			},
			{
				heading: 'Common pitfalls',
				isIssues: true,
				blocks: [
					{
						type: 'paragraph',
						text: 'A common case: a Tabs component built as a compliant `role="tablist"` on desktop collapses into a dropdown on mobile. To match the visual change, the mobile markup switches to a menu widget:',
					},
					{
						type: 'code',
						code: '<button aria-haspopup="true" aria-expanded="false" aria-controls="tabs-X-M">\n  tab 0\n</button>\n\n<ul role="menu" aria-labelledby="tabs-X">\n  <li role="menuitem" aria-selected="true" aria-controls="tabs-X-P-0">tab 0</li>\n  <li role="menuitem" aria-selected="false" aria-controls="tabs-X-P-1">tab 1</li>\n</ul>',
					},
					{ type: 'heading', level: 3, text: 'Why this breaks:' },
					{
						type: 'list',
						ordered: true,
						items: [
							{
								text: '**Role mismatch:** it still switches content panels, so it\'s still tabs. `role="menu"` is reserved for lists of immediate actions, and VoiceOver announces it as an application menu.',
							},
							{
								text: '**Invalid state:** `aria-selected` isn\'t allowed on `role="menuitem"`, so the active tab is ignored or announced unpredictably.',
							},
							{
								text: '**Broken links:** `aria-controls` from a `menuitem` to a `tabpanel` has no defined meaning, so screen readers ignore it.',
							},
							{ text: '**False popup:** `aria-haspopup="true"` means "opens a menu", but the button is really a disclosure control.' },
						],
					},
				],
			},
			{
				heading: 'Technical Solutions',
				blocks: [
					{
						type: 'paragraph',
						text: 'Take the hypothetical component from the pitfalls above: tabs on desktop that turn into a dropdown on mobile. Even as a dropdown, it is still a tab-switching interface - selecting an item reveals one content panel and hides the others, exactly like the desktop layout. The fix? Keep the core semantic architecture identical to desktop, and adapt only the orientation and focus states for the mobile viewport.',
					},
					{
						type: 'paragraph',
						text: 'The corrected, compliant markup pattern:',
					},
					{
						type: 'code',
						code: '<button aria-expanded="false" aria-controls="tabs-X-M">\n  Tab 0\n</button>\n\n<ul role="tablist" aria-label="Optimize your sales process" aria-orientation="vertical" inert>\n  <li role="tab" aria-selected="true" aria-controls="tabs-X-P-0" id="tabs-X-T-0" tabIndex="0">tab 0</li>\n  <li role="tab" aria-selected="false" aria-controls="tabs-X-P-1" id="tabs-X-T-1" tabIndex="-1">tab 1</li>\n</ul>',
					},
					{
						type: 'heading',
						level: 3,
						text: 'Key refactoring details',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Swapped menus for tabs:** Changing `role="menu"` to `role="tablist"` and `role="menuitem"` to `role="tab"` would instantly fix the semantic model. Screen readers now correctly announce it as a tab group, and attributes like `aria-selected` and `aria-controls` actually work as intended.',
							},
							{
								text: '**Added** `aria-orientation="vertical"`**:** Since the mobile tablist is stacked vertically, this attribute tells screen readers that `ArrowUp` and `ArrowDown` keys are the correct way to navigate through the tabs.',
							},
							{
								text: '**Corrected group labeling:** Replaced `aria-labelledby` pointing to the dynamic trigger button text with a stable, descriptive `aria-label="Optimize your sales process"`. A tab group\'s label should describe its overall purpose, not its currently active state.',
							},
							{
								text: '**Pruned the invisible tree with** `inert`**:** A dropdown like this is often expands and collapses with a CSS transition. While visually hidden when closed, its elements can remain in the DOM and the tab order, meaning keyboard users end up navigating into Narnia when the dropdown is closed. By applying the HTML `inert` attribute to the `ul` whenever the dropdown is collapsed, you completely remove it from the keyboard and accessibility tree without breaking the CSS animation.',
							},
						],
					},
					{
						type: 'heading',
						level: 3,
						text: 'Rare Exceptions to the Rule',
					},
					{
						type: 'paragraph',
						text: "You should only change an ARIA role if the component's *interactive behavior completely changes* between layouts. If the fundamental user pattern shifts, the technical blueprint must shift with it. For example:",
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Desktop navigation vs. mobile hamburger:** A horizontal desktop navigation bar might use standard layout elements or a specific header structure. If that layout collapses into a vertical mobile accordion list, it should transition into a standard disclosure pattern using `aria-expanded` buttons.',
							},
							{
								text: '**True tabs vs. true accordions:** If a desktop tab interface rearranges its layout into a stacked mobile accordion where *multiple panels can be opened simultaneously*, the roles must switch to match disclosure patterns.',
							},
						],
					},
					{
						type: 'quote',
						quote: '“AI scales operations, let humans scale compassion.”',
						author: 'Janna Cachola',
					},
				],
			},
		],
	},
	{
		number: 13,
		title: 'VoiceOver quick start guide',
		summary:
			'*“But Kristina, how do I even test with a screen reader? Your PR description says to check with VoiceOver, and I have no idea how to use it. What even is reading order? Help!”* I can hear some of you saying this in my head whenever I post a PR for review, though I have never actually heard it out loud. Maybe you all know this already, or maybe not. Either way, it is worth going through the most basic and useful shortcuts once more. So today’s post is not about writing accessible code, but about testing that it actually is accessible.',
		sections: [
			{
				heading: 'What are screen readers?',
				blocks: [
					{
						type: 'paragraph',
						text: 'In short, a screen reader is a piece of assistive software that does exactly what it says: it reads digital screens out loud. It is the primary tool used by people who are blind, visually impaired, or have cognitive disabilities to navigate the digital world.',
					},
					{
						type: 'paragraph',
						text: 'Instead of looking at our beautifully designed UI, a screen reader ignores the CSS entirely, digs straight into the underlying code (Accessibility tree, remember?), and translates it into two things:',
					},
					{
						type: 'list',
						ordered: true,
						items: [
							{
								text: '**Text-to-Speech (TTS):** A synthetic voice that reads the page content.\nFun fact: Power users usually crank the reading speed up to a level that sounds like a glitching alien to the untrained ear, yet they comprehend it perfectly.',
							},
							{
								text: '**Braille Displays:** High-tech hardware gadgets with pins that physically move up and down to let users read the screen with their fingers.',
							},
						],
					},
					{
						type: 'paragraph',
						text: "Because screen reader users aren’t using a mouse (try pointing a cursor at something you can't see), they rely entirely on keyboard shortcuts (like bashing the `Tab` and arrow keys) or touch-based gestures on mobile to jump around a page. If you’re on Windows, you’ve probably heard of NVDA or JAWS. If you’re on a Mac or iPhone, Apple’s built-in VoiceOver is your go to. And Android users have TalkBack. Unfortunately, you can not make sure your code is bulletproof for *all* of them, unless you actually *test with all* of them. Each one can have it's own quirks. But testing with at least one is already so much better than testing with none.",
					},
				],
			},
			{
				heading: 'Why we need them?',
				blocks: [
					{
						type: 'paragraph',
						text: 'Keeping a site accessible is the right thing to do, and yes, compliance legal teams will hunt us down if we ignore WCAG standards. But in this post let’s look at this purely from a developer and QA perspective: why do we actually need to know how screen readers work? Because otherwise, we are coding with our eyes closed. Literally.',
					},
					{
						type: 'heading',
						level: 3,
						text: '1. Automated testing tools are lying to you (sort of)',
					},
					{
						type: 'paragraph',
						text: 'Running an automated tool like Lighthouse is great, but they are only smart enough to catch some of the accessibility issues. An automated test will happily give you a green checkmark if your image has an `alt` tag, even if that tag says `alt="asdfghjkl123"`. A computer doesn’t care, but a screen reader user will hear that read aloud and wonder what we’re drinking. Manual testing with an actual screen reader is the only way to catch real UX disasters.',
					},
					{
						type: 'heading',
						level: 3,
						text: '2. We need to stop building "Div-Soups"',
					},
					{
						type: 'paragraph',
						text: 'A screen reader couldn\'t care less about our custom gradients or animations. It reads the browser\'s hidden Accessibility Tree. When we don\'t understand how a screen reader interprets our code, we tend to build more out of generic `<div>` tags with custom click handlers. By actually testing with a screen reader, we quickly realize why native semantic elements (like `<button>` or `<nav>`) and proper ARIA labels matter. It’s the difference between the screen reader announcing *"Button: Collapse Menu"* versus *"Unlabeled clickable item... good luck, buddy."*',
					},
					{
						type: 'heading',
						level: 3,
						text: '3. Catching the "ghost" traps and focus leaks',
					},
					{
						type: 'paragraph',
						text: 'Now, you might think, "Can\'t I just test keyboard navigation and modals by bashing the `Tab` key without a screen reader?" Well, yes and no. While you can catch a basic keyboard trap (where you get physically stuck) with just your keyboard, screen readers introduce "invisible" issues.',
					},
					{
						type: 'paragraph',
						text: 'For example, if a mobile hamburger menu is closed but incorrectly coded, a sighted user won\'t see it, and a standard `Tab`-key test won\'t hit it. However, a screen reader user navigating by headings or swipes might get dragged into this hidden menu, reading out "ghost" links that are visually invisible off-screen. Testing with a screen reader ensures that what a user hears perfectly matches what is actually happening on the screen.',
					},
				],
			},
			{
				heading: 'Technical Solutions (testing)',
				blocks: [
					{
						type: 'paragraph',
						text: 'Alright, so we agree that automated testing is just scratching the surface, and "Div-Soups" are the enemy. How do we actually start testing our work? If you’re on a Mac, you already have a testing lab built right into your OS: VoiceOver.',
					},
					{
						type: 'paragraph',
						text: 'Before you fire it up, a quick heads-up for web testing: it is actually said you should prefer Safari for this. While VoiceOver works in Chrome, Apple builds VoiceOver and Safari under the same roof, meaning they are tightly optimized for each other. Testing on Safari should give you the most stable, accurate baseline for how a VoiceOver user will experience your code. That being said, I must confess - I use Chrome myself, so don’t let the Safari talk scare you from testing.',
					},
					{
						type: 'paragraph',
						text: 'And now, here is your developer crash course on breaking out of the mouse habit, mastering the key commands, and tweaking the settings so you can audit like a pro.',
					},
					{
						type: 'heading',
						level: 3,
						text: '1. Driving without a mouse: The Basics',
					},
					{
						type: 'paragraph',
						text: 'To kick things off, slam `Command + F5`. You’ll hear a robotic voice burst into life. Welcome to the other side!',
					},
					{
						type: 'paragraph',
						text: 'To navigate like you would be reading the full content, you’ll need to hold down a special modifier known as the **"VO Key"** (yes, it is literally called VoiceOver Key). By default, this is **`Control + Option`** (or just **`Caps Lock`** if you prefer a single-finger toggle). Get used to holding these down - they are your steering wheel. **Pro tip:** If you are navigating through a long page it can feel tedious to keep holding down the VO keys. Or even one `Caps Lock` key. The **VO keys lock** (`VO + ;`) acts like `Caps Lock` but for `Control + Option`. You can just use the arrows and `Space` and free up your other hand for a mug of tea.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Sequential scavenger hunt:** Hold `VO + Right Arrow` to step forward through every single element on the page, or `VO + Left Arrow` to go backward. This is how you test *reading order*. Now if your cursor suddenly jumps from the header straight to the footer, skipping your main article, here’s your clue that your DOM order is messed up.',
							},
							{
								text: '**Pulling the trigger:** Found a button or link? `VO + Space` is your virtual click. This interacts with stuff.',
							},
							{
								text: '**Shut up, please:** If VoiceOver gets trapped in a loop reading a massive block of text and you just need it to be quiet for a second, hit the standalone `Control` key. It acts as an instant mute button.',
							},
							{
								text: '`VO + A` tells VoiceOver to start reading the entire page starting from where you are at. You can just sit back and listen for anomalies.',
							},
							{
								text: '`VO + B` will start reading from the beginning of the page.',
							},
						],
					},
					{
						type: 'paragraph',
						text: '**Pro tip:** When building and testing you do not want to actually *hear everything* spoken out loud to you each and every time. When you use VO it automatically opens a small separate popup, where you can actually see the same things VO will read out loud. So you can use that and mute the talk. For that open VoiceOver Utility app (just search for it, I’ll talk more about it down below as well) > Go to Speech > Tick “Mute Speech” checkbox. Now you can debug also in silence 😮‍💨',
					},
					{
						type: 'paragraph',
						text: '**2. The "Interaction trap": Entering and exiting containers**',
					},
					{
						type: 'paragraph',
						text: 'One of the most confusing things for a sighted developer trying a screen reader for the first time is is getting "stuck" on a component. You might try to arrow through a menu or a table, but VoiceOver just reads the title and refuses to move inside.',
					},
					{
						type: 'paragraph',
						text: 'While VoiceOver has a "read all" mode that can skim through text passively, testing interactive components requires manual navigation. VoiceOver bundles complex UI elements into a single container called a "Group" so users can skip past them if they want to.',
					},
					{
						type: 'paragraph',
						text: 'To actually test the links, buttons, or cells *inside* these groups, you have to explicitly step inside:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Step inside:** Press `VO + Shift + Down Arrow` to "interact" with the container and test its internal elements.',
							},
							{
								text: '**Step outside:** Press `VO + Shift + Up Arrow` to stop interacting and return to the main page layout.',
							},
						],
					},
					{
						type: 'paragraph',
						text: "**Why this matters for testing:** If you don't know how to interact, you might mistakenly think a custom widget or data table is completely broken or inaccessible during your test, when it’s actually just waiting for you to step inside.",
					},
					{
						type: 'heading',
						level: 3,
						text: '3. **The ultimate audit tool: The Rotor**',
					},
					{
						type: 'paragraph',
						text: 'Imagine trying to read a 5,000-word blog post, but you aren’t allowed to scroll or skim visually. Sounds awful, right? Screen reader users solve this by using the Rotor—essentially an on-demand, filtered menu of the page layout.',
					},
					{
						type: 'paragraph',
						text: 'Press `VO + U` to open it.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: 'Use your Left/Right Arrows to flip between categories like Headings, Links, Landmarks, and Form Controls.',
							},
							{
								text: 'Use your Up/Down Arrows to scroll through the items in that category, and hit `Enter` to teleport focus directly to it.',
							},
						],
					},
					{
						type: 'paragraph',
						text: '**The Test:** Open the Rotor on some page. Go to "Links." Do you see ten links in a row named *"Click here"* or *"Read more"*? If you do, you’ve just uncovered a massive context blind spot for your users.',
					},
					{
						type: 'heading',
						level: 3,
						text: '4. Tuning the machine: The VoiceOver Utility',
					},
					{
						type: 'paragraph',
						text: "Running VoiceOver out of the box is fine, but as a developer, you aren't using it the same way a daily user does. You need to tweak it to act like a debugging tool. Hit `VO + F8` while VoiceOver is running to open the **VoiceOver Utility app**. (Or just search for it on your Mac).",
					},
					{
						type: 'paragraph',
						text: 'Here are the levers you can pull:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Ditch the training wheels:** By default, VoiceOver acts like a helicopter parent, explaining how to use every single element (e.g., *"Link, Contact Us... To click this link, press..."*). It’s great for day one, but agonizing for day X into it. When you\'re ready, head into VoiceOver Utility > Verbosity > Hints and uncheck *"Speak instructions"*. Your testing loops will instantly feel faster, smoother, and much less noisy. Just make sure you feel comfortable with the core controls before you turn them off!',
							},
							{
								text: '**Enforce strict coding rules (Web > Navigation):** Look for *Navigate webpages by* and set it to *DOM order*. This forces VoiceOver to follow the exact, raw layout of your HTML document structure rather than trying to help you intelligently. If you wrote sloppy HTML, this setting will instantly expose it.',
							},
							{
								text: '**Crank down the speed (Speech > Voices):** Daily power users listen to speech at 80% to 100% speed—sounding like a fast-forwarded cassette tape. For testing, set your speech Rate slider to around 50%. You need to hear exactly how VoiceOver pronounces your custom `aria-labels` and `alt` text to ensure no syllables or characters are getting clipped or mangled.',
							},
							{
								text: '**Test with following VO cursor (Navigation > Mouse pointer)**: Sometimes VO could produce weird behavior on elements, which have some hover functionality for mouse users. In this case you can test by letting mouse cursor follow Voiceover cursor.',
							},
						],
					},
					{
						type: 'paragraph',
						text: 'And that’s it! Of course there are a bunch of other settings in VoiceOver Utility app, but I encourage you to test them out on your own (if you are interested). In general this should be enough to get you started on testing you code with screen readers. So just do it!',
					},
					{
						type: 'paragraph',
						text: 'PS! If you want to become a VoiceOver power user, Deque University has an [extended list of VoiceOver keyboard shortcuts](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts) you can use.',
					},
					{
						type: 'quote',
						quote: '“Diversity is a fact. Equity is a choice. Inclusion is an action. Belonging is an outcome.”',
						author: 'Arthur Chan',
					},
				],
			},
		],
	},
	{
		number: 14,
		title: 'Accessible emojis',
		summary:
			"Emojis are the universal language of the internet. They inject humor {🤦|person facepalming} , soften a direct tone {🙂|slightly smiling face} , and mimic body language {💪|flexed biceps} in our text-based digital lives. But while slapping a tiny picture on a sentence feels like second nature to us, their impact on web accessibility is often completely ignored. If we use them carelessly, we aren't just muddying our messaging - we are building digital brick walls for millions of users. Here is how emojis accidentally ruin web content accessibility, and how to handle them like a pro {🚀|rocket}.",
		sections: [
			{
				heading: 'What are emojis?',
				blocks: [
					{
						type: 'paragraph',
						text: 'To understand why they can break web layouts, we first have to look under the hood at what these characters actually are. Spoiler: Emojis and emoticons are *not* the same thing, and screen readers treat them very differently.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Emojis:** These are native, graphic pictographs standardized by the [Unicode Consortium](https://www.unicode.org/consortium/consort.html). Every single emoji has a fixed, unchangeable, sometimes overly literal technical name baked into its DNA. For example, {👋|waving hand} is universally registered as *"Waving Hand"*.',
							},
							{
								text: '**Emoticons & ASCII Art:** These are the vintage, pre-historic dinosaurs of the web. Unlike emojis, Emoticons {:)|smiling face} and internet relics like {¯\\_(ツ)_/¯|shrug} are structural patterns made entirely of standard text punctuation, symbols, and numbers arranged to loosely mimic visual shapes.',
							},
						],
					},
				],
			},
			{
				heading: 'Why we need them to be accessible?',
				blocks: [
					{
						type: 'paragraph',
						text: 'Emojis are a uniquely double-edged sword. When implemented with inclusive design, they enhance user experiences 🎉; when ignored, they actively smash them to pieces 😭.',
					},
					{
						type: 'paragraph',
						text: 'Making emojis accessible isn\'t just a "nice-to-have" checklist item. It is a necessity for several very real reasons:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Eliminating assistive technology barriers:** Millions of blind and low-vision users rely on screen readers or Braille displays to consume web content. Here is a fun fact: assistive tools *do not skip emojis*. They read aloud the official, pre-programmed Unicode system text. If developers don\'t manage these symbols, a screen reader user is forced to endure broken sentences or exhaustive auditory loops. Imagine trying to read an article but your computer suddenly yells: *"Clapping hands, clapping hands, clapping hands, clapping hands"* instead of letting you get to the actual point. Code accessibility ensures assistive users aren\'t left behind...or driven mad.',
							},
							{
								text: '**Reducing cognitive load and sensory overload:** For neurodivergent users, individuals with processing disorders, or people with learning disabilities, dense walls of text can be daunting. Emojis can act as brilliant visual anchors to break up text and guide a reader through a page. However, if those emojis are overused, misplaced, or unstructured, they trigger immediate cognitive friction and sensory overload. Accessible emoji practices provide the right balance—offering clarity without the chaos.',
							},
							{
								text: '**Bridging the "vibe" gap:** Emojis carry deep emotional weight, but internet culture\'s slang meanings are drastically disconnected from their literal code names. For example, using {💀|skull} to mean *"I am laughing hysterically"* will result in a screen reader robotically saying *"Skull"*. Similarly, {🙏|folded hands} could mean prayer, gratitude, pleading, or a high-five depending on who is reading it. By making an emoji technically accessible, we bridge the gap between a visual "vibe" and an auditory description, ensuring that our intended sarcasm or humor is equally conveyed to everyone.',
							},
							{
								text: '**Preventing "Invisible UI" ghost towns:** In modern web design, emojis are frequently used as buttons or standalone interactive indicators (like a {❤️|red heart} for a "favorite" button or an {⚠️|warning sign} for a system alert). If these graphics are not configured with accessible labels, a screen reader user encounters an entirely blank or ambiguous interactive element. They know a button is there, but they have no earthly clue what it does.',
							},
						],
					},
				],
			},
			{
				heading: 'Technical Solutions',
				blocks: [
					{
						type: 'paragraph',
						text: 'While emojis have built-in system names that screen readers can technically read, they are only *partially* accessible out of the box.',
					},
					{
						type: 'paragraph',
						text: 'Aside from slang mismatches, literal descriptions can be deeply confusing. For example, such black triangle ► is described by default as *"black right-pointing pointer"*. If you use that as a "Play" button in a multimedia video player without fixing it, your user experience is officially broken. Throw in the fact that some emojis turn into illegible, low-contrast blobs in dark mode, and we clearly need a strategy.',
					},
					{
						type: 'paragraph',
						text: 'Here are the rules to live by:',
					},
					{
						type: 'paragraph',
						text: '**1. Coding for custom meanings (ARIA roles)**',
					},
					{
						type: 'paragraph',
						text: "According to [WCAG 2.2 Technique H86](https://www.w3.org/WAI/WCAG22/Techniques/html/H86), you cannot use standard image `alt` tags on emojis because they are text characters. If you are using an emoji to convey a specific context or emotion that doesn't match its raw Unicode name, wrap it in a `<span>` and use ARIA properties to assign an accurate alternative text.",
					},
					{
						type: 'code',
						code: '<p>I smiled at my friend and gestured\n   <span role="img" aria-label="you">👉</span>\n   <span role="img" aria-label="rock">🤘</span>!\n</p>',
					},
					{
						type: 'paragraph',
						text: '**2. When the emoji is purely decorative**',
					},
					{
						type: 'paragraph',
						text: 'If the emoji is just visual flair ("eye candy") and the surrounding text already carries the full meaning, save your users the headache and hide it entirely from screen readers. This prevent repetitive, unnecessary and most importantly misleading announcements.',
					},
					{
						type: 'code',
						code: '<p>Check out our new features <span aria-hidden="true">✨</span></p>',
					},
					{
						type: 'paragraph',
						text: '**3. Ditch the punctuation faces ({===|strictly equals} ban emoticons)**',
					},
					{
						type: 'paragraph',
						text: 'Emoticons are an absolute nightmare for screen reader users. When a text-to-speech engine runs into a classic smiley, it doesn\'t say "smile" - it reads out the raw syntax character-by-character: *"Semicolon, right parenthesis."* Try to avoid having your website read out loud like a 1995 chat room.',
					},
					{
						type: 'paragraph',
						text: '**Solution:** Swap old-school emoticons like {:)|smiling face} out for native Unicode emojis like {🙂|slightly smiling face} and code them properly. If you absolutely *must* use ASCII text art, use `role="img"` and an `aria-label` to group it seamlessly.',
					},
					{
						type: 'paragraph',
						text: '**4. Content layout rules (The "where" and "how many")**',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Push emojis to the end:** Never sandwich emojis in the middle of text. (e.g. Avoid: *"Happy {🎂|birthday cake} Day to you!"* which reads out as *"Happy birthday cake day to you"*). Put emojis at the absolute end of the sentence so assistive tools can dictate the core message without mid-sentence disruption.',
							},
							{
								text: '**Cap the count (No stacking):** Limit yourself to a maximum of *three emojis per post/section*, and never repeat the exact same emoji back-to-back. Stacking {🔥|fire} {🔥|fire} {🔥|fire} forces a screen reader user to listen to a tedious, robotic loop: *"Fire, fire, fire."*',
							},
							{
								text: '**Never substitute words:** Use emojis to *complement* your vocabulary, never to **replace** words.',
								sublist: {
									type: 'list',
									ordered: false,
									items: [
										{
											text: '*Bad:* "Please bring your {🐶|dog face} to the park." (Screen reader: "Please bring your dog face to the park.")',
										},
										{
											text: '*Good:* "Please bring your dog 🐶 to the park."',
										},
									],
								},
							},
							{
								text: '**Avoid emojis as bullet points:** Using emojis as bullet list markers forces assistive software to read the description of the emoji before every single list item, completely burying the actual content. Stick to semantic, clean HTML `<ul>` and `<ol>` tags.',
							},
						],
					},
					{
						type: 'paragraph',
						text: '**5. Design and contrast testing**',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Verify dark mode visibility:** An emoji that looks bright and clear on a white background (like a dark brown or black icon) might completely disappear or turn into an illegible blur when user’s operating system switches to dark mode. Always test contrast variations.',
							},
							{
								text: '**Check platform discrepancies:** Emojis are rendered differently across iOS, Android, and Windows. A face that looks "playfully smirking" on an iPhone might look "passively hostile" on a desktop screen. Use resources like [Emojipedia](https://emojipedia.org/) to verify your imagery translates smoothly across devices before publishing crucial public web content.',
							},
						],
					},
					{
						type: 'quote',
						quote: '“Urging an organization to be inclusive is not an attack. It’s progress.”',
						author: 'DaShanne Stokes',
					},
				],
			},
		],
	},
	{
		number: 15,
		title: 'The magic of mega menus',
		summary:
			'Mega menus are one of the places where a site’s navigation most often falls apart for anyone not using a standard mouse. Let’s recap what makes a mega menu accessible, from the semantic structure and ARIA to keyboard behavior, and which common pitfalls to avoid.',
		sections: [
			{
				heading: 'What is accessible mega menu?',
				blocks: [
					{
						type: 'paragraph',
						text: "An accessible mega menu and header is a website’s primary navigation system designed so it doesn’t actively reject people who don't use a standard mouse.",
					},
					{
						type: 'paragraph',
						text: 'A standard menu is just a list of links. A mega menu is a big, multi-column panel filled with links, images, promo banners etc (and sometimes also a mini-existential crisis for the user). An accessible version of this means that whether someone is using a mouse, a trackpad, a keyboard, a screen reader, or an alternative switch device, they can find relavant pages without throwing their hardware out of the window.',
					},
				],
			},
			{
				heading: 'Why we need it?',
				blocks: [
					{
						type: 'paragraph',
						text: 'Aside from the minor detail that accessibility is a legal requirement (shoutout to the European Accessibility Act and the Americans with Disabilities Act), we need accessible headers because users vary wildly in how they browse the web.',
					},
					{
						type: 'paragraph',
						text: 'Imagine trying to navigate a digital maze where:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: 'You can only move by pressing one button over and over.',
							},
							{
								text: 'The map vanishes completely if your mouse wanders a single millimeter off course.',
							},
							{
								text: 'You are blindfolded, and your automated voice guide just states *"Link... Link... Image... Link"* without context.',
							},
						],
					},
					{
						type: 'paragraph',
						text: "If we don't build our header and mega menu accessibly, that is exactly what we are doing to our users. Fixing it lowers our bounce rates, satisfies regulatory compliance, and ensures an equitable user experience.",
					},
				],
			},
			{
				heading: 'Common pitfalls',
				isIssues: true,
				blocks: [
					{
						type: 'paragraph',
						text: "Mega menus are where header accessibility usually falls apart: no skip link to jump over the navigation, header links that do one thing on hover and another on click, and items a keyboard can't reach at all. The whole menu ends up out of reach for keyboard and assistive technology users",
					},
					{
						type: 'paragraph',
						text: 'The solutions below cover the mandatory basics of an accessible header and mega menu. Extras, like arrow-key navigation inside the menu, can come on top.',
					},
				],
			},
			{
				heading: 'Technical Solutions',
				blocks: [
					{
						type: 'paragraph',
						text: 'Let’s dive into the core architecture, code, and behaviors required to make mega menu work seamlessly.',
					},
					{
						type: 'heading',
						level: 3,
						text: '1. Header and semantic structure (The skeleton)',
					},
					{
						type: 'paragraph',
						text: 'Before even touching JavaScript, HTML structure must be flawless. Screen readers rely heavily on page landmarks to bypass repetitive content.',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**The `<header>` and `<nav>` landmarks:** Wrap entire top bar in a `<header>` element. Inside, wrap main menu in a `<nav>` element. It would also be nice to give it an explicit label using `aria-label="Main"` so screen readers can instantly distinguish it from a footer or sidebar menu. Leave the word "navigation" out of the label, because the `<nav>` element already announces it.',
							},
							{
								text: '**The "Skip to content" lifeline:** Keyboard users don\'t want to tab through your X amount of header / mega menu links on *every single page load*. This is why we need "Skip to main content" link as the absolute first element in our HTML. We hide it visually with CSS, but make it highly visible when it receives focus. It targets the primary content area container via an ID (e.g., `href="#main-content"`).',
							},
							{
								text: '**The Logo:** If company logo links to the homepage, the `<a>` tag needs explicit inner text or an `<img>` tag with `alt`. If using an inline SVG, include `role="img"` and an internal `<title>` tag linked via `aria-labelledby`.',
							},
						],
					},
					{
						type: 'heading',
						level: 3,
						text: '2. ARIA roles and sates: What to use (and what to kill)',
					},
					{
						type: 'paragraph',
						text: 'Screen readers cannot see CSS transitions. If a panel slides down visually, a blind user has no idea it exists unless you programmatically announce it. However, over-engineering ARIA attributes is just as dangerous.',
					},
					{
						type: 'paragraph',
						text: '**The `role="menu"` trap**',
					},
					{
						type: 'paragraph',
						text: 'A massive pitfall is applying `role="menu"` or `role="menubar"` to a website navigation menu. These attributes are meant for *desktop application menus* (like Google Docs\' *File > Open*).',
					},
					{
						type: 'paragraph',
						text: 'If you use `role="menu"` and `role="menuitem"`, you strip away standard web browsing shortcuts. Assistive technologies will no longer interpret your links as actual web hyperlinks. If a user brings up a shortcut menu displaying a "List of links on this page", *none* of your global navigation links will show up. **The Fix:** Stick to standard semantic lists (`<ul>`, `<li>`, `<a>`)',
					},
					{
						type: 'paragraph',
						text: '**Correct ARIA setup**',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**The dual-role problem (links vs. expanders):** Never make a top-level menu item act simultaneously as a click navigation link *and* an interactive dropdown expander. This ambiguity breaks user expectations. Instead, separate the responsibilities. Give the link its navigational purpose, and place a dedicated disclosure `<button>` next to it to handle the submenu expansion.',
							},
							{
								text: '**`aria-expanded`:** This is your core state manager. The dropdown toggle button must feature `aria-expanded="false"` by default, flipping dynamically to `"true"` via JavaScript when the menu is visible.',
							},
							{
								text: '**`aria-controls`:** Programmatically bind the trigger button to the target layout panel it opens. If our mega menu container has `id="product-panel"`, the button must feature `aria-controls="product-panel"`.',
							},
						],
					},
					{
						type: 'heading',
						level: 3,
						text: '3. Navigation paradigms: click vs. hover (and the "Current Page" rule)',
					},
					{
						type: 'paragraph',
						text: 'While mega menus typically trigger via hover, click activation is *significantly more accessible*. Click interactions represent an *intentional action* with an expected outcome.',
					},
					{
						type: 'paragraph',
						text: 'If the design mandates supporting mouse hover on desktop, we must treat it carefully:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Never open on hover alone:** A user must still be able to trigger it cleanly via keyboard focus or a click alternative.',
							},
							{
								text: '**Sizing and viewport context:** If a mega menu is too small, users can easily slide their mouse off it by accident. If it covers the entire viewport, it becomes difficult for users to dismiss it without completely moving their view.',
							},
							{
								text: '**Hover intent and timing:** To mitigate accidental closures, implement a script delay (~300ms to 500ms) that prevents the menu from abruptly snapping shut if the mouse briefly slips outside the boundary.',
							},
						],
					},
					{
						type: 'paragraph',
						text: '**Visual feedback and handling the active page** ([WCAG Technique G128](https://www.w3.org/WAI/WCAG22/Techniques/general/G128))',
					},
					{
						type: 'paragraph',
						text: 'An elegant, standard way to build confidence in navigation is providing explicit feedback for where the user *is* and where they are *going*:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**Hover and focus styling:** As a user shifts focus to or hovers over a menu link, change its visual style (like the background color or text styling) via CSS. When focus leaves, reset it seamlessly. This gives sighted and keyboard users immediate visual confirmation of their selected target.',
							},
							{
								text: '**Disable the current page link:** When a user is already viewing a specific page (e.g., the Pricing page), its corresponding link inside the global header should be visually highlighted and programmatically disabled. Since clicking a link to the page you are already looking at does nothing but trigger an unneeded reload, disabling it tells all users—sighted and screen reader users alike—exactly what topic is currently active. You can achieve this cleanly by adding `aria-current="page"` to the link and disabling the pointer events/click behavior.',
							},
						],
					},
					{
						type: 'heading',
						level: 3,
						text: '4. Optimizing the keyboard interaction flow',
					},
					{
						type: 'paragraph',
						text: 'The required core sequence (`Tab` & `Esc`)',
					},
					{
						type: 'list',
						ordered: true,
						items: [
							{
								text: '**Initial `Tab` progression:** When users press the `Tab` key, they should first step across the *top-level items only.* This allows them to quickly browse the main categories without getting dragged through dozens of underlying submenu items.',
							},
							{
								text: '**`Enter` / `Space` functionality:** Pressing `Enter` or `Space` on an active top-level trigger opens the associated mega menu and places focus directly onto the first interactive element inside it.',
							},
							{
								text: '**Internal `Tab` navigation:** Once inside an open submenu, the `Tab` key moves the user sequentially forward through all structural links or form fields in a logical reading order. `Shift + Tab` steps them backward.',
							},
							{
								text: '**Natural exit:** Tabbing past the final link of an open submenu must smoothly exit that block and place focus onto the *next* top-level navigation item.',
							},
							{
								text: '**The universal escape (`Esc` Key):** Per [WCAG 2.1 Criterion 1.4.13 (Content on Hover or Focus)](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html), any content that appears on hover or focus must be completely dismissible without shifting focus or moving the pointer. Pressing `Esc` must immediately close the mega menu panel and return focus cleanly back to the top-level trigger button.',
							},
						],
					},
					{
						type: 'paragraph',
						text: '**The Pro-tier option: `Arrow` key shortcuts**',
					},
					{
						type: 'paragraph',
						text: 'If you choose to implement arrow key support for power users, it should act as an alternative shortcut—*never* at the expense of standard `Tab` routing:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '`ArrowDown` on a main header item opens the menu and focuses the first nested link.',
							},
							{
								text: '`ArrowDown` / `ArrowRight` cycles forward through links; `ArrowUp` / `ArrowLeft` cycles backward.',
							},
							{
								text: '**Crucial:** Keep all links inside the mega menu configured with standard `tabindex="0"`. Do not drop them from the native tab loop.',
							},
						],
					},
					{
						type: 'heading',
						level: 3,
						text: '5. High-impact issues (The Quick-Fix cheat sheet)',
					},
					{
						type: 'paragraph',
						text: 'These are the high-impact accessibility blockers for any header and mega menu implementation:',
					},
					{
						type: 'table',
						header: ['Failure Mode', 'Impact', 'The Quick Fix'],
						rows: [
							[
								'**Hover-only dropdowns**',
								'Total blocker for keyboard/touch users',
								'Inject click activation, focus management, and `Esc`/`Enter` support.',
							],
							[
								'**"Click Here" hyperlinks**',
								'Ambiguous context for screen readers',
								'Use self-descriptive anchor strings (e.g., "Explore pricing options").',
							],
							[
								'**Hidden focus rings**',
								'Keyboard users "fly blind"',
								'Ensure visible focus indicators are styled explicitly using `:focus-visible`.',
							],
							[
								'**Small tap targets**',
								'Frustrating for mobile and motor-impaired users',
								'Maintain a strict minimum element target size of 24×24px with padding.',
							],
							[
								'**Icon-only buttons**',
								'Screen readers miss intent entirely',
								'Add descriptive label support via text strings or an `aria-label`.',
							],
						],
					},
				],
			},
			{
				heading: 'The WCAG compliance matrix',
				blocks: [
					{
						type: 'paragraph',
						text: 'To keep the design completely aligned, global navigation architecture should be mapped directly back to these core WCAG criterias:',
					},
					{
						type: 'list',
						ordered: false,
						items: [
							{
								text: '**[Consistent Navigation (WCAG 3.2.3 - Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html):** The primary navigation structure must stay identical in location, layout, order, and label text across all site pages so users do not have to relearn your layout.',
							},
							{
								text: '**[Focus Visible (WCAG 2.4.7 - Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html):** Interactive targets must show an obvious, high-contrast visual outline when focused via keyboard navigation. Never allow `outline: none;` without custom alternatives.',
							},
							{
								text: '**[Target Size Minimum (WCAG 2.5.8 - Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html):** Interactive elements must meet a minimum size boundary of at least 24×24px (or be spaced sufficiently apart) to accommodate touch input and motor control variations.',
							},
							{
								text: '**[Reflow (WCAG 1.4.10 - Level AA)](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html):** The interface must remain responsive. Zooming a page up to 200% must seamlessly wrap and collapse the header layout into a functional mobile menu instead of breaking, causing double-scrolling, or overlapping text fields.',
							},
							{
								text: '**[Info & Relationships (WCAG 1.3.1 - Level A)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships):** The structural visual hierarchy must be explicitly hardcoded into the layout using proper semantic tags (`<nav>`, `<ul>`, `<li>`, structural headings).',
							},
							{
								text: '**[Name, Role, Value (WCAG 4.1.2 - Level A)](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html):** Interactive controls must transparently pass their structural identity, name, and current visual status down to assistive devices using standard parameters (like `aria-expanded`).',
							},
							{
								text: '**[Bypass Blocks (WCAG 2.4.1 - Level A)](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html):** Provide a native method to easily jump past repetitive interface sections, accomplished via a clean "Skip to Main Content" element.',
							},
						],
					},
					{
						type: 'paragraph',
						text: 'And that’s a wrap! A navigation built with all of this in mind guides users much better, and lets everyone see exactly why your product deserves to be loved!',
					},
					{
						type: 'quote',
						quote: '“By designing with accessibility in mind, we are designing for our friends, families and futures selves”',
						author: 'Alistair Duggin',
					},
				],
			},
		],
	},
]
