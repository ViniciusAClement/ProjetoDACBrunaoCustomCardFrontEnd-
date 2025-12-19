import React, { useState, useEffect } from 'react'
import { CartProvider } from './contexts/CartContext'
import Header from './components/Header'
import Home from './components/Home'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import StockPage from './components/StockPage'
import SearchPage from './components/SearchPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [user, setUser] = useState(null)
  const [searchParams, setSearchParams] = useState({})

  return (
    <CartProvider>
      <AppContent
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        setUser={setUser}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </CartProvider>
  )
}

function AppContent({ currentPage, setCurrentPage, user, setUser, searchParams, setSearchParams }) {

  // Verificar se há usuário logado no localStorage ao iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleNavigateToRegister = () => {
    setCurrentPage('register')
  }

  const handleNavigateToLogin = () => {
    setCurrentPage('login')
  }

  const handleNavigateToStock = () => {
    setCurrentPage('stock')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
  }

  const handleLoginSuccess = (userData) => {
    setUser(userData)
    setCurrentPage('home')
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    setCurrentPage('home')
  }

  const handleSearch = (searchTerm) => {
    setSearchParams({ searchTerm })
    setCurrentPage('search')
  }

  const handleNavigateToCategory = (category, subcategory) => {
    setSearchParams({ category, subcategory })
    setCurrentPage('search')
  }

  const shouldShowLogoClick = currentPage === 'register' || currentPage === 'login' || currentPage === 'stock' || currentPage === 'search'

  return (
    <div className="app">
      <Header
        onRegisterClick={handleNavigateToRegister}
        onLoginClick={handleNavigateToLogin}
        onStockClick={user?.isAdmin ? handleNavigateToStock : null}
        onLogoutClick={user ? handleLogout : null}
        user={user}
        onLogoClick={shouldShowLogoClick ? handleBackToHome : null}
        onSearch={handleSearch}
      />
      {currentPage === 'home' ? (
        <Home onNavigateToCategory={handleNavigateToCategory} />
      ) : currentPage === 'register' ? (
        <RegisterForm onBack={handleBackToHome} />
      ) : currentPage === 'login' ? (
        <LoginForm onBack={handleBackToHome} onLoginSuccess={handleLoginSuccess} />
      ) : currentPage === 'stock' ? (
        <StockPage onBack={handleBackToHome} />
      ) : currentPage === 'search' ? (
        <SearchPage
          searchTerm={searchParams.searchTerm}
          category={searchParams.category}
          subcategory={searchParams.subcategory}
          onBack={handleBackToHome}
        />
      ) : null}
    </div>
  )
}

export default App

