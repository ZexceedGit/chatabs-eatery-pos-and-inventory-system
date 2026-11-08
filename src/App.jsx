import { useState } from 'react'
import Landing from './pages/Landing'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login/>
    </>
  )
}

export default App
