import React from 'react'
import './Navigation.css'

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <button className="nav-item">
          PEÇAS
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 4.5l3 3 3-3"/>
          </svg>
        </button>
        <button className="nav-item">
          PRODUTOS
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 4.5l3 3 3-3"/>
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navigation

