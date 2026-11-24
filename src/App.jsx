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
import Stocks from './pages/inventory/Stocks'
import Categories from './pages/inventory/Categories'
import MarketList from './pages/inventory/MarketList'
function App() {

  return (
    <>
      <MarketList/>
    </>
  )
}

export default App
