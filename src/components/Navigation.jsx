import React, { useState, useRef, useEffect } from 'react'
import './Navigation.css'

function Navigation({ onNavigateToCategory }) {
  const [showPecasDropdown, setShowPecasDropdown] = useState(false)
  const [showProdutosDropdown, setShowProdutosDropdown] = useState(false)
  const pecasDropdownRef = useRef(null)
  const produtosDropdownRef = useRef(null)

  // Fechar dropdowns quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pecasDropdownRef.current && !pecasDropdownRef.current.contains(event.target)) {
        setShowPecasDropdown(false)
      }
      if (produtosDropdownRef.current && !produtosDropdownRef.current.contains(event.target)) {
        setShowProdutosDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleCategoryClick = (category, subcategory) => {
    setShowPecasDropdown(false)
    setShowProdutosDropdown(false)
    if (onNavigateToCategory) {
      onNavigateToCategory(category, subcategory)
    }
  }
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-item" ref={pecasDropdownRef}>
          <button
            className="nav-item-button"
            onClick={() => setShowPecasDropdown(!showPecasDropdown)}
          >
            PEÇAS
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 4.5l3 3 3-3"/>
            </svg>
          </button>
          {showPecasDropdown && (
            <div className="dropdown-menu">
              <button onClick={() => handleCategoryClick('pecas', 'motor')}>Motor</button>
              <button onClick={() => handleCategoryClick('pecas', 'admissao')}>Admissão</button>
              <button onClick={() => handleCategoryClick('pecas', 'escape')}>Escape</button>
              <button onClick={() => handleCategoryClick('pecas', 'transmissao')}>Transmissão</button>
              <button onClick={() => handleCategoryClick('pecas', 'suspensao')}>Suspensão</button>
            </div>
          )}
        </div>

        <div className="nav-item" ref={produtosDropdownRef}>
          <button
            className="nav-item-button"
            onClick={() => setShowProdutosDropdown(!showProdutosDropdown)}
          >
            PRODUTOS
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 4.5l3 3 3-3"/>
            </svg>
          </button>
          {showProdutosDropdown && (
            <div className="dropdown-menu">
              <button onClick={() => handleCategoryClick('produtos', 'limpeza')}>Limpeza</button>
              <button onClick={() => handleCategoryClick('produtos', 'acessorios')}>Acessórios</button>
              <button onClick={() => handleCategoryClick('produtos', 'aerofolios')}>Aerofólios</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation

