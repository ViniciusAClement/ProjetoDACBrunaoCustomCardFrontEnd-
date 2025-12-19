import React, { useState } from 'react'
import { api } from '../api/mockApi'
import './RegisterForm.css'

function RegisterForm({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    cpf: '',
    terms: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    // Validações básicas
    if (!formData.name || !formData.email || !formData.password || !formData.cpf) {
      setError('Preencha todos os campos obrigatórios')
      setLoading(false)
      return
    }

    if (!formData.terms) {
      setError('Você deve aceitar os termos de uso')
      setLoading(false)
      return
    }

    try {
      const clientData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '11999999999', // telefone padrão se não informado
        password: formData.password,
        cpf: formData.cpf
      }

      await api.createClient(clientData)

      setSuccess(true)
      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        cpf: '',
        terms: false
      })
    } catch (err) {
      if (err.message.includes('já cadastrado')) {
        setError('Email ou CPF já cadastrados')
      } else {
        setError('Erro ao cadastrar usuário')
      }
      console.error('Register error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="register-page">
        <div className="register-container">
          <div className="success-message">
            <h2>Cadastro realizado com sucesso!</h2>
            <p>Agora você pode fazer login com seu email e senha.</p>
            <button onClick={onBack} className="back-button">Voltar ao início</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">CADASTRE-SE</h1>

        <form className="register-content" onSubmit={handleSubmit}>
          <div className="user-icon-container">
            <div className="user-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>

          {error && <div className="register-error">{error}</div>}

          <div className="register-form">
            <div className="form-column form-column-left">
              <div className="form-group">
                <label htmlFor="email">EMAIL *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">TELEFONE</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div className="form-column form-column-right">
              <div className="form-group">
                <label htmlFor="name">NOME COMPLETO *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">SENHA *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cpf">CPF *</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  placeholder="000.000.000-00"
                  required
                />
              </div>
            </div>
          </div>

          <div className="terms-checkbox">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleInputChange}
            />
            <label htmlFor="terms">LI E CONCORDO COM OS TERMOS DE USO E CONTRATO</label>
          </div>

          <button
            type="submit"
            className="register-submit-button"
            disabled={loading}
          >
            {loading ? 'CADASTRANDO...' : 'CADASTRAR-SE'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm

