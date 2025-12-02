import React from 'react'
import './ProductSection.css'

function ProductSection() {
  const products = [
    {
      id: 1,
      name: "Volante Esportivo",
      originalPrice: 1600,
      currentPrice: 800,
      discount: 50,
      image: "steering-wheel"
    },
    {
      id: 2,
      name: "Kit Intake + Filtro K&N",
      originalPrice: 700,
      currentPrice: 600,
      discount: 14,
      image: "intake-kit"
    },
    {
      id: 3,
      name: "Aerofólio EM1 para",
      originalPrice: 750,
      currentPrice: 600,
      discount: 20,
      image: "aerofoil"
    },
    {
      id: 4,
      name: "Aerofólio Honda civic",
      originalPrice: 400,
      currentPrice: 200,
      discount: 50,
      image: "aerofoil-civic"
    },
    {
      id: 5,
      name: "Aerofólio Honda civic",
      originalPrice: 400,
      currentPrice: 200,
      discount: 50,
      image: "aerofoil-civic-2"
    }
  ]

  return (
    <section className="product-section">
      <div className="product-container">
        <h2 className="product-section-title">
          <span>MELHORES OFERTAS</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.5 2.5a2.121 2.121 0 0 1 3 3L6.5 19.5l-4 1 1-4L16.5 3.5z"/>
          </svg>
        </h2>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <div className="product-image-placeholder">
                  {product.image}
                </div>
              </div>
              <div className="product-info">
                <div className="product-prices">
                  <span className="product-original-price">R${product.originalPrice.toFixed(2)}</span>
                  <span className="product-current-price">R${product.currentPrice.toFixed(2)}</span>
                  <span className="product-discount">{product.discount}% OFF</span>
                </div>
                <div className="product-shipping">
                  <span className="free-shipping">Frete grátis</span>
                </div>
                <div className="product-name">
                  {product.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductSection

