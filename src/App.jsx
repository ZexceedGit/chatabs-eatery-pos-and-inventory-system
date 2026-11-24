import { useState } from 'react'
import Login from './pages/auth/Login'
import CashierPin from './pages/auth/CashierPin'

import Order from './pages/pos/Order'
import Table from './pages/pos/Table'
import Kitchen from './pages/pos/Kitchen'
import History from './pages/pos/History'
import SuccessfulPaymentModal from './components/SuccessfulPaymentModal/SuccessfulPaymentModal'
import InventoryBar from './components/InventoryBar/InventoryBar'
import Dashboard from './pages/inventory/Dashboard'
function App() {

  return (
    <>
      <Dashboard/>
    </>
  )
}

export default App
