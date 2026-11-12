// "a11y" is what shows, but a screen reader would spell it out, so it hears "accessibility" instead.
export const A11yText = () => (
	<>
		<span aria-hidden="true">a11y</span>
		<span className="screenreader-only">accessibility</span>
	</>
)
