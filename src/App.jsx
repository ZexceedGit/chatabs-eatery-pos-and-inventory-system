import { useState } from 'react'
import Landing from './pages/Landing'
import Login from './pages/Login'
import CashierPin from './pages/CashierPin'
import ReviewForm from './pages/ReviewForm'
import StoryExpanded from './pages/StoryExpanded'
import Menu from './pages/Menu'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Menu/>
    </>
  )
}

export default App
