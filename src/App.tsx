import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { A11yBites } from './pages/A11yBites'
import { Books } from './pages/Books'
import { Home } from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/a11y-bites" element={<A11yBites />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
