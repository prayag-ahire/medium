import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './components/signUp'
import { Login } from './components/login'
import { BlogPage } from './components/blogPage'

function App() {
 

  return (<div>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/blog/:id' element={<BlogPage/>}/>
      </Routes>
    </BrowserRouter>
  </div>)
}

export default App
