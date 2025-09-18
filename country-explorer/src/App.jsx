import {Routes,Route, BrowserRouter} from "react-router-dom"
import './App.css'
import { HomePage } from "./pages/HomePage"
import { CountryDetails } from "./pages/CountryDetails"

function App() {
  

  return (
    <>
     <BrowserRouter>
      <Routes>
          <Route path = "/" element={<HomePage/>}/>
          <Route path ="/country/:countryName" element = {<CountryDetails/>}/>
      </Routes>
     </BrowserRouter>
      
    </>
  )
}

export default App
