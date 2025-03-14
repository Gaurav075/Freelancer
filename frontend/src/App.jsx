import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login'
import Signup from './pages/Signup'
import AccountTypeSelection from './pages/AccountTypeSelection'
import FreelancerProfileSetup from './pages/FreelancerProfileSetup'
import CreateGig from './pages/CreateGig'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import ClientProfileSetup from './pages/ClientProfileSetup'
import ClientDashboard from './pages/ClientDashboard'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/account-type' element={<AccountTypeSelection/>}/>
          <Route path='/setup-profile' element={<FreelancerProfileSetup/>}/>
          <Route path='/create-gig' element={<CreateGig/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/client-profile-setup' element={<ClientProfileSetup/>}/>
          <Route path='/client-dashboard' element={<ClientDashboard/>}/>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
