import React, { useState } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const handleNavigateToRegister = () => {
    setCurrentPage('register')
  }

  const handleNavigateToLogin = () => {
    setCurrentPage('login')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
  }

  const shouldShowLogoClick = currentPage === 'register' || currentPage === 'login'

  return (
    <div className="app">
      <Header 
        onRegisterClick={handleNavigateToRegister}
        onLoginClick={handleNavigateToLogin}
        onLogoClick={shouldShowLogoClick ? handleBackToHome : null}
      />
      {currentPage === 'home' ? (
        <Home />
      ) : currentPage === 'register' ? (
        <RegisterForm onBack={handleBackToHome} />
      ) : (
        <LoginForm onBack={handleBackToHome} />
      )}
    </div>
  )
}

export default App

