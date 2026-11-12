import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

// The other pages load when they are visited, so the first visit, usually the homepage, doesn't download them all.
const About = lazy(() => import('./pages/About').then((module) => ({ default: module.About })))
const A11yBites = lazy(() => import('./pages/A11yBites').then((module) => ({ default: module.A11yBites })))
const Boardgames = lazy(() => import('./pages/Boardgames').then((module) => ({ default: module.Boardgames })))

const App = () => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Navbar />
			<main>
				<Suspense fallback={null}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/a11y-bites" element={<A11yBites />} />
						<Route path="/boardgames" element={<Boardgames />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</main>
			<Footer />
		</BrowserRouter>
	)
}

export default App
