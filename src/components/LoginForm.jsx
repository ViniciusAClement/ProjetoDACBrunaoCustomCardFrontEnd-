import React, { useState } from 'react'
import logoImage from '../assets/Logo.png'
import { api } from '../api/mockApi'
import './LoginForm.css'

function LoginForm({ onBack, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Verificar se é admin
      if (formData.email === 'admin' && formData.password === 'admin') {
        const adminUser = {
          id: 'admin',
          email: 'admin',
          name: 'Administrador',
          isAdmin: true
        }
        localStorage.setItem('user', JSON.stringify(adminUser))
        onLoginSuccess(adminUser)
        return
      }

      // Para usuários normais, tentar fazer login através da API
      try {
        const clients = await api.getClients()
        const user = clients.find(client =>
          client.email === formData.email &&
          client.password === formData.password
        )

        if (user) {
          const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: false
          }
          localStorage.setItem('user', JSON.stringify(userData))
          onLoginSuccess(userData)
        } else {
          setError('Email ou senha incorretos')
        }
      } catch (err) {
        setError('Erro ao fazer login')
        console.error('Login error:', err)
      }
    } catch (err) {
      setError('Erro ao fazer login. Verifique se o backend está rodando.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <div className="login-logo-circle">
            <img src={logoImage} alt="Brunão Custom Cars" className="login-logo-image" />
          </div>
        </div>

        <h1 className="login-title">LOGIN</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div className="login-form-group">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="EMAIL"
              className="login-input"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="login-form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="SENHA"
              className="login-input"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'ENTRANDO...' : 'LOGIN'}
          </button>

          <button type="button" className="login-google-button">LOGIN COM GOOGLE</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm

