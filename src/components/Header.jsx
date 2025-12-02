import React from 'react'
import logoImage from '../assets/Logo.png'
import './Header.css'

function Header({ onRegisterClick, onLoginClick, onLogoClick }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo-circle" onClick={onLogoClick} style={{ cursor: onLogoClick ? 'pointer' : 'default' }}>
            <img src={logoImage} alt="Brunão Custom Cars" className="logo-image" />
          </div>
        </div>
        
        <div className="search-section">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Buscar peças de carro, produtos automotivos etc."
          />
          <button className="search-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>
        
        <div className="user-section">
          <button className="header-link" onClick={onRegisterClick}>Criar conta</button>
          <button className="header-link" onClick={onLoginClick}>Entrar</button>
          <button className="cart-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

