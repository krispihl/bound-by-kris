import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { HomeLink } from './components/HomeLink'
import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import { A11yBites } from './pages/A11yBites'
import { Boardgames } from './pages/Boardgames'
import { Books } from './pages/Books'
import { Home } from './pages/Home'

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/a11y-bites" element={<A11yBites />} />
					<Route path="/books" element={<Books />} />
					<Route path="/boardgames" element={<Boardgames />} />
				</Routes>
			</main>
			<HomeLink />
		</BrowserRouter>
	)
}

export default App
