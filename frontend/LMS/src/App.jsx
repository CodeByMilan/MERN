import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home'

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<h1>About page</h1>} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
