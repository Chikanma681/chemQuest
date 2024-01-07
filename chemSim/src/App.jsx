import { useState } from 'react'
import reactLogo from './assets/react.svg'
import HomePage from './screens/HomePage'
import Header from './components/Header'
import ProcessMenu from './screens/Menu'
import BatchReactor from './screens/batch';
import HeatExchanger from './screens/HeatExchanger'
import Pipeline from './screens/pipeline'
import viteLogo from '/vite.svg'
import { Route, Routes, Navigate, Router } from "react-router-dom";
import './App.css'

function App() {
  return (
    <>
    <div style={{backgroundColor: '#242424', minHeight:"140vh"}}>
    <Header/>

      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu" element={<ProcessMenu />} />
      <Route path="/batch" element={<BatchReactor/>}/>
      <Route path="/hx" element={<HeatExchanger />}/>
      <Route path="/pipe" element={<Pipeline />}/>
      </Routes>

    </div>
    </>
  )
}

export default App
