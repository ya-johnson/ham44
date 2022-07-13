import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './componets/nav'
import Home from './pages/home'
import Stats from './pages/stats'
import Results from './pages/results'


const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/stats' element={<Stats />} />
          <Route path='/results' element={<Results />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
