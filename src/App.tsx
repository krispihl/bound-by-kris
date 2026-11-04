import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { HomeLink } from './components/HomeLink'
import { Navbar } from './components/Navbar'
import { SecretGate } from './components/SecretGate'
import { ScrollToTop } from './components/ScrollToTop'
import { About } from './pages/About'
import { A11yBites } from './pages/A11yBites'
import { Boardgames } from './pages/Boardgames'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

// Private for now, and loaded only once unlocked, so the reviews aren't part of every visitor's download.
const Books = lazy(() => import('./pages/Books').then(({ Books }) => ({ default: Books })))

const App = () => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Navbar />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/a11y-bites" element={<A11yBites />} />
					<Route
						path="/books"
						element={
							<SecretGate fallback={<NotFound />}>
								<Suspense fallback={null}>
									<Books />
								</Suspense>
							</SecretGate>
						}
					/>
					<Route path="/boardgames" element={<Boardgames />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<HomeLink />
		</BrowserRouter>
	)
}

export default App
