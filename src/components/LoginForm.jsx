import React from 'react'
import logoImage from '../assets/Logo.png'
import './LoginForm.css'

function LoginForm({ onBack }) {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <div className="login-logo-circle">
            <img src={logoImage} alt="Brunão Custom Cars" className="login-logo-image" />
          </div>
        </div>
        
        <h1 className="login-title">LOGIN</h1>
        
        <div className="login-form">
          <div className="login-form-group">
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="EMAIL"
              className="login-input"
            />
          </div>
          
          <div className="login-form-group">
            <input 
              type="password" 
              id="senha" 
              name="senha" 
              placeholder="SENHA"
              className="login-input"
            />
          </div>
          
          <button type="submit" className="login-button">LOGIN</button>
          
          <button type="button" className="login-google-button">LOGIN COM GOOGLE</button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm

