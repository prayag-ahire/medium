import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Design } from './components/Design'
import { Blogs } from './pages/Blogs'
import { Blog } from './pages/blog.tsx'
import { Publish } from './pages/Publish'
import { Login } from './components/login.tsx'
import { Signup } from './components/signup.tsx'

function App() {
 

  return (<div>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/' element={<Design/>}/>
        <Route path='/publish' element={<Publish/>}/>
      </Routes>
    </BrowserRouter>
  </div>)
}

export default App
