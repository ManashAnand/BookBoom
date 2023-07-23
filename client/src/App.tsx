
import './App.css'
import Footer from './Component/Footer'
import Navbar from './Component/Navbar'
import { Routes,Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Post from './pages/Post';

function App() {

  return (
    <>
      <Navbar/>
        <Routes>
          <Route  path='/' element={<Homepage/>}/>
          <Route  path='/post' element={<Post/>}/>
        </Routes>
      <Footer/>
    </>
  )
}

export default App
