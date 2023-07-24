
import './App.css'
import Footer from './Component/Footer'
import Navbar from './Component/Navbar'
import { Routes,Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Post from './pages/Post';
import SinglePost from './Component/SinglePost';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  return (
    <>
      <Navbar/>
        <Routes>
          <Route  path='/' element={<Homepage/>}/>
          <Route  path='/login' element={<Login/>}/>
          <Route  path='/register' element={<Register/>}/>
          <Route  path='/:id' element={<SinglePost/>}/>
          <Route  path='/post' element={<Post/>}/>
        </Routes>
      <Footer/>
    </>
  )
}

export default App
