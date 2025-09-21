import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import {Routes,Route} from "react-router-dom"
import Navbar from './Pages/Navbar'
import Admin from './Pages/AdminDashboard'
import Userb from './Pages/UserDashboard'
import ViewAllProjects from './Components/ViewAllProjects'
import CreateProject from './Components/CreateProject'
import SingleProject from './Components/Project'

function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element ={<Register/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/user" element={<Userb/>}/>
      <Route path="/project/:id" element={<SingleProject/>}/>
      <Route path="/addProject" element={<CreateProject/>}/>
      <Route path="/allProjects" element={<ViewAllProjects/>}/>

    </Routes>
      
    </>
  )
}

export default App