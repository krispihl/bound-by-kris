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
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'callout'; text: string }
  | { type: 'code'; code: string }
  | { type: 'table'; header: string[]; rows: string[][] }
  | ListBlock

export type A11yBite = {
  number: number
  title: string
  summary: string
  content: Block[]
}

// Inline text supports a small markdown subset: `code`, **bold**, *italic* and [links](url).
export const A11Y_BITES: A11yBite[] = [
  {
    number: 1,
    title: 'Skip links',
    summary:
      'I think most of you, who have worked with me long enough, have heard me babble about skip links more than once. If not, here is your chance to hear it (once more). So you might already generally know what they are and why we need them, but in this post I will go over once more, why they are actually that important.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: '🎯 What are Skip Links?',
      },
      {
        type: 'paragraph',
        text: "Skip links are accessibility features that provide keyboard users with a shortcut to bypass navigation and potentially other repetitive elements on a webpage. They're typically the first focusable element on a page but remain invisible until activated with the Tab key.",
      },
      {
        type: 'heading',
        level: 2,
        text: '❓ Why we need them?',
      },
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
        text: 'Keyboard-Only *sighted* users is the group most often forgotten. These are people who can see the screen but cannot (or choose not to) use a mouse due to motor impairments, tremors, or temporary injuries (like me with a broken wrist, which makes me mainly a keyboard-only user for many weeks).',
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
      {
        type: 'heading',
        level: 2,
        text: '🚨 Current Issues at Pipedrive public web',
      },
      {
        type: 'paragraph',
        text: 'The main issue(*) is, surprise-surprise, that we are missing skip links!',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: "Yes, our website currently has other significant keyboard accessibility problems in the header navigation as well, but let's not get into that just now. We already have an experiment running for the new header megamenu and in the new implementation those will be addressed.",
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'If you start from the top of the page, you would have to tap through around 10 links in the header. These links are exactly the same on each page. When you are looking for something on a webpage, you typically jump through multiple pages before you find exactly what you were looking for. How many pages would you jump through if you would have to read though *every single header link* on each page? I know that I would give up rather quickly and go search for information somewhere else.',
      },
      {
        type: 'paragraph',
        text: "And it's even worse when you get to the footer! Let's imagine you would like to reach cookie settings link, which is located at the very bottom of the page. But before that you have around 70+(!!!) footer navigation links to tab through! Amazing, right?",
      },
      {
        type: 'heading',
        level: 2,
        text: '💡 Technical Solutions',
      },
      {
        type: 'paragraph',
        text: 'The technical implementation is actually rather straightforward and simple. It involves creating a visually hidden links before header and footer that become visible only when focused via keyboard navigation. This means we would not even change the visual layout of the page in any way for the sighted user, but we would make it **so much better** for anyone using keyboard navigation or screen reader assistive technologies.',
      },
      {
        type: 'quote',
        text: '“The one argument for accessibility that doesn’t get made nearly often enough is how extraordinarily better it makes some people’s lives. How many opportunities do we have to dramatically improve people’s lives just by doing our job a little better?” — Steve Krug',
      },
    ],
  },
  {
    number: 2,
    title: 'Focus indicators',
    summary:
      'In part 1, we discussed skip links. Skip links are used to skip some repeating patterns like header links. Otherwise, while using a keyboard, you would have to tab through each link separately. Now let us imagine that you are tabbing through those links. How do you understand, which link is currently selected? This is where focus indicators come into play.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: '🎯 What are Focus indicators?',
      },
      {
        type: 'paragraph',
        text: 'Focus indicators (often called focus rings) are the "mouse cursor" for keyboard users. They provide a visual cue that shows exactly which element currently has keyboard focus. The Golden Rule: If you can click it, you must be able to see when you have "tabbed" to it.',
      },
      {
        type: 'heading',
        level: 2,
        text: '❓ Why we need them?',
      },
      {
        type: 'paragraph',
        text: 'Without focus indicators, a person navigating with the `Tab` key is effectively "flying blind"—they are interacting with the page, but have no idea which link or button they are about to trigger. Also, if a page has some focus indicators present, and some missing, the keyboard navigation experience will become extra confusing. At some point, you see where you are and the next minute you are lost without any visual cues. And then suddenly the focus indicator appears in seemingly a random place down the page!',
      },
      {
        type: 'heading',
        level: 2,
        text: '🚨 Current Issues at Pipedrive public web',
      },
      {
        type: 'paragraph',
        text: 'Problems with focus indicators can be mainly divided into some general groups and some of those problems also affect our website.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          {
            text: 'You will not see your focus indicator because the element itself is not focusable to begin with.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'For example, we can see this happening on our main header navigation. If you try to tab through header items, you will notice that some of them do not receive focus rings. This is happening because they are coded as non-focusable HTML elements (in this case, just a regular `<div>`). The elements that do receive focus are coded as link tags (`<a>`), which are focusable by default. For mouse users, these div’s open mega menu on hover. For keyboard users, they are totally inaccessible and do nothing.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          {
            text: 'Visual focus indicator has been removed specifically.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'This is when we remove the default browser focus ring because the designer thinks it "looks ugly," without replacing it with a custom one. This makes the site completely unusable for keyboard users. I do not recall such case in our public web and we can only thank our great designers for that.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          {
            text: 'Element has been made focusable, but focus indicators have not been implemented or are hidden.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'For example, we have one use case with video cover component. The video cover itself has focus indicator, but when it is wrapped inside a card component, this indicator ring is cut off and users cannot see it. It technically "works" with keyboard, but without visible focus, it’s functionally inaccessible. This is like building a car with working pedals but no steering wheel—it kind of works, but it\'s unusable.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          {
            text: 'When focus indicators exist, but the element itself is out of page current viewport.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'Imagine a component that is placed outside of current visible viewport and slides in on demand. When an element is visually hidden (off-screen) but still in the DOM, it remains in the Sequential Focus Navigation Order. A keyboard user will hit `Tab`, the focus ring will disappear because the browser is focusing on something 2000px to the left, and the user will think the page is broken or their computer has frozen. This is called "Ghost Tabbing."',
      },
      {
        type: 'heading',
        level: 2,
        text: '💡 Technical Solutions',
      },
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
        text: '“Accessibility allows us to tap into everyone’s potential.” ― Debra Ruh',
      },
    ],
  },
  {
    number: 3,
    title: 'Use of color',
    summary:
      "In part 2, we discussed focus indicators — you know, those rings that tell you where you are. But a ring is only as good as its visibility. If the color blends into the background, it’s about as helpful as a camouflage life vest. In this part, let's talk about using color to convey meaning. Is color alone enough to tell your story? Spoiler: **No.**",
    content: [
      {
        type: 'heading',
        level: 2,
        text: '🎯 What is "Use of Color"?',
      },
      {
        type: 'paragraph',
        text: 'In practice we often use specific hues to signal information — like red for "Stop/Error," green for "Go/Success," or blue for "I’m a link, click me!" It’s a great visual shorthand, but if it’s your *only* way of communicating, you\'re essentially "whispering" to a huge chunk of your users. Technically, it\'s not *only* about color. We need *distinction*.',
      },
      {
        type: 'heading',
        level: 2,
        text: '❓ Why?',
      },
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
      {
        type: 'heading',
        level: 2,
        text: '🚨 Current Issues at Pipedrive public web',
      },
      {
        type: 'paragraph',
        text: 'Apparently we do not like underlines under links inside text. Would that be too descriptive? 🤷‍♀️ 🙂 Fortunately, if we want to play it like that, we do have a workaround that is still technically allowed by WCAG: [link text must have at least 3:1 contrast with surrounding body text](https://webaim.org/articles/contrast/#only) *and* must present a non-color indicator on mouse hover (typically underline) and keyboard focus (focus ring).',
      },
      {
        type: 'paragraph',
        text: '**Our Crime:** Inline text links rely solely on blue (`rgb(13, 104, 197)`) to distinguish themselves from body text *and* our CSS actively strips away “the safety net”. e.g. underline.',
      },
      {
        type: 'paragraph',
        text: 'For a link to be accessible without an underline, it must have at least a 3:1 contrast ratio with the surrounding body text.',
      },
      {
        type: 'paragraph',
        text: 'Currently, our link-to-body-text contrast ratio is 2.82:1. Not ideal. But to be honest, with contrast ratio we are somewhat playing a “politically everything is correct” game as well. I mean, would the difference between 2.82:1 vs 3:1 be actually *that* visible? Probably not, but still there needs to be some “standard” to refer to.',
      },
      {
        type: 'paragraph',
        text: 'So we should always take contrast ratio failures with a grain of salt and if possible go *beyond* the minimal required standard.',
      },
      {
        type: 'heading',
        level: 2,
        text: '💡 Technical Solutions',
      },
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
                  text: "Hit that *3:1 contrast ratio* against surrounding text (which we currently don't, but update is already in designer's table to fix that).",
                },
                {
                  text: 'Provide a *non-color indicator* (like an underline) on mouse hover and keyboard focus (which we already do)',
                },
              ],
            },
          },
          {
            text: "**Use icons or labels:** Don't just make an error message red. Add an icon or text so the meaning is clear even if the color is gone. Like we show error messages under invalid fields. Good!",
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
        text: '“Every design decision has the potential to include or exclude people” - Alistair Duggin',
      },
    ],
  },
  {
    number: 4,
    title: 'Landmarks',
    summary:
      'We have already talked about skip links and how we can skip some content (like header links) and jump straight to the main part of the content. In this part we will see another way how assistive technology users can quickly navigate around on a web page. We will be talking about landmark regions.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: '🎯 What are Landmarks and roles?',
      },
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
      {
        type: 'heading',
        level: 2,
        text: '❓ Why we need them?',
      },
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
      {
        type: 'heading',
        level: 2,
        text: '🚨 Current Issues at Pipedrive public web',
      },
      {
        type: 'paragraph',
        text: 'The issue with our public web was that we were really not utilizing the landmarks (or roles). For example we were missing `<main>` at all and although we had `<footer>` it was actually not working.',
      },
      {
        type: 'paragraph',
        text: 'In our specific footer implementation, we ran into a conflict between design system requirements and native semantics:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**The Constraints:** Our design system demands beautiful, consistent margins. To maintain specific margins and background alignment, our `<footer>` was wrapped inside a `<section>` + `<div>` wrapper.',
          },
          {
            text: '**The Consequence:** The browser is a bit of a snob. It says, *"If the footer isn\'t a direct child of the body, it’s not a \'real\' footer anymore."* And the result was that our footer went "undercover." It looked great to us, but to a screen reader, it was just a nameless ghost. It lost its `contentinfo` landmark status. To a screen reader, our footer became a generic, un-navigable block of text.',
          },
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '💡 Technical Solutions',
      },
      {
        type: 'paragraph',
        text: 'To resolve the footer issue without breaking the visual layout we had 2 options.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          {
            text: 'We could implemented explicit role assignment. This means adding `role="contentinfo"` directly to the `<footer>` element. This would override the nesting rules and forces the browser to announce it as the global footer landmark. It’s like giving the footer a megaphone so it can shout "I\'M THE FOOTER!" from inside its wrapper.',
          },
          {
            text: 'In our case we actually had a second and more elegant solution. We allowed out section container to actually be rendered as something other than HTML <section> element. So in case of footer, we said: “Hey you, nice mr. Section! We really like all you amazing styles, but please be a Footer in instead”. This allowed us to fix the native landmark role issue by moving <footer> element to be once again the direct child of body.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'Of course we also needed to implement the `<main>` . For that it was not enough to just slap a role on the first main content section (as our main content is built from multiple separate `<section>` elements). If you only put the `<main>` tag on the *first* section, everything following it (the siblings) will be "orphaned" from the main landmark. This is because screen readers treat landmarks like *containers,* not like bookmarks or anchors.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**If you wrap everything:** A user can jump to "Main" and then use "Screen Reader Search" or "Heading Navigation" to explore everything inside that container.',
          },
          {
            text: '**If you only wrap the first section:** When the user reaches the end of that first `<main>` section, the screen reader will announce *"End of Main."* The user might then assume the rest of the page is just "extra" stuff (like sidebars or footers) and miss your subsequent sections entirely.',
          },
        ],
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
        text: '“The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect.” – Tim Berners-Lee',
      },
    ],
  },
  {
    number: 5,
    title: 'Accessible tables',
    summary:
      'In previous post we talked about landmarks. These are specific regions on page that allow assistive technologies to identify and navigate to major sections of the document. But assistive technologies also provide you other “quick references” to scan the page content. For example a list of page headings, links or tables. In this post we are going to focus on data tables and how we can make them accessible and meaningful for everyone.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: '🎯 What are accessible data tables?',
      },
      {
        type: 'paragraph',
        text: 'In technical terms, it means creating a digital structure where screen readers and assistive technologies can programmatically determine the relationship between data cells and their headers. Instead of just being a "box with numbers," the table tells a story: "In the \'Lite\' column, for the \'Leads and deals\' row, the value is 2500." It’s about building a map that works even if you can’t see the "You Are Here" sticker.',
      },
      {
        type: 'paragraph',
        text: 'You can think of accessible data table as a well-organized dinner party. Everyone knows exactly where they are sitting, who is sitting next to them, and what’s on the menu.',
      },
      {
        type: 'heading',
        level: 2,
        text: '❓ Why we need them?',
      },
      {
        type: 'paragraph',
        text: 'For users with visual impairments, a poorly built table is just a chaotic "word soup."',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: 'Context is King: Without proper headers, a screen reader user might hear "20,000" and have no clue if that’s a price, a seat limit, or the number of coffee cups consumed by the dev team this week.',
          },
          {
            text: '**The "Where Am I?" Factor:** Screen readers allow users to jump from cell to cell. Accessible tables ensure the "mental cursor" stays synced with the actual data. If you move from row to row, it should tell you that the cell content is connected to the row for "this data". Accessible table will do that for you.',
          },
          {
            text: "It’s the Law (and it's just nice): Following WCAG standards (specifically [Guideline 1.3.1](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)) isn't just about avoiding a stern letter from legal; it’s about making sure everyone can compare our plans and in the long term give us their money 😏",
          },
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '🚨 Current Issues at Pipedrive public web',
      },
      {
        type: 'paragraph',
        text: 'Our current pricing page comparison table, which should inform user about our plans and help them make a decision, is a bit of a "master of disguise." It *looks* like a table, but under the hood, it\'s actually a collection of `<div>` elements pretending to be one. There is no relationship between rows or cells. For assistive technology users our current table is literally totally useless.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: 'The "Ghost" Columns: On mobile, we use a "sliding window" to show only two columns at a time. We use `display: none` to hide the others, which actually does remove them from the accessibility tree (good!), but it can break the "column count" logic if not handled carefully. And we are not handling anything currently.',
          },
          {
            text: '**The CSS Grid Conflict:** We love CSS Grid for layout, but if we just slapped native HTML `<table>` tags in there, our grid styling would fight the browser\'s internal table algorithms like cats and dogs. What it means is that this would manually override the browser\'s internal "User Agent Stylesheet." By default, a table relies on a specific hierarchy of display properties to calculate column widths and cell alignment. The table stops behaving like a table for layout purposes because the browser no longer sees that `<tr>` as a "table row." It treats it as a standard grid container.',
          },
          {
            text: 'Missing Relationships: Currently, there’s no explicit link between a data cell and its three potential headers (Category, Feature, and Plan). It’s like a family tree where no one is talking to each other.',
          },
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '💡 Technical Solutions',
      },
      {
        type: 'paragraph',
        text: 'We explored two main paths: going "Native" or going "Full ARIA."',
      },
      {
        type: 'paragraph',
        text: "*Spoiler alert: We chose the path that doesn't involve a total design existential crisis.*",
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
            text: 'Cons: It breaks our mobile "overflow" trick and CSS Grid layout. A `<tr>` is a "Table Row Box," not a "Block Box," so it refuses to overflow its parent. It\'s very stubborn.',
          },
        ],
      },
      {
        type: 'heading',
        level: 3,
        text: '2. The ARIA Role Approach (Our Chosen Path)',
      },
      {
        type: 'paragraph',
        text: 'Since we don’t have time or resources right now to change the design, we’re going to "annotate" our existing `<div>` structure using WAI-ARIA roles. This keeps our current layout but gives screen readers the "map" they need. Basically we will mimic the native table relationships.',
      },
      {
        type: 'paragraph',
        text: '**The Game Plan:**',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: 'Identify Everything: Use `role="table"`, `role="rowgroup"`, `role="row"`, and `role="cell"`.',
          },
          {
            text: 'Coordinate System: We’ll use `aria-colindex` and `aria-rowindex`. What this gives us is that even if we hide "Column 2" on mobile, the reader will still say "Column 3 of 5," so the user doesn\'t feel lost in space.',
          },
          {
            text: 'The Triple-Link: We’ll use `aria-labelledby` to point a data cell to its Column Header, Block Header, and Row Header IDs.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'Example: `<div role="cell" aria-labelledby="lite-plan pricing-limits leads-deals">2500</div>`',
      },
      {
        type: 'paragraph',
        text: 'And with this, we will make our comparison table great again! (...or as much as we can, for now. Like stated earlier, we can do it even better if we would use native tables and I really hope we will eventually get to that as well.)',
      },
      {
        type: 'quote',
        text: '"Accessibility is a reflection of respect and equality, not an optional extra.” — Debra Ruh',
      },
    ],
  },
  {
    number: 6,
    title: 'ARIA Live Regions and Roles',
    summary:
      'In this bit we will see how we can make content changes “visible” for everyone. We will talk about ARIA live regions and roles. When to use what and how to politely announce changes to the user.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: '🎯 What are ARIA Live Regions and Roles?',
      },
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
      {
        type: 'heading',
        level: 2,
        text: '❓ Why we need them?',
      },
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
      {
        type: 'heading',
        level: 2,
        text: '🚨 Current Issues at Pipedrive public web',
      },
      {
        type: 'paragraph',
        text: 'Step by step we have already improved the situation with adding semantic roles or aria live properties to our components. It is not perfect yet though. For example our `Spinner` component. Loading spinners should announce their state to screen readers, but there\'s no role="status" or aria-live anywhere, and no accessible label. Thus screen reader users get no feedback that content is loading. Also we do not really utilize `aria-atomic="true"`. For example if we have `<div aria-live="polite">` wrapper on `FieldMessage` component, it lacks aria-atomic="true". Without it, some screen readers may announce only the changed text node rather than the full message. For short validation messages, aria-atomic="true" ensures the whole message is read. Same goes for our `Checkbox` component. These are easy fixes and we can do better 💪',
      },
      {
        type: 'heading',
        level: 2,
        text: '💡 Technical Solutions: Roles vs. explicit ARIA',
      },
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
        text: 'Three other possible roles act like specialized versions of status or alert Using them provides more semantic "flavor" to the user:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          {
            text: '`role="log"` > New information is added to the end of the list, and old information stays visible. Screen readers generally only announce the *new* addition. When to use: Chat logs, messaging history, error logs, or game scores. Unlike `status`, which usually replaces the entire content, `log` implies a sequence of events.',
          },
          {
            text: '`role="marquee"` > Used for information that changes frequently or "scrolls" (like a stock ticker). Most screen readers are configured to be less "chatty" with marquees so they don\'t overwhelm the user. When to use: Scrolling news headlines or stock prices. Use this sparingly. If the info is critical, `status` is safer.',
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
            text: '`aria-live="polite"`: Waits for a break in the conversation to inform you that "The data has arrived, sir 🫡 " (remember `role="status"` )',
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
        text: '“Start by doing what’s necessary, then do what’s possible and suddenly you are doing the impossible.” — Francis of Assisi',
      },
    ],
  },
  {
    number: 7,
    title: 'Using <aside> together with <nav> elements',
    summary:
      'With the (soonish) introduction of the CRM Content Hub, we are about to introduce a second set of navigation linking to different Hub pages. As of now we have not had such implementation in our web. Or did we? We actually do have Table Of Contents, right! Is this also similar to the new additional navigation? To find out, continue reading.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: '🎯 What are <aside> and <nav>?',
      },
      {
        type: 'paragraph',
        text: 'In the world of semantic HTML, tags do more than just style content—they describe its purpose to both machines and humans. Think of them as the "adults in the room" compared to the generic `<div>`.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**`**<aside>**`**: Defines content that is remotely related to the content around it. Think of it as a sidebar or a "callout" box. Programmatically, it serves as a *complementary* landmark.',
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
      {
        type: 'heading',
        level: 2,
        text: '❓ Why we need them?',
      },
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
            text: '**Future-Proofing:** As our DOM grows into being even more beautiful, but complex, semantic landmarks keep the accessibility tree from becoming a nightmare.',
          },
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '🚨 Current Issues at Pipedrive public web',
      },
      {
        type: 'paragraph',
        text: 'Like I already mentioned in the introduction, additionally to the new CRM hub navigation our web already has Table of Content implemented. It is used on some landing pages, but mostly on a lot of blog pages and support articles.',
      },
      {
        type: 'paragraph',
        text: 'Currently, our TOC ("Topics" ) is wrapped in a generic `<div>` inside a column, which sits next to the main article. While this is functional, it doesn\'t describe the relationship of the content to the main article as effectively as semantic tags could. It works, yes, but it’s a bit like labeling some jar "Stuff" — technically true, but not very helpful. Here is the breakdown of why we should consider shifting to `<aside>` and how to structure it.',
      },
      {
        type: 'paragraph',
        text: '**1. Why `<aside>` is the correct choice**',
      },
      {
        type: 'paragraph',
        text: "The `<aside>` element is intended for content that is remotely related to the main content. Since TOC helps users navigate the article but isn't part of the main body itself, it fits this definition perfectly.",
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**Accessibility:** Screen readers recognize `<aside>` as a landmark, making it easier for users to jump to the navigation.',
          },
          {
            text: '**SEO:** It tells Google, "This is the map, not the treasure."',
          },
        ],
      },
      {
        type: 'paragraph',
        text: '**2. Recommended HTML Structure**',
      },
      {
        type: 'paragraph',
        text: 'In our current code, the TOC is nested like this:',
      },
      {
        type: 'code',
        code: '...\n<div class="article-container_stickyTableOfContents">\n    ...\n    <nav aria-label="Topics">\n        ...',
      },
      {
        type: 'paragraph',
        text: 'We should level up. Let’s change that outer wrapper to an `<aside>` and keep the internal `<nav>`. Here is an updated example:',
      },
      {
        type: 'code',
        code: '<aside class="article-container_stickyTableOfContents" aria-labelledby="toc-heading">\n  <div class="article-container_scrollableContent">\n    <div class="puco-spacing ...">\n      <span id="toc-heading" class="puco-text ... puco-heading--h6">Topics</span>\n    </div>\n\n    <nav aria-label="Table of Contents" class="puco-table-of-contents">\n      <ul>\n        <li class="puco-table-of-contents__block">\n          <a href="#key-takeaways..." class="puco-table-of-contents__item">Key takeaways...</a>\n        </li>\n      </ul>\n    </nav>\n  </div>\n</aside>',
      },
      {
        type: 'paragraph',
        text: '*Note: Adding `aria-labelledby` ensures that when a screen reader enters the area, it announces "Topics, complimentary" instead of just leaving the user guessing.*',
      },
      {
        type: 'heading',
        level: 2,
        text: '💡 Technical Solutions',
      },
      {
        type: 'paragraph',
        text: 'In modern layouts like our upcoming CRM Content Hub, `<aside>` and `<nav>` often work together. (Similarly to the example in the improved TOC above).',
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
            text: 'The `<nav>` inside it tells the browser: "The specific purpose of this content is to help the user navigate to other parts on CRM content hub (our web)."',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'As we implement the CRM Content Hub, we should adopt these industry-standard patterns:',
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
        code: '<nav aria-label="Main"> ... </nav>\n...\n<aside>\n  <nav aria-label="Content Hub Categories"> ... </nav>\n</aside>',
      },
      {
        type: 'paragraph',
        text: '**2. Nested Navigations** - In the Content Hub, we will have a `<nav>` inside an `<aside>`.',
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
            text: '**Nav**: "I am navigating Hub Categories."',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'It is good practice to also add heading within your `<aside>`. Use `aria-labelledby` to link the aside to its own title. This ensures the name of the sidebar in the landmark list matches the visual text on the screen.',
      },
      {
        type: 'code',
        code: '<aside aria-labelledby="sidebar-title">\n  <h2 id="sidebar-title">CRM hub pages</h2>\n  <nav aria-label="Content Hub Categories">\n    <ul>...</ul>\n  </nav>\n</aside>',
      },
      {
        type: 'paragraph',
        text: '**3. Placement and source order**',
      },
      {
        type: 'paragraph',
        text: 'The order of your tags in the HTML is the "highway" for keyboard users. There are two potential strategies for the CRM Content Hub:',
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
        text: '“Always think: Who is in this room? Whose voices are heard? Whose voices are missing? Why?” — Per Axbom',
      },
    ],
  },
  {
    number: 8,
    title: 'Accessible tooltips',
    summary:
      "In the land of UI components, tooltips are often treated as an afterthought—a tiny bubble for a tiny bit of text. But when that “tiny” text holds important information about your app or its features, accessibility isn't optional. If your helpful hint is a secret to anyone not using a mouse, you’re doing it wrong. Let’s talk about making tooltips accessible for everyone.",
    content: [
      {
        type: 'heading',
        level: 2,
        text: '🎯 What are accessible tooltips?',
      },
      {
        type: 'paragraph',
        text: 'An accessible tooltip is more than just a visual "ooh, look, a bubble!" moment. It’s a programmatic bridge between an element and its description. It is specifically designed to be perceivable and operable by all users—including those using screen readers or keyboard-only navigation.',
      },
      {
        type: 'paragraph',
        text: 'In the world of accessibility, a tooltip isn\'t just a "pretty face." While a sighted mouse user gets a helpful hint, an accessible tooltip ensures a screen-reader user *hears* it and a keyboard navigator can actually *trigger* it without losing their place on the page. If it’s only visible to a mouse user, it’s not a tooltip—it’s a secret.',
      },
      {
        type: 'heading',
        level: 2,
        text: '❓ Why we need them?',
      },
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
      {
        type: 'heading',
        level: 2,
        text: '🚨 Current Issues at Pipedrive public web',
      },
      {
        type: 'paragraph',
        text: 'Our previous implementation had a few "oops" moments that created real barriers:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**Keyboard Inaccessibility:** The wrapper `div` lacked a `tabIndex`. This meant keyboard users could never reach the trigger, rendering the tooltip content completely unreachable for them.',
          },
          {
            text: '**The "Portal" Black Hole:** Content was rendered via `createPortal` into `document.body`. Without a programmatic link, screen readers saw the trigger and the tooltip as two strangers who had never met.',
          },
          {
            text: "**Ghosting the Keyboard:** There were no `onFocus`, `onBlur`, or `onKeyDown` listeners. You couldn't open a tooltip with `Tab` or dismiss it with `Escape`.",
          },
          {
            text: '**The "Catch Me If You Can" Dismissal:** Tooltips disappeared instantly on `mouseLeave`. If a user tried to move their cursor *to* the tooltip (e.g., to read closely or copy text), it would disappear like a mirage.',
          },
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '💡 Technical Solutions',
      },
      {
        type: 'paragraph',
        text: 'To hit the WCAG 2.1 Success Criterion 1.4.13 (the fancy way of saying "don\'t break the UI on hover"), we upgraded our code from "just CSS" to "actually smart."',
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
            text: '`aria-describedby`: We linked the trigger to the tooltip via a unique ID. Now, screen readers announce the description immediately after the element’s name.',
          },
          {
            text: '**The hidden twin strategy:** Since portalled bubbles are hard for screen readers to track, we introduced a visually hidden `div` inside the trigger.',
            sublist: {
              type: 'list',
              ordered: false,
              items: [
                {
                  text: '`useId()` generates a stable ID for the hidden copy, linking the trigger to this hidden `div` via `aria-describedby`',
                },
                {
                  text: '**Portal isolation:** we gave the visual bubble `aria-hidden="true"` so screen readers don\'t get stuck in a "double-announcement" loop.',
                },
              ],
            },
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'We also used `role="tooltip"` on the container. This tells the browser exactly what this element’s function is in the accessibility tree.',
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
            text: '**Dismissible:** Users can hit Escape to kill the tooltip without losing their place.',
          },
          {
            text: '**The 300 ms grace period:** To fix the vanishing act, we added a hover delay. On `mouseLeave`, a timer starts. If you move your mouse back or into the bubble within 300ms, we clear the timer. This allows the cursor to pass through the "dead zone" between the trigger and the bubble without the content disappearing. No more chasing bubbles!',
          },
          {
            text: '**Persistent:** It stays visible until the user *explicitly* decides it’s time to go. You can tab to the tooltip and it will disappear either when you tab on or when you decide to dismiss it with Esc.',
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
            text: '**Dual-triggering:** Our tooltips now listen for both the mouse (`mouseenter`) and the keyboard (`focus`).',
          },
          {
            text: '`tabIndex={0}`: We applied this to all triggers. Whether it’s a hover or click tooltip, it’s now officially on the "Tab Highway."',
          },
          {
            text: '**Strict non-interactivity:** A tooltip is for *reading*, not *doing*. If you need a link or a button inside that popup, it’s a dialog and those handle focus trapping differently.',
          },
          {
            text: '**Global overrides:** Added `handleKeyDown` to support the Escape key for immediate dismissal and Enter/Space for reopening.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: '**Bottom line:** If your tooltip disappears like a shy ghost or ignores the keyboard entirely, it’s not helping—it’s haunting. Let’s keep our UI helpful, reachable, and ghost-free. 👻🚫 These changes took our tooltips from "broken mirages" to WCAG-compliant components. It’s a small component, but a huge leap in making the Pipedrive web experience more inclusive, one `tabIndex` at a time.',
      },
      {
        type: 'quote',
        text: '“Inclusion isn’t just inviting someone to sit at your table. It’s believing they belong there.” — Mia Carella',
      },
    ],
  },
  {
    number: 9,
    title: 'Accessible forms',
    summary:
      "Accessibility isn't a feature, it’s the infrastructure. For forms, it's the difference between a clear path and a dead end. If a form lives inside a modal, the complexity doubles: we aren’t just managing inputs, we’re managing a tiny, floating sub-universe. We recently audited the logic behind our signup and newsletter subscription modals to ensure they don't accidentally ghost our users. Here is what we did and why.",
    content: [
      {
        type: 'heading',
        level: 2,
        text: '🎯 What are accessible forms?',
      },
      {
        type: 'paragraph',
        text: 'An accessible form is a predictable, machine-readable interface that allows everyone to input, review, and submit data without wanting to throw their keyboard out a window. It’s built on three pillars:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**Semantic Integrity:** Every input is legally married to a permanent label. No "situationships" or vague placeholders allowed.',
          },
          {
            text: '**Navigational Predictability:** The Tab key should move like a chess grandmaster—logical, sequential, and always visible.',
          },
          {
            text: '**Actionable Feedback:** The form actually talks back. It tells you what’s required, what’s broken, and when you’ve successfully crossed the finish line.',
          },
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '❓ Why we need them?',
      },
      {
        type: 'paragraph',
        text: "Forms are often the most cognitively and visually complex parts of a website. Making them accessible doesn't just check a compliance box, it fundamentally improves the experience for a wide range of users.",
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**Cognitive Clarity:** Clear instructions mean users with cognitive disabilities don\'t have to play "Guess the Input." This includes logical layout structures, clear instructions, and immediate feedback.',
          },
          {
            text: '**Voice Command Support:** If I’m shouting "Next Field" at my computer, the code needs to know what "Next" actually means. People using speech input rely on programmatically linked labels to activate controls and move focus to specific fields via voice commands.',
          },
          {
            text: '**Improved Hit Targets:** Ever tried to click a tiny checkbox with a shaky hand or a trackpad on a bumpy bus? Larger, label-linked clickable areas are a godsend for dexterity.',
          },
          {
            text: "**Screen Reader Harmony:** Assistive tech users shouldn't have to solve a riddle to figure out which field they’re typing in. They depend on structural elements like labels and fieldsets to identify and understand the purpose of each control in the context of the form.",
          },
          {
            text: '**Universal Usability:** Ultimately, an accessible form is a more usable form for everyone. Because frankly, even "power users" hate bad forms.',
          },
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '🚨 Current Issues at Pipedrive public web',
      },
      {
        type: 'paragraph',
        text: 'While auditing our Newsletter and Signup modals, we identified several critical accessibility barriers:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**The Silent Treatment:** Email inputs and checkboxes had visible errors, but screen readers were left in the dark because `aria-describedby` was missing. Disconnected error states meant screen reader users heard "invalid" but not the "why."',
          },
          {
            text: '**Messy IDs:** We had IDs with whitespace (a coding sin) and implicit labels (wrapping inputs in labels) that some screen readers could just decide to ignore.',
          },
          {
            text: '**Redundant Noise:** Non-informative decorative elements (icons, modal images) were selectable by VoiceOver. It was helpfully announcing "Image, Image, Image" for every decorative checkmark and icon.',
          },
          {
            text: '**Lack of Focus Guidance:** When a user attempted to submit a signup form step with errors, focus remained on the next/submit button. They were stuck at the end of the form with no idea where the fire was. Users had to manually navigate backward to find which field failed validation.',
          },
          {
            text: '**State Persistence Errors:** Validation errors remained marked as `aria-invalid="true"` even after a user corrected the data. Talk about holding a grudge.',
          },
          {
            text: '**Lack of Browser Assistance:** Missing `autocomplete` and `required` attributes prevented browsers from offering autofill or native validation, increasing the interaction cost for all users.',
          },
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '💡 Technical Solutions',
      },
      {
        type: 'heading',
        level: 3,
        text: '1. Modal "The Golden Rules"',
      },
      {
        type: 'paragraph',
        text: 'Since most of our forms live in modals, the container must act as a "mini-application" to prevent user disorientation.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**Focus Trap:** Use a focus trap to ensure Tab and Shift+Tab cycle exclusively within the modal. Users should never accidentally "leak" focus into the background page.',
          },
          {
            text: '**Role & Labeling:** Apply `role="dialog"` and `aria-modal="true"`. It tells the browser, "Pay attention to me now."',
          },
          {
            text: '**Initial Focus:** Upon opening, move focus to the first interactive element (usually the first input).',
          },
          {
            text: '**The Great Return:** The Esc key must trigger the close function. When the modal closes, we need to put the user back exactly where they started. It’s only polite.',
          },
        ],
      },
      {
        type: 'heading',
        level: 3,
        text: '2. Form Input Requirements',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**Explicit Labels:** Avoid relying on `placeholder` text, which disappears when typing. Use `<label for="id">` for long-term commitment.',
          },
          {
            text: '**Visible Focus:** Maintain a high-contrast focus ring. Never use `outline: none` without a robust custom replacement.',
          },
          {
            text: "**Grouping:** Use `<fieldset>` and `<legend>` for related inputs so screen readers announce the group's context.",
          },
        ],
      },
      {
        type: 'heading',
        level: 3,
        text: '3. Autocomplete & Personalization',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**Identify Input Purpose:** Use the `autocomplete` attribute for standard fields (e.g., `autocomplete="email"`, `autocomplete="given-name"`, `autocomplete="new-password"`).',
          },
          {
            text: "**Benefits:** We let the browser do the heavy lifting. Our users' fingers will thank us.",
          },
        ],
      },
      {
        type: 'heading',
        level: 3,
        text: '4. Handling "Required" Fields',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**The Native Way:** Use the HTML5 `required` attribute. It’s robust, simple, and the browser handles the basic nagging for us. (But for custom components that don\'t support native attributes, use `aria-required="true"`.)',
          },
          {
            text: '**Visual Cues:** Don’t just use color (red is for danger, but not everyone sees red). Use the classic `*` or `(required)` text.',
          },
        ],
      },
      {
        type: 'heading',
        level: 3,
        text: '5. Logic & Flow',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**Tab Order:** If it looks like it’s next, it should be next in the DOM. Simple.',
          },
          {
            text: '**Intentional Submission:** No "surprise submissions." A form should only submit when a user explicitly hits a button—never just because they finished a field.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'Taking these things into account, we implemented proactive error management in signup flow:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**Automatic Focus Shift:** If a user attempts to submit or move to the next signup step with invalid data, we now automatically move focus back to the first offending field.',
          },
          {
            text: '**Integrated Feedback:** Because we connected the error via `aria-describedby`, the screen reader immediately says: *"Your name. Please add your name."* No hunting required.',
          },
          {
            text: "**Forgive and Forget:** As soon as a user starts typing to fix an error, we clear the `aria-invalid` state. We're not here to judge.",
          },
        ],
      },
      {
        type: 'paragraph',
        text: '**Bottom line:** A form that everyone can use is a form that actually gets filled out. Let’s keep the barriers in the obstacle courses, not our signup flows.',
      },
      {
        type: 'quote',
        text: '“Compliance is a checkbox. Inclusion is a mindset. If your goal is meeting the standards, you are not truly accessible or inclusive” — Sheri Byrne-Haber',
      },
    ],
  },
  {
    number: 10,
    title: 'Accessible graphical elements',
    summary:
      'The first thing people usually think when they hear the term “accessibility” is: “Yes, I know what it is! It’s those image alt texts right?”. On one hand this is cool because, there is at least *something* related to accessibility, that has been talked about so much that people kind of know it already by heart. On the other hand, it is insidious, as it will give false impression there is not really much more to accessibility than slapping some alt text on images and we are good to go. Also it is not that widespread knowledge that not *all* images actually need alt text filled to begin with. Let’s talk about how we should actually make graphical elements accessible, informative and not annoying.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: '🎯 What are accessible graphical elements?',
      },
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
      {
        type: 'heading',
        level: 2,
        text: '❓ Why we need them?',
      },
      {
        type: 'paragraph',
        text: 'While ensuring everyone can use our web is the right thing to do, accessible graphics also offer technical and business value:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**SEO & AI discovery:** Google’s bots and the new wave of AI "answer engines" can’t "see" our beautiful UI. They read code. Proper alt text lets them index our features so Pipedrive shows up when someone asks, "What does a sales pipeline look like?"',
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
      {
        type: 'heading',
        level: 2,
        text: '🚨 Current Issues at Pipedrive public web',
      },
      {
        type: 'paragraph',
        text: 'We’ve moved past the "missing alt text" rookie mistakes—most of our images have `alt=""` by default now. But the devil is in the details. We’re currently leveling up from "it exists" to "it’s actually helpful."',
      },
      {
        type: 'paragraph',
        text: '**1. Functional vs. literal descriptions**',
      },
      {
        type: 'paragraph',
        text: 'A recurring "whoopsie" is describing what an image *is* rather than what it *does*. For example, if a link is a logo, the user doesn\'t need to hear "Software Advice Front Runners Logo". They need to hear "Read the Software Advice Front Runners award article" We’re currently auditing these link-based images to focus on the destination, not the decoration and we should take this into account when adding similar links in the future. (This is mostly content issue, not something for developers to control.)',
      },
      {
        type: 'paragraph',
        text: '**2. Excessive "noise" from decorative icons**',
      },
      {
        type: 'paragraph',
        text: 'We love icons, but screen readers don\'t love hearing about every single decorative checkmark. We’ve been doing a cleanup to apply `aria-hidden="true"` to these "visual sugar" elements so users can get to the meat of the content faster.',
      },
      {
        type: 'paragraph',
        text: '**3. Broken programmatic relationships (The Review component case)**',
      },
      {
        type: 'paragraph',
        text: 'This was a classic case of "it looks right, but sounds wrong."',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**The problem:** A user would hear "5 of 5", but because the logo had no descriptive alt text, they had no idea *who* gave the rating. Visually, the logo and the stars sit together. Programmatically, there was no link. Also in these components, decorative SVG stars were not hidden, creating "auditory clutter" for a rating that was already described in text.',
          },
          {
            text: '**The solution:** We "connected" the dots. Now, the logo says `alt="GetApp rating:"` and we hide the individual star SVGs to provide a clean, logical experience: *"GetApp rating: 5 of 5."*',
          },
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '💡 Technical Solutions',
      },
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
        type: 'paragraph',
        text: '*Example:* `<img src="dashboard.png" alt="Pipedrive sales pipeline showing three deals in the Negotiation stage.">` Also there is a general rule that you should try avoid adding images with actual informative text content on them. If this information is valuable for the sighted user, it will be valuable to everyone. If the design really needs something like this, then image alt text needs to include the same information.',
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
        type: 'paragraph',
        text: '*Example:* `<img src="blue-swirl.png" alt="">` PS! An empty/null alternative text attribute *is not the same* as a missing alternative text attribute! If the alternative text attribute is missing, assistive technology might read out the file name or surrounding content in an attempt to give the user more information about the image.',
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
        type: 'list',
        ordered: false,
        items: [
          {
            text: '*Example:* `<button aria-label="Delete Deal"><i class="icon-trash"></i></button>` (Because hearing "trash can" is less helpful than hearing "delete").',
          },
        ],
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
        type: 'paragraph',
        text: '*Example:* `<img class="lightbulb" alt="Lightbulb moment!" src="lightbulb.svg">`',
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
        text: '“Accessible design is good design” — Steve Ballmer',
      },
    ],
  },
  {
    number: 11,
    title: 'Accessible names',
    summary:
      'In the last post we talked about adding accessible image descriptions. Those were basically accessible names for images. But images are not the only elements, which need accessible names. In this post we will do a deeper dive into what exactly are accessible names, where they come from and do we always need to explicitly add them.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: '🎯 What is accessible name?',
      },
      {
        type: 'paragraph',
        text: 'Think of an accessible name as an element’s ID badge. Without it, the element is just a nameless stranger lurking on the DOM. The W3C defines two distinct layers of communication:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**Accessible Name:** The short, punchy label. It answers the question: *"What is this?"* (e.g., "Submit" or "Menu")',
          },
          {
            text: '**Accessible Description:** An optional, longer string that provides additional context or instructions. It answers the question: *"How do I use this?"* or *"What are the requirements?"* (e.g., "Password must be at least 8 characters").',
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
            text: '**Convey Intent:** Ensure the user understands the purpose of the element. So basically the user should know if they’re clicking "Save" or "Delete the entire Database."',
          },
          {
            text: '**Distinguishability:** If you have five "Edit" buttons on a page, the accessible name is the only thing keeping a screen reader user from playing "Button Roulette."',
          },
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '❓ Why we need them?',
      },
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
      {
        type: 'heading',
        level: 2,
        text: '🚨 Current Issues at Pipedrive public web',
      },
      {
        type: 'paragraph',
        text: "This is more like a general topic, thus I will not list any specific problems here, but let's be real: accessibility isn't a \"one-and-done\" task. Any time we touch code, we need to check if we've accidentally turned a button into a nameless void.",
      },
      {
        type: 'paragraph',
        text: '**Pro-Tip:** Don\'t guess. Pop open Chrome DevTools, hit the Accessibility tab, and look at the Computed Properties. If the "Name" field is empty, we’ve got work to do.',
      },
      {
        type: 'heading',
        level: 2,
        text: '💡 Technical Solutions',
      },
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
        text: 'Certain elements always require a name, others may usually or sometimes require a name, and still others should never be named. You can find a comprehensive table [here](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/#accessiblenameguidancebyrole), which lists all ARIA roles and when naming is required.',
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
        type: 'quote',
        text: '“Accessibility is not a problem to be solved. It is a culture to be built.” — Sheri Byrne-Haber',
      },
    ],
  },
  {
    number: 12,
    title: 'Stable component semantics',
    summary:
      'When we build responsive websites, we often spend hours ensuring that layout grids bend, text reflows fluidly, and images scale gracefully. But there is a silent, invisible layer of the user experience that often breaks when a screen shrinks: *semantic consistency*. If a component acts as a tab list on a desktop browser, it should not magically transform into an application menu when viewed on a phone. (Spoiler alert: Elements do not actually like identity crises). This is exactly what we learned recently when reviewing our own Tabs component. Yes, we might not get everything right on the first go, but we can definitely learn from our mistakes 🤓 This post breaks down why keeping ARIA roles and semantic HTML synchronized across all device layouts is vital for an accessible web.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: '🎯 What is Accessibility Tree?',
      },
      {
        type: 'paragraph',
        text: 'To understand why consistency matters, we have to look under the hood of how browsers and assistive technologies interact.',
      },
      {
        type: 'paragraph',
        text: 'When a browser loads a webpage, it parses the HTML to create the Document Object Model (DOM). Simultaneously, it builds a secondary blueprint called the *Accessibility Tree*. This tree strips away layout wrappers, fancy CSS styles, and presentation noise, leaving behind *only* the pure semantic meaning of your interface. Here is a good simplified example for DOM vs Accessibility tree ([original reference](https://testdino.com/blog/accessibility-tree)):',
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
            text: '**Role:** What the component is (e.g., `role="tab"`, `role="button"`). The role is the law! **It dictates expected keyboard controls.**',
          },
          {
            text: '**State / Property:** The current condition of the component (e.g., `aria-selected="true"`, `aria-expanded="false"`).',
          },
          {
            text: '**Accessible Name:** The text label that identifies it (e.g., "Get Started").',
          },
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '❓ Why we need components to match (desktop vs. mobile)?',
      },
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
        text: '4. Regulatory compliance (WCAG 3.2.4)',
      },
      {
        type: 'paragraph',
        text: 'Under the Web Content Accessibility Guidelines, [WCAG Success Criterion 3.2.4: Consistent Identification (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html) dictates that components performing the same function across a set of pages must be identified consistently. Swapping roles via screen-size breakpoints directly risks failing this compliance checkpoint.',
      },
      {
        type: 'heading',
        level: 2,
        text: '🚨 Current Issues at Pipedrive public web',
      },
      {
        type: 'paragraph',
        text: 'To see what happens when this goes wrong, let’s look at an example from our recent Tabs component audit.',
      },
      {
        type: 'paragraph',
        text: 'On desktop, the component was built beautifully as a standard, compliant tabbed interface (`role="tablist"`). However, on mobile viewports, the design team gracefully collapsed the tabs into a visual dropdown menu. To try and force screen readers to match this visual trick, the underlying code completely changed its semantics to a menu widget.',
      },
      {
        type: 'paragraph',
        text: 'The broken mobile markup pattern looked something like this:',
      },
      {
        type: 'code',
        code: '<button aria-haspopup="true" aria-expanded="false" aria-controls="tabs-X-M">\n  tab 0\n</button>\n\n<ul role="menu" aria-labelledby="tabs-X">\n  <li role="menuitem" aria-selected="true" aria-controls="tabs-X-P-0">tab 0</li>\n  <li role="menuitem" aria-selected="false" aria-controls="tabs-X-P-1">tab 1</li>\n</ul>',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Why this caused accessibility violations:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          {
            text: '**Role mismatch** (`role="menu"` / `role="menuitem"`)**:** Even when styled as a dropdown on mobile, this component still switches visible content panels. By definition, that makes it a tab interface. `role="menu"` is reserved for lists of immediate actions. VoiceOver announced this as an application menu, leading users to expect actions rather than a panel switcher.',
          },
          {
            text: '**Invalid state attributes:** The code used `aria-selected` on a `role="menuitem"`. The ARIA specification explicitly forbids this (it’s a semantic crime). Because of this spec violation, browsers and screen readers either ignored the active state entirely or announced it unpredictably, leaving users completely in the dark about which tab was currently active.',
          },
          {
            text: '**Broken programmatic links:** The code used `aria-controls` to point from a `menuitem` to a `tabpanel`.This relationship has zero defined meaning in the ARIA spec. Screen readers simply shrugged and ignored it, breaking the link between the tab and its content.',
          },
          {
            text: '**The false** `aria-haspopup="true"`: Using `aria-haspopup="true"` (an alias for `aria-haspopup="menu"`) on the trigger button falsely told screen readers that it opened an application menu widget. There is no `tablist` value for `aria-haspopup`; the button is actually a disclosure control, not a menu launcher.',
          },
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '💡 Technical Solutions',
      },
      {
        type: 'paragraph',
        text: 'The mobile dropdown exposes a tab-switching interface: selecting an item reveals a content panel and hides others, exactly like the desktop layout. The fix? Keeping the core semantic architecture identical to desktop, adapting only the orientation and focus states for the mobile viewport.',
      },
      {
        type: 'paragraph',
        text: 'The corrected, compliant markup pattern:',
      },
      {
        type: 'code',
        code: '<button aria-expanded="false" aria-controls="tabs-X-M">\n  Tab 0\n</button>\n\n<ul role="tablist" aria-label="`Optimize your sales process`" aria-orientation="vertical" inert>\n  <li role="tab" aria-selected="true" aria-controls="tabs-X-P-0" id="tabs-X-T-0" tabIndex="0">tab 0</li>\n  <li role="tab" aria-selected="false" aria-controls="tabs-X-P-1" id="tabs-X-T-1" tabIndex="-1">tab 1</li>\n</ul>',
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
            text: '**Swapped menus for tabs:** Changing `role="menu"` to `role="tablist"` and `role="menuitem"` to `role="tab"` instantly fixed the semantic model. Screen readers now correctly announce it as a tab group, and attributes like `aria-selected` and `aria-controls` actually work as intended.',
          },
          {
            text: '**Added** `aria-orientation="vertical"`**:** Since the mobile tablist is stacked vertically, this attribute tells screen readers that `ArrowUp` and `ArrowDown` keys are the correct way to navigate through the tabs.',
          },
          {
            text: '**Corrected group labeling:** We replaced `aria-labelledby` pointing to the dynamic trigger button text with a stable, descriptive `aria-label="<Section title here>"`. A tab group\'s label should describe its overall purpose, not its currently active state.',
          },
          {
            text: '**Pruned the invisible tree with** `inert`**:** Our dropdown uses a smooth CSS grid transition to expand and collapse. While visually hidden when closed, the elements remained in the DOM and the tab order, meaning keyboard users were accidentally navigating into Narnia when the dropdown was closed. By applying the HTML `inert` attribute to the `ul` when `isExpanded` is false, we completely remove the closed dropdown from the keyboard and accessibility tree without breaking the CSS animation.',
          },
        ],
      },
      {
        type: 'heading',
        level: 3,
        text: '🦄 Rare Exceptions to the Rule',
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
        type: 'callout',
        text: 'If the component still behaves like a single-panel switcher on mobile, keep the tab semantics— no matter how vertically "dropdown-y" it looks 🙂 Next time we’ll know better.',
      },
      {
        type: 'quote',
        text: '“AI scales operations, let humans scale compassion.” — Janna Cachola',
      },
    ],
  },
  {
    number: 13,
    title: 'VoiceOver quick start guide',
    summary:
      '“But Kristina, how do I even test with screen reader? In your PR description you told to also check with VoiceOver. I have no idea how to use it 🤷 And what is even *reading order* in VoiceOver? Help!” Yeah, I think I can hear some of you saying this in my head when I post my PRs for a review. Although I have basically never heard it out loud. So maybe you all know this already? 🤔 Or maybe not. But I think it is worth going over this at least once for the most basic and useful shortcuts etc. So today’s post is not about how to write accessible code, but how to test that it actually is.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: '🎯 What are screen readers?',
      },
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
            text: '**Text-to-Speech (TTS):** A synthetic voice that reads the page content. *Fun fact:* Power users usually crank the reading speed up to a level that sounds like a glitching alien to the untrained ear, yet they comprehend it perfectly.',
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
      {
        type: 'heading',
        level: 2,
        text: '❓ Why we need them?',
      },
      {
        type: 'paragraph',
        text: 'Keeping Pipedrive accessible is the right thing to do, and yes, compliance legal teams will hunt us down if we ignore WCAG standards. But in this post let’s look at this purely from a developer and QA perspective: why do we actually need to know how screen readers work? Because otherwise, we are coding with our eyes closed. Literally.',
      },
      {
        type: 'heading',
        level: 3,
        text: '1. Automated testing tools are lying to you (sort of)',
      },
      {
        type: 'paragraph',
        text: 'Running an automated tool like Lighthouse is great, but they are only smart enough to catch some % of accessibility issues. An automated test will happily give you a green checkmark if your image has an `alt` tag, even if that tag says `alt="asdfghjkl123"`. A computer doesn’t care, but a screen reader user will hear that read aloud and wonder what we’re drinking. Manual testing with an actual screen reader is the only way to catch real UX disasters.',
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
        text: 'Now, you might think, "Can\'t I just test keyboard navigation and modals by bashing the Tab key without a screen reader?" Well, yes and no. While you can catch a basic keyboard trap (where you get physically stuck) with just your keyboard, screen readers introduce "invisible" issues.',
      },
      {
        type: 'paragraph',
        text: 'For example, if a mobile hamburger menu is closed but incorrectly coded, a sighted user won\'t see it, and a standard Tab-key test won\'t hit it. However, a screen reader user navigating by headings or swipes might get dragged into this hidden menu, reading out "ghost" links that are visually invisible off-screen. Testing with a screen reader ensures that what a user hears perfectly matches what is actually happening on the screen.',
      },
      {
        type: 'heading',
        level: 2,
        text: '🚨 Current Issues at (developing) Pipedrive public web',
      },
      {
        type: 'paragraph',
        text: 'The main issue is, well, that we do not test with screen readers, when we actually should 😁 So lets start doing it!',
      },
      {
        type: 'heading',
        level: 2,
        text: '💡 Technical Solutions (aka testing with VoiceOver on Mac)',
      },
      {
        type: 'paragraph',
        text: 'Alright, so we agree that automated testing is just scratching the surface, and "Div-Soups" are the enemy. How do we actually start testing our work? If you’re on a Mac (like most of us), you already have a testing lab built right into your OS: VoiceOver.',
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
        text: 'To kick things off, slam Command + F5. You’ll hear a robotic voice burst into life. Welcome to the other side!',
      },
      {
        type: 'paragraph',
        text: 'To navigate like you would be reading the full content, you’ll need to hold down a special modifier known as the **"VO Key"** (yes, it is literally called VoiceOver Key). By default, this is **Control + Option** (or just **Caps Lock** if you prefer a single-finger toggle). Get used to holding these down - they are your steering wheel. ***Pro tip:*** If you are navigating through a long page it can feel tedious to keep holding down the VO keys. Or even one Caps Lock key. The **VO keys lock** (`VO + ;`) acts like Caps Lock but for Control+Option. You can just use the arrows and spacebar and free up your other hand for a mug of tea.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**Sequential Scavenger Hunt:** Hold `VO + Right Arrow` to step forward through every single element on the page, or `VO + Left Arrow` to go backward. This is how you test *reading order*. Now if your cursor suddenly jumps from the header straight to the footer, skipping your main article, here’s your clue that your DOM order is messed up.',
          },
          {
            text: '**Pulling the Trigger:** Found a button or link? `VO + Space` is your virtual click. This interacts with stuff.',
          },
          {
            text: '**Shut Up, Please:** If VoiceOver gets trapped in a loop reading a massive block of text and you just need it to be quiet for a second, hit the standalone Control key. It acts as an instant mute button.',
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
        text: '***Pro tip:*** When building and testing you do not want to actually *hear everything* spoken out loud to you each and every time. When you use VO it automatically opens a small separate popup, where you can actually see the same things VO will read out loud. So you can use that and mute the talk. For that open VoiceOver Utility app (just search for it, I’ll talk more about it down below as well) > Go to Speech > Tick “Mute Speech” checkbox. Now you can debug also in silence 😮‍💨',
      },
      {
        type: 'paragraph',
        text: '**2. The "Interaction Trap": Entering and exiting Containers**',
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
            text: '**Step Inside:** Press `VO + Shift + Down Arrow` to "interact" with the container and test its internal elements.',
          },
          {
            text: '**Step Outside:** Press `VO + Shift + Up Arrow` to stop interacting and return to the main page layout.',
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
            text: 'Use your `Left/Right Arrows` to flip between categories like **Headings**, **Links**, **Landmarks**, and **Form Controls**.',
          },
          {
            text: 'Use your `Up/Down Arrows` to scroll through the items in that category, and hit `Enter` to teleport focus directly to it.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: '**The Test:** Open the Rotor on some web page. Go to "Links." Do you see ten links in a row named *"Click here"* or *"Read more"*? If you do, you’ve just uncovered a massive context blind spot for your users.',
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
            text: '**Ditch the Training Wheels:** By default, VoiceOver acts like a helicopter parent, explaining how to use every single element (e.g., *"Link, Contact Us... To click this link, press..."*). It’s great for day one, but agonizing for day X into it. When you\'re ready, head into **VoiceOver Utility > Verbosity > Hints** and uncheck *"Speak instructions"*. Your testing loops will instantly feel faster, smoother, and much less noisy. Just make sure you feel comfortable with the core controls before you turn them off!',
          },
          {
            text: '**Enforce Strict Coding Rules (Web > Navigation):** Look for Navigate webpages by and set it to **DOM order**. This forces VoiceOver to follow the exact, raw layout of your HTML document structure rather than trying to help you intelligently. If you wrote sloppy HTML, this setting will instantly expose it.',
          },
          {
            text: '**Crank Down the Speed (Speech > Voices):** Daily power users listen to speech at 80% to 100% speed—sounding like a fast-forwarded cassette tape. For testing, set your speech **Rate slider to around 50%**. You need to hear exactly how VoiceOver pronounces your custom `aria-labels` and `alt` text to ensure no syllables or characters are getting clipped or mangled.',
          },
          {
            text: '**Test with following VO cursor (Navigation > Mouse pointer)**: Sometimes VO could produce weird behavior on elements, which have some hover functionality for mouse users. In this case you can test by letting mouse cursor follow Voiceover cursor.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'And that’s it! Of course there are a bunch of other settings in VoiceOver Utility app, but I encourage you to test them out on your own (if you are interested). In general this should be enough to get you started on testing you code with screen readers. So just do it! 💥',
      },
      {
        type: 'paragraph',
        text: 'PS! If you want to become a power user for VoiceOver then here’s an [extended list of shortcuts](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts) you can use.',
      },
      {
        type: 'quote',
        text: '“Diversity is a fact. Equity is a choice. Inclusion is an action. Belonging is an outcome.” — Arthur Chan',
      },
    ],
  },
  {
    number: 14,
    title: 'Accessible emojis',
    summary:
      "Emojis are the universal language of the internet. They inject humor 🤦 , soften a direct tone 🙂 , and mimic body language 💪 in our text-based digital lives. But while slapping a tiny picture on a sentence feels like second nature to us, their impact on web accessibility is often completely ignored. If we use them carelessly, we aren't just muddying our messaging - we are building digital brick walls for millions of users. Here is how emojis accidentally ruin web content accessibility, and how to handle them like a pro 🚀.",
    content: [
      {
        type: 'heading',
        level: 2,
        text: '🎯 What are emojis?',
      },
      {
        type: 'paragraph',
        text: 'To understand why they can break web layouts, we first have to look under the hood at what these characters actually are. Spoiler: Emojis and emoticons are *not* the same thing, and screen readers treat them very differently.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**Emojis:** These are native, graphic pictographs standardized by the [Unicode Consortium](https://www.unicode.org/consortium/consort.html). Every single emoji has a fixed, unchangeable, sometimes overly literal technical name baked into its DNA. For example, 👋 is universally registered as *"Waving Hand"*.',
          },
          {
            text: '**Emoticons & ASCII Art:** These are the vintage, pre-historic dinosaurs of the web. Unlike emojis, Emoticons `:)` and internet relics like `¯\\_(ツ)_/¯` are structural patterns made entirely of standard text punctuation, symbols, and numbers arranged to loosely mimic visual shapes.',
          },
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '❓ Why we need them to be accessible?',
      },
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
            text: '**Bridging the "Vibe" gap:** Emojis carry deep emotional weight, but internet culture\'s slang meanings are drastically disconnected from their literal code names. For example, using 💀 to mean *"I am laughing hysterically"* will result in a screen reader robotically saying *"Skull"*. Similarly, 🙏 could mean prayer, gratitude, pleading, or a high-five depending on who is reading it. By making an emoji technically accessible, we bridge the gap between a visual "vibe" and an auditory description, ensuring that our intended sarcasm or humor is equally conveyed to everyone.',
          },
          {
            text: '**Preventing "Invisible UI" ghost towns:** In modern web design, emojis are frequently used as buttons or standalone interactive indicators (like a ❤️ for a "favorite" button or an ⚠️ for a system alert). If these graphics are not configured with accessible labels, a screen reader user encounters an entirely blank or ambiguous interactive element. They know a button is there, but they have no earthly clue what it does.',
          },
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '🚨 Current Issues at Pipedrive public web',
      },
      {
        type: 'paragraph',
        text: 'For example we lately had a task to implement emojis to be used inside Accordion component trigger titles. It is needed purely for “eye candy”. But as such, we need to implement it correctly as well.',
      },
      {
        type: 'heading',
        level: 2,
        text: '💡 Technical Solutions',
      },
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
        text: "According to the W3C [WCAG 2.2 Technique H86](https://www.w3.org/WAI/WCAG22/Techniques/html/H86), you cannot use standard image `alt` tags on emojis because they are text characters. If you are using an emoji to convey a specific context or emotion that doesn't match its raw Unicode name, wrap it in a `<span>` and use ARIA properties to assign an accurate alternative text.",
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
        text: '**3. Ditch the punctuation faces (=== ban emoticons)**',
      },
      {
        type: 'paragraph',
        text: 'Emoticons are an absolute nightmare for screen reader users. When a text-to-speech engine runs into a classic smiley, it doesn\'t say "smile" - it reads out the raw syntax character-by-character: *"Semicolon, right parenthesis."* Try to avoid having your website read out loud like a 1995 chat room.',
      },
      {
        type: 'paragraph',
        text: '**Solution:** Swap old-school emoticons like `:)` out for native Unicode emojis like 🙂 and code them properly. If you absolutely *must* use ASCII text art, use `role="img"` and an `aria-label` to group it seamlessly.',
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
            text: '**Push emojis to the end:** Never sandwich emojis in the middle of text. (e.g. Avoid: *"Happy 🎂 Day to you!"* which reads out as *"Happy birthday cake day to you"*). Put emojis at the absolute end of the sentence so assistive tools can dictate the core message without mid-sentence disruption.',
          },
          {
            text: '**Cap the count (No stacking):** Limit yourself to a maximum of *three emojis per post/section*, and never repeat the exact same emoji back-to-back. Stacking 🔥 🔥 🔥 forces a screen reader user to listen to a tedious, robotic loop: *"Fire, fire, fire."*',
          },
          {
            text: '**🚨 Never substitute words:** Use emojis to *complement* your vocabulary, never to **replace** words.',
            sublist: {
              type: 'list',
              ordered: false,
              items: [
                {
                  text: '*Bad:* "Please bring your 🐶 to the park." (Screen reader: "Please bring your dog face to the park.")',
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
        text: '“Urging an organization to be inclusive is not an attack. It’s progress.” — DaShanne Stokes',
      },
    ],
  },
  {
    number: 15,
    title: 'The magic of mega menus',
    summary:
      'We got ourselves a brand new and shiny mega menu navigation implementation 🎉 It would be a good time to recap what makes a good accessible mega menu. How have we already improved and is there still some way to go.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: '🎯 What is accessible mega menu?',
      },
      {
        type: 'paragraph',
        text: "An accessible mega menu and header is a website’s primary navigation system designed so it doesn’t actively reject people who don't use a standard mouse.",
      },
      {
        type: 'paragraph',
        text: 'A standard menu is just a list of links. A mega menu is a big, multi-column panel filled with links, images, promo banners etc (and sometimes also a mini-existential crisis for the user 🙈 ). An accessible version of this means that whether someone is using a mouse, a trackpad, a keyboard, a screen reader, or an alternative switch device, they can find relavant pages without throwing their hardware out of the window.',
      },
      {
        type: 'heading',
        level: 2,
        text: '❓ Why we need it?',
      },
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
      {
        type: 'heading',
        level: 2,
        text: '🚨 Current Issues at Pipedrive public web',
      },
      {
        type: 'paragraph',
        text: 'Our old mega menu was, well, let’s just say “lacking”. We didn’t have skip link to jump over the whole navigation. The header links had dual personality, e.g. they did one thing on hover and another on click, which left our mega menu totally out of reach for the keyboard or assistive technology users. Also not even all items on header were reachable by keyboard! I think we can agree, it was a mess 🙈 But now, with the redesign, we had a good opportunity to make it so much better - to be truly accessible and user friendly!',
      },
      {
        type: 'paragraph',
        text: 'The technical solutions list below is covering the general aspects of what should be considered when building an accessible header and mega menu. Our new mega menu should now be compatible with all the mandatory points. But there is always room for some add-on improvements (like additional keyboard navigation inside the mega menu items etc).',
      },
      {
        type: 'heading',
        level: 2,
        text: '💡 Technical Solutions',
      },
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
            text: '**The `<header>` and `<nav>` landmarks:** Wrap entire top bar in a `<header>` element. Inside, wrap main menu in a `<nav>` element. It would also be nice to give it an explicit label using `aria-label="Main Navigation"` so screen readers can instantly distinguish it from a footer or sidebar menu.',
          },
          {
            text: '**The "Skip to content" lifeline:** Keyboard users don\'t want to tab through your X amount of header / mega menu links on *every single page load*. This is why we need "Skip to main content" link as the absolute first element in our HTML. We hide it visually with CSS, but make it highly visible when it receives focus. It targets the primary content area container via an ID (e.g., `href="#main-content"`).',
          },
          {
            text: '**The Logo:** If company logo links to the homepage, the `<a>` tag needs explicit inner text or an `<img>` tag with `alt="Pipedrive"`. If using an inline SVG, include `role="img"` and an internal `<title>` tag linked via `aria-labelledby`. (Currently we are wrapping the SVG with a `<div>` and giving it a specific aria-label.)',
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
        text: '**⚠️ The `role="menu"` trap**',
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
        text: '**Correct ARIA setup:**',
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
        text: '🎨 **Visual feedback and handling the active page** (WCAG Technique G128)',
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
            text: '**Initial Tab progression:** When users press the `Tab` key, they should first step across the *top-level items only.* This allows them to quickly browse the main categories without getting dragged through dozens of underlying submenu items.',
          },
          {
            text: '**Enter / Space functionality:** Pressing `Enter` or `Space` on an active top-level trigger opens the associated mega menu and places focus directly onto the first interactive element inside it.',
          },
          {
            text: '**Internal Tab navigation:** Once inside an open submenu, the `Tab` key moves the user sequentially forward through all structural links or form fields in a logical reading order. `Shift + Tab` steps them backward.',
          },
          {
            text: '**Natural exit:** Tabbing past the final link of an open submenu must smoothly exit that block and place focus onto the *next* top-level navigation item.',
          },
          {
            text: '**The universal escape (`Esc` Key):** Per WCAG 2.1 Criterion 1.4.13 (Content on Hover or Focus), any content that appears on hover or focus must be completely dismissible without shifting focus or moving the pointer. Pressing `Esc` must immediately close the mega menu panel and return focus cleanly back to the top-level trigger button.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: '**The Pro-tier option: Arrow key shortcuts**',
      },
      {
        type: 'paragraph',
        text: 'If we choose to implement arrow key support for power users, it should act as an alternative shortcut—*never* at the expense of standard `Tab` routing:',
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
          ['**Hidden focus rings**', 'Keyboard users "fly blind"', 'Ensure visible focus indicators are styled explicitly using `:focus-visible`.'],
          [
            '**Small tap targets**',
            'Frustrating for mobile and motor-impaired users',
            'Maintain a strict minimum element target size of 24×24px with padding.',
          ],
          ['**Icon-only buttons**', 'Screen readers miss intent entirely', 'Add descriptive label support via text strings or an `aria-label`.'],
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'The WCAG compliance matrix',
      },
      {
        type: 'paragraph',
        text: 'To keep the design completely aligned, global navigation architecture should be mapped directly back to these core WCAG criteria:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          {
            text: '**Consistent Navigation (WCAG 3.2.3 - Level AA):** The primary navigation structure must stay identical in location, layout, order, and label text across all site pages so users do not have to relearn your layout.',
          },
          {
            text: '**Focus Visible (WCAG 2.4.7 - Level AA):** Interactive targets must show an obvious, high-contrast visual outline when focused via keyboard navigation. Never allow `outline: none;` without custom alternatives.',
          },
          {
            text: '**Target Size Minimum (WCAG 2.5.8 - Level AA):** Interactive elements must meet a minimum size boundary of at least 24×24px (or be spaced sufficiently apart) to accommodate touch input and motor control variations.',
          },
          {
            text: '**Reflow (WCAG 1.4.10 - Level AA):** The interface must remain responsive. Zooming a page up to 200% must seamlessly wrap and collapse the header layout into a functional mobile menu instead of breaking, causing double-scrolling, or overlapping text fields.',
          },
          {
            text: '**Info & Relationships (WCAG 1.3.1 - Level A):** The structural visual hierarchy must be explicitly hardcoded into the layout using proper semantic tags (`<nav>`, `<ul>`, `<li>`, structural headings).',
          },
          {
            text: '**Name, Role, Value (WCAG 4.1.2 - Level A):** Interactive controls must transparently pass their structural identity, name, and current visual status down to assistive devices using standard parameters (like `aria-expanded`).',
          },
          {
            text: '**Bypass Blocks (WCAG 2.4.1 - Level A):** Provide a native method to easily jump past repetitive interface sections, accomplished via a clean "Skip to Main Content" element.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'And that’s a wrap! I believe our new navigation with all the accessibility fixes and new structure in mind, will guide our users much better and make them see exactly why PD should be considered as the most loved CRM 😻',
      },
      {
        type: 'quote',
        text: '“By designing with accessibility in mind, we are designing for our friends, families and futures selves” — Alistair Duggin',
      },
    ],
  },
]
