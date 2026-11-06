import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'
import { About } from './pages/About'
import { A11yBites } from './pages/A11yBites'
import { Boardgames } from './pages/Boardgames'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

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
					<Route path="/boardgames" element={<Boardgames />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	)
}

export default App
