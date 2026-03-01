import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { Books } from './pages/Books'
import { Home } from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
