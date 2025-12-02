import React from 'react'
import './RegisterForm.css'

function RegisterForm({ onBack }) {
  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">CADASTRE-SE</h1>
        
        <div className="register-content">
          <div className="user-icon-container">
            <div className="user-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
          
          <div className="register-form">
            <div className="form-column form-column-left">
              <div className="form-group">
                <label htmlFor="email">EMAIL</label>
                <input type="email" id="email" name="email" />
              </div>
              
              <div className="form-group">
                <label htmlFor="pais">PAÍS</label>
                <input type="text" id="pais" name="pais" />
              </div>
              
              <div className="form-group">
                <label htmlFor="estado">ESTADO</label>
                <input type="text" id="estado" name="estado" />
              </div>
              
              <div className="form-group">
                <label htmlFor="cidade">CIDADE</label>
                <input type="text" id="cidade" name="cidade" />
              </div>
              
              <div className="form-group">
                <label htmlFor="rua">RUA</label>
                <input type="text" id="rua" name="rua" />
              </div>
              
              <div className="form-group">
                <label htmlFor="bairro">BAIRRO</label>
                <input type="text" id="bairro" name="bairro" />
              </div>
              
              <div className="form-group">
                <label htmlFor="numero">NÚMERO</label>
                <input type="text" id="numero" name="numero" />
              </div>
              
              <div className="form-group">
                <label htmlFor="complemento">COMPLEMENTO</label>
                <input type="text" id="complemento" name="complemento" />
              </div>
            </div>
            
            <div className="form-column form-column-right">
              <div className="form-group">
                <label htmlFor="nome">NOME</label>
                <input type="text" id="nome" name="nome" />
              </div>
              
              <div className="form-group">
                <label htmlFor="sobrenome">SOBRENOME</label>
                <input type="text" id="sobrenome" name="sobrenome" />
              </div>
              
              <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                <input type="text" id="cpf" name="cpf" />
              </div>
              
              <div className="form-group">
                <label htmlFor="dataNascimento">DATA DE NASCIMENTO (DD/MM/AAAA)</label>
                <input type="text" id="dataNascimento" name="dataNascimento" placeholder="DD/MM/AAAA" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="terms-checkbox">
          <input type="checkbox" id="terms" name="terms" />
          <label htmlFor="terms">LI E CONCORDO COM OS TERMOS DE USO E CONTRATO</label>
        </div>
        
        <button type="submit" className="register-submit-button">CADASTRAR-SE</button>
      </div>
    </div>
  )
}

export default RegisterForm

