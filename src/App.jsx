import { useState } from 'react'
import Landing from './pages/Landing'
import Login from './pages/Login'
import CashierPin from './pages/CashierPin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CashierPin/>
    </>
  )
}

export default App
