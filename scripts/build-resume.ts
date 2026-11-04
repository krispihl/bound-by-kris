/// <reference lib="dom" />
// Prints the CV from src/data/cv.ts into a one-page A4 PDF in public/, laid out in two columns like a paper résumé.
// Run with `npm run resume` after changing the CV data, then commit the new PDF. Stops without writing if the CV no
// longer fits on one page.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { chromium } from 'playwright'

import { CV_SECTIONS } from '../src/data/cv.ts'

type CvSection = (typeof CV_SECTIONS)[number]
type CvEntry = CvSection['entries'][number]

const OUTPUT = fileURLToPath(new URL('../public/kristina-pihl-cv.pdf', import.meta.url))

const CONTACTS = [
	{ label: 'kristina.r@gmail.com', href: 'mailto:kristina.r@gmail.com' },
	{ label: 'linkedin.com/in/kristina-pihl-97461a10a', href: 'https://www.linkedin.com/in/kristina-pihl-97461a10a/' },
	{ label: 'github.com/kristinapihl', href: 'https://github.com/kristinapihl' },
]

// Paper-only versions of the role highlights, so the CV fits on a single page. Roles not listed here use their full text.
const SHORT_HIGHLIGHTS: Record<string, string[]> = {
	'Accessibility Mission Lead & Engineer': [
		'Led two company-wide accessibility initiatives across Design, Web and Marketplace, from business case to fixes.',
		'Resolved nearly 60 high-impact WCAG 2.2 AA issues for EAA compliance, from signup flows to pricing tables.',
		'Built accessibility into the CMS and design system and wrote a 15-part "Accessibility Bites" series.',
	],
	'Engineering Lead': [
		'Built the engineering side of A/B experimentation from scratch, shipping reliable tests with fewer defects.',
		'Turned winning experiments into roadmap work, resolved Optimizely conflicts and guided weekly engineering syncs.',
		'Wrote the Optimizely handbook and mentored new colleagues.',
	],
	'Content Platform & CMS Engineering': [
		'Built Craft CMS features and renderers for the main site, signup and Knowledge Base, including localization.',
		'Created reusable SEO content-hub templates with structured data and contributed to Core Web Vitals work.',
	],
	'Design System': ['Major contributor to the shared library of accessible components, working with designers from the start.'],
}

// Paper-only trims of the profile text, so no paragraph ends on a word alone on its own line.
const shortSummary = (text: string) => text.replace('coordinated different teams', 'coordinated teams')

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const section = (id: string) => {
	const found = CV_SECTIONS.find((s) => s.id === id)
	if (!found) throw new Error(`No CV section with id "${id}" in src/data/cv.ts`)
	return found
}

const heading = (number: string, text: string) => `<h2 class="heading"><span class="heading__number">${number}</span>${escape(text)}</h2>`

const period = (text?: string) => (text ? `<span class="period">${escape(text)}</span>` : '')

// Main column: every job as the company, then each position in bold with its dates, then the Pipedrive roles and highlights.
const renderJob = (entry: CvEntry) => {
	if (entry.note) return ''

	const positions = (entry.steps ?? [])
		.map(
			(step) =>
				`<p class="job__position"><strong>${escape(step.title)}</strong>${step.period ? ` ${period(step.period)}` : ''}${
					step.detail ? ` <span class="job__detail">· ${escape(step.detail)}</span>` : ''
				}</p>`
		)
		.join('')

	const roles = (entry.roles ?? [])
		.map((role) => {
			const bullets = SHORT_HIGHLIGHTS[role.title] ?? role.highlights.map((h) => h.text)
			return `<li class="role">
				<h4 class="role__title">${escape(role.title)}</h4>
				<ul class="bullets">${bullets.map((text) => `<li>${escape(text)}</li>`).join('')}</ul>
			</li>`
		})
		.join('')

	return `<li class="job">
		<h3 class="job__company">${escape(entry.title)} ${period(entry.period)}</h3>
		${positions}
		${roles ? `<ul class="roles">${roles}</ul>` : ''}
	</li>`
}

const renderHtml = () => {
	const profile = section('profile')
	const work = section('work')
	const education = section('education')
	const skills = section('skills')
	const languages = section('languages')
	const interests = section('interests')

	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Kristina Pihl – CV</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400&display=swap" />
<style>
	@page { size: A4; margin: 12mm 14mm 8mm; }

	:root {
		--navy: #390099;
		--fuchsia: #ff0054;
		--text: #201f2b;
		--muted: #6b6b80;
		--border: #e5e3f0;
		--mono: ui-monospace, 'SF Mono', Menlo, monospace;
	}

	* { box-sizing: border-box; }

	html { font-size: 16px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

	body {
		margin: 0;
		color: var(--text);
		font-family: 'Fraunces', serif;
		font-size: 0.6875rem;
		line-height: 1.6;
		font-variation-settings: 'opsz' 9;
	}

	h1, h2, h3, h4, p, ul, dl, dd { margin: 0; padding: 0; font-weight: inherit; }
	ul { list-style: none; }
	a { color: inherit; text-decoration: none; }

	/* The same two columns run through the header and the body, so the contacts line up with the side column. */
	.columns {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 15rem;
		column-gap: 2rem;
	}

	.header { align-items: end; padding-bottom: 1.25rem; }

	.header__name {
		color: var(--navy);
		font-size: 2.5rem;
		font-weight: 900;
		line-height: 1;
		font-variation-settings: 'opsz' 144;
	}

	.header__role {
		margin-top: 0.4rem;
		color: var(--text);
		font-size: 0.8125rem;
	}

	/* The short accent rule from the a11y bites lead. */
	.header__main::after {
		content: '';
		display: block;
		width: 2.5rem;
		height: 0.15rem;
		margin-top: 0.7rem;
		background: var(--fuchsia);
	}

	.contacts {
		display: grid;
		gap: 0.2rem;
		color: var(--navy);
		font-family: var(--mono);
		font-size: 0.5625rem;
	}

	.block + .block { margin-top: 1.35rem; }

	/* Section headings with the site's mono numbers, closed off by a thin rule. */
	.heading {
		display: flex;
		align-items: baseline;
		gap: 0.45rem;
		margin-bottom: 0.7rem;
		padding-bottom: 0.3rem;
		border-bottom: 1px solid var(--border);
		color: var(--navy);
		font-size: 0.9375rem;
		font-weight: 600;
		line-height: 1.2;
	}

	.heading__number {
		color: var(--fuchsia);
		font-family: var(--mono);
		font-size: 0.5625rem;
		font-weight: 400;
	}

	.summary + .summary { margin-top: 0.5rem; }

	/* Grey is kept for dates and the side column details. */
	.period {
		margin-left: 0.3rem;
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.5rem;
		font-weight: 400;
		white-space: nowrap;
	}

	.job + .job { margin-top: 0.75rem; }

	.job__company {
		color: var(--navy);
		margin-bottom: 0.2rem;
		font-size: 0.8125rem;
		font-weight: 700;
	}

	.job__position + .job__position { margin-top: 0.2rem; }

	.job__position strong { font-weight: 700; }

	.job__detail { color: var(--text); }

	.roles { margin-top: 0.55rem; }

	.role + .role { margin-top: 0.55rem; }

	/* The areas of work under Pipedrive, in the site's small mono caps, so they don't compete with the bold job titles. */
	.role__title {
		margin-bottom: 0.15rem;
		color: var(--navy);
		font-family: var(--mono);
		font-size: 0.5625rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	/* Small navy squares, like the bullets on the site. */
	.bullets li {
		position: relative;
		padding-left: 0.7rem;

		&::before {
			content: '';
			position: absolute;
			top: 0.55em;
			left: 0.1rem;
			width: 0.22rem;
			height: 0.22rem;
			background: var(--navy);
		}
	}

	.bullets li + li { margin-top: 0.2rem; }

	/* Side column: short titled items stacked one after another. */
	.item + .item { margin-top: 0.55rem; }

	.item__title { font-weight: 700; }

	.item__text { color: var(--muted); }

	.item__period { color: var(--muted); font-family: var(--mono); font-size: 0.5rem; }
</style>
</head>
<body>
	<header class="columns header">
		<div class="header__main">
			<h1 class="header__name">Kristina Pihl</h1>
			<p class="header__role">Front-end Engineer · Web accessibility</p>
		</div>
		<ul class="contacts">${CONTACTS.map((c) => `<li><a href="${c.href}">${escape(c.label)}</a></li>`).join('')}</ul>
	</header>

	<div class="columns">
		<main>
			<section class="block">
				${heading('01', profile.heading)}
				${(profile.summary ?? []).map((p) => `<p class="summary">${escape(shortSummary(p))}</p>`).join('')}
			</section>
			<section class="block">
				${heading('02', 'Experience')}
				<ul>${work.entries.map(renderJob).join('')}</ul>
			</section>
		</main>

		<aside>
			<section class="block">
				${heading('03', skills.heading)}
				<dl>${skills.entries
					.map(
						(e) =>
							`<div class="item"><dt class="item__title">${escape(e.title)}</dt><dd class="item__text">${escape(e.detail ?? '')}</dd></div>`
					)
					.join('')}</dl>
			</section>
			<section class="block">
				${heading('04', 'Education')}
				<ul>${education.entries
					.map(
						(e) =>
							`<li class="item"><p class="item__title">${escape(e.title)}</p><p class="item__text">${escape(e.detail ?? '')}</p><p class="item__period">${escape(e.period ?? '')}</p></li>`
					)
					.join('')}</ul>
			</section>
			<section class="block">
				${heading('05', languages.heading)}
				<p class="item__text">${escape((languages.summary ?? []).join(' '))}</p>
			</section>
			<section class="block">
				${heading('06', interests.heading)}
				<p class="item__text">${escape((interests.summary ?? []).join(' '))}</p>
			</section>
		</aside>
	</div>
</body>
</html>`
}

// Each page object in the PDF has "/Type /Page"; "/Type /Pages" is the page tree and is skipped.
const countPages = (pdf: Buffer) => pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g)?.length ?? 0

const browser = await chromium.launch()
try {
	const page = await browser.newPage()
	await page.setContent(renderHtml(), { waitUntil: 'networkidle' })
	await page.evaluate(() => document.fonts.ready)
	const pdf = await page.pdf({ format: 'A4', preferCSSPageSize: true, printBackground: true })

	const pages = countPages(pdf)
	if (pages !== 1) {
		console.error(
			`The CV came out as ${pages} pages, so ${OUTPUT} was left unchanged. Shorten the text in src/data/cv.ts or in this script until it fits on one page.`
		)
		process.exitCode = 1
	} else {
		writeFileSync(OUTPUT, pdf)
		console.log(`Wrote ${OUTPUT}`)
	}
} finally {
	await browser.close()
}
