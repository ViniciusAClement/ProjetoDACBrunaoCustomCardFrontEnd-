import React, { useState, useEffect } from 'react'
import { useCart } from '../contexts/CartContext'
import { api } from '../api/mockApi'
import './ProductSection.css'

function ProductSection() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { addItem } = useCart()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await api.getProducts()
      setProducts(data)
    } catch (err) {
      console.error('Erro ao carregar produtos:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  const closeProductDetails = () => {
    setSelectedProduct(null)
  }

  const handleAddToCart = (product) => {
    addItem(product)
    alert(`✅ ${product.name} adicionado ao carrinho!`)
  }

  if (loading) {
    return (
      <section className="product-section">
        <div className="product-container">
          <h2 className="product-section-title">
            <span>NOSSOS PRODUTOS</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.5 2.5a2.121 2.121 0 0 1 3 3L6.5 19.5l-4 1 1-4L16.5 3.5z"/>
            </svg>
          </h2>
          <div className="loading">Carregando produtos...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="product-section">
      <div className="product-container">
        <h2 className="product-section-title">
          <span>NOSSOS PRODUTOS</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.5 2.5a2.121 2.121 0 0 1 3 3L6.5 19.5l-4 1 1-4L16.5 3.5z"/>
          </svg>
        </h2>
        <div className="products-grid">
          {products.length === 0 ? (
            <div className="no-products">Nenhum produto disponível no momento.</div>
          ) : (
            products.map(product => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product)}
                style={{ cursor: 'pointer' }}
              >
                {product.imgUrl && (
                  <div className="product-image">
                    <img src={product.imgUrl} alt={product.name} />
                  </div>
                )}
                <div className="product-info">
                  <div className="product-price">
                    R$ {product.price.toFixed(2)}
                  </div>
                  <div className="product-name">
                    {product.name}
                  </div>
                  {product.description && (
                    <div className="product-description">
                      {product.description.length > 100
                        ? product.description.substring(0, 100) + '...'
                        : product.description}
                    </div>
                  )}
                  <div className="product-click-hint">
                    Clique para ver detalhes
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedProduct && (
        <div className="product-details-overlay" onClick={closeProductDetails}>
          <div className="product-details-modal" onClick={e => e.stopPropagation()}>
            <div className="product-details-header">
              <h3>{selectedProduct.name}</h3>
              <button className="close-button" onClick={closeProductDetails}>×</button>
            </div>

            {selectedProduct.imgUrl && (
              <div className="product-details-image">
                <img src={selectedProduct.imgUrl} alt={selectedProduct.name} />
              </div>
            )}

            <div className="product-details-info">
              <div className="product-details-price">
                R$ {selectedProduct.price.toFixed(2)}
              </div>

              {selectedProduct.description && (
                <div className="product-details-description">
                  <h4>Descrição:</h4>
                  <p>{selectedProduct.description}</p>
                </div>
              )}

              <div className="product-details-actions">
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(selectedProduct)}
                >
                  🛒 Adicionar ao Carrinho
                </button>
                <button className="wishlist-button">
                  Adicionar à Lista de Desejos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductSection

