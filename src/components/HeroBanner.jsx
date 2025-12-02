import React from 'react'
import './HeroBanner.css'
import logoImg from '../assets/Logo.png';
import civicImg from '../assets/Civic.png';
import eclipseImg from '../assets/Eclipse.png';

function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-background"></div>
      
      {/* Carros nas bordas */}
      <div className="car-left">
        <div className="car-holder civic">
          <img src={civicImg} alt="Foto do Civic" />
        </div>
      </div>
      
      <div className="car-right">
        <div className="car-holder eclipser">
          <img src={eclipseImg} alt="Foto do Eclipse" />
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-center">
          <div className="hero-logo-container">
            <img src={logoImg} alt="Logo Brunão Custom Cars" className="hero-logo-image" />
          </div>
          <h1 className="hero-title">
            <span className="hero-title-line1">MONTE SEU PROJETO</span>
            <span className="hero-title-line2">COM A BRUNAO CUSTOM CARS</span>
          </h1>
        </div>
        <div className="hero-links">
          <button className="hero-link">CATÁLOGO</button>
          <div className="hero-link-divider"></div>
          <button className="hero-link">OFERTAS</button>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner

