import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Visibility from './Visibility'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Visibility/>
    </>
  )
}

export default App