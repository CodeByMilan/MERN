import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home'
import SingleBook from './pages/singleBook/SingleBook'

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/book/:id" element={<SingleBook/>} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
